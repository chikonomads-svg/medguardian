"""
MedGuardian — Auth Routes (SQLite)
Signup & Login with hashed passwords
"""
import os
import hashlib
import sqlite3
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["Auth"])

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "medguardian.db")


def _get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def _init_db():
    conn = _get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


_init_db()


def _hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


# ── Models ──

class SignupRequest(BaseModel):
    name: str
    email: str
    phone: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    success: bool
    message: str
    user: dict = None


# ── Routes ──

@router.post("/signup", response_model=AuthResponse)
def signup(req: SignupRequest):
    """Register a new user."""
    if not req.name or not req.email or not req.phone or not req.password:
        return AuthResponse(success=False, message="All fields are required")

    if len(req.password) < 6:
        return AuthResponse(success=False, message="Password must be at least 6 characters")

    conn = _get_db()
    try:
        conn.execute(
            "INSERT INTO users (name, email, phone, password_hash) VALUES (?, ?, ?, ?)",
            (req.name.strip(), req.email.strip().lower(), req.phone.strip(), _hash_password(req.password))
        )
        conn.commit()

        user = conn.execute("SELECT id, name, email, phone FROM users WHERE email = ?",
                           (req.email.strip().lower(),)).fetchone()
        conn.close()

        return AuthResponse(
            success=True,
            message="Account created successfully",
            user=dict(user)
        )
    except sqlite3.IntegrityError:
        conn.close()
        return AuthResponse(success=False, message="Email already registered. Please sign in.")
    except Exception as e:
        conn.close()
        return AuthResponse(success=False, message=f"Error: {str(e)}")


@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest):
    """Authenticate user."""
    if not req.email or not req.password:
        return AuthResponse(success=False, message="Email and password are required")

    conn = _get_db()
    user = conn.execute(
        "SELECT id, name, email, phone, password_hash FROM users WHERE email = ?",
        (req.email.strip().lower(),)
    ).fetchone()
    conn.close()

    if not user:
        return AuthResponse(success=False, message="No account found with this email")

    if user["password_hash"] != _hash_password(req.password):
        return AuthResponse(success=False, message="Incorrect password")

    return AuthResponse(
        success=True,
        message="Login successful",
        user={"id": user["id"], "name": user["name"], "email": user["email"], "phone": user["phone"]}
    )
