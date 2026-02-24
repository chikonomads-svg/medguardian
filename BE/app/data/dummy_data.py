"""
MedGuardian - All in-memory dummy data collections.
Used by services and routes for V1 simulation.
"""
import uuid
from datetime import datetime, timedelta

# ---------------------------------------------------------------------------
# Dummy Doctor Profiles
# ---------------------------------------------------------------------------
DUMMY_DOCTORS = {
    "doc-001": {
        "id": "doc-001",
        "full_name": "Dr. Arjun Mehta",
        "email": "arjun.mehta@aiims.edu",
        "phone": "+91-9812345678",
        "specialty": "Emergency Medicine",
        "hospital_affiliation": "AIIMS New Delhi",
        "medical_registration_number": "MH-2019-45231",
        "membership": "Premium Shield",
        "membership_valid_until": "2026-12-31",
        "profile_picture_url": None,
        "verification_status": "verified",
        "incidents_count": 2,
    }
}

# ---------------------------------------------------------------------------
# IRU Units (Immediate Response Units)
# ---------------------------------------------------------------------------
IRU_UNITS = [
    {
        "unit_id": "IRU-MUM-01",
        "unit_code": "MG-21",
        "city": "Mumbai",
        "region": "South Mumbai",
        "team_size": 4,
        "team_lead": "Rajesh Patil",
        "team_lead_phone": "+91-9900112233",
        "vehicle_type": "SUV",
        "vehicle_number": "MH-01-AB-4521",
        "availability": "available",
        "current_latitude": 19.0760,
        "current_longitude": 72.8777,
        "eta_minutes": None,
    },
    {
        "unit_id": "IRU-MUM-02",
        "unit_code": "MG-22",
        "city": "Mumbai",
        "region": "Andheri West",
        "team_size": 3,
        "team_lead": "Suresh Kumar",
        "team_lead_phone": "+91-9900445566",
        "vehicle_type": "Van",
        "vehicle_number": "MH-02-CD-7890",
        "availability": "available",
        "current_latitude": 19.1190,
        "current_longitude": 72.8470,
        "eta_minutes": None,
    },
    {
        "unit_id": "IRU-DEL-01",
        "unit_code": "MG-41",
        "city": "New Delhi",
        "region": "Connaught Place",
        "team_size": 5,
        "team_lead": "Amit Singh",
        "team_lead_phone": "+91-9811223344",
        "vehicle_type": "SUV",
        "vehicle_number": "DL-01-CZ-2210",
        "availability": "dispatched",
        "current_latitude": 28.6315,
        "current_longitude": 77.2167,
        "eta_minutes": None,
    },
]

# ---------------------------------------------------------------------------
# Lawyers
# ---------------------------------------------------------------------------
DUMMY_LAWYERS = [
    {
        "id": "law-001",
        "full_name": "Adv. Priya Sharma",
        "bar_council_number": "MH/1234/2015",
        "phone": "+91-9822334455",
        "email": "priya.sharma@legalshield.in",
        "specialty": "Medical Negligence & Criminal Defense",
        "city": "Mumbai",
        "years_of_experience": 11,
        "is_available": True,
    },
    {
        "id": "law-002",
        "full_name": "Adv. Vivek Rao",
        "bar_council_number": "DL/5678/2012",
        "phone": "+91-9811556677",
        "email": "vivek.rao@advocatelegal.in",
        "specialty": "Constitutional Law & Doctor Rights",
        "city": "New Delhi",
        "years_of_experience": 14,
        "is_available": True,
    },
]

# ---------------------------------------------------------------------------
# Historical Incidents
# ---------------------------------------------------------------------------
DUMMY_INCIDENTS = [
    {
        "id": "inc-001",
        "doctor_id": "doc-001",
        "alert_status": "resolved",
        "trigger_time": (datetime.now() - timedelta(days=45)).isoformat(),
        "location_address": "KEM Hospital, Mumbai",
        "assigned_unit": "MG-21",
        "lawyer_assigned": "Adv. Priya Sharma",
        "severity_level": "high",
        "resolved_at": (datetime.now() - timedelta(days=44)).isoformat(),
        "description": "Patient party mob tried to assault doctor in ward.",
    },
    {
        "id": "inc-002",
        "doctor_id": "doc-001",
        "alert_status": "resolved",
        "trigger_time": (datetime.now() - timedelta(days=12)).isoformat(),
        "location_address": "Lilavati Hospital, Bandra",
        "assigned_unit": "MG-22",
        "lawyer_assigned": "Adv. Vivek Rao",
        "severity_level": "medium",
        "resolved_at": (datetime.now() - timedelta(days=12)).isoformat(),
        "description": "Verbal threats from family member in ICU corridor.",
    },
    {
        "id": "inc-003",
        "doctor_id": "doc-001",
        "alert_status": "cancelled",
        "trigger_time": (datetime.now() - timedelta(days=3)).isoformat(),
        "location_address": "Ruby Hall Clinic, Pune",
        "assigned_unit": None,
        "lawyer_assigned": None,
        "severity_level": "low",
        "resolved_at": (datetime.now() - timedelta(days=3)).isoformat(),
        "description": "False alarm — accidental trigger.",
    },
]

# ---------------------------------------------------------------------------
# Community Posts
# ---------------------------------------------------------------------------
DUMMY_COMMUNITY_POSTS = [
    {
        "id": "post-001",
        "author": "Dr. Kavita Nair",
        "specialty": "Cardiology",
        "is_anonymous": False,
        "post_type": "incident_share",
        "content": "Faced a mob situation at Sion Hospital last week. MedGuardian's IRU arrived in 12 minutes. Absolutely life-saving. Thank you team.",
        "upvotes": 47,
        "comments_count": 8,
        "created_at": (datetime.now() - timedelta(hours=6)).isoformat(),
    },
    {
        "id": "post-002",
        "author": "Anonymous Doctor",
        "specialty": "General Medicine",
        "is_anonymous": True,
        "post_type": "support",
        "content": "After last month's incident I developed severe anxiety entering the ward. Has anyone else dealt with this? How did you cope?",
        "upvotes": 92,
        "comments_count": 23,
        "created_at": (datetime.now() - timedelta(hours=14)).isoformat(),
    },
    {
        "id": "post-003",
        "author": "Dr. Rahul Desai",
        "specialty": "Neurosurgery",
        "is_anonymous": False,
        "post_type": "advice",
        "content": "Document EVERYTHING. Start audio recording before any tense family interaction. It saved my case.",
        "upvotes": 134,
        "comments_count": 11,
        "created_at": (datetime.now() - timedelta(days=1)).isoformat(),
    },
    {
        "id": "post-004",
        "author": "Dr. Meera Pillai",
        "specialty": "Pediatrics",
        "is_anonymous": False,
        "post_type": "question",
        "content": "Has anyone used the FIR template from MedGuardian legal? Was it accepted as-is at the police station?",
        "upvotes": 28,
        "comments_count": 14,
        "created_at": (datetime.now() - timedelta(days=2)).isoformat(),
    },
]

# ---------------------------------------------------------------------------
# FIR Legal Template
# ---------------------------------------------------------------------------
FIR_TEMPLATE = """
FIRST INFORMATION REPORT (FIR) TEMPLATE — MEDGUARDIAN LEGAL CELL

DATE: [INSERT DATE]
POLICE STATION: [INSERT POLICE STATION NAME]
CITY/DISTRICT: [INSERT CITY]

TO,
The Station House Officer,
[Police Station Name],
[City, State]

SUBJECT: Complaint of assault/threat/violence against Dr. [DOCTOR NAME]

Respected Sir/Madam,

I, Dr. [DOCTOR NAME], [SPECIALTY], currently attached to [HOSPITAL NAME], do hereby lodge this formal complaint under Sections 323, 341, 506 of the IPC and under the provisions of [State Clinical Establishment Act / Epidemic Diseases Act if applicable].

FACTS OF THE CASE:
On [DATE] at approximately [TIME], while performing my professional duties at [LOCATION — Ward/OPD/ICU], a group of approximately [NUMBER] persons, including [NAMES IF KNOWN], entered the premises and:

- Verbally abused and threatened my life
- Physically assaulted me (if applicable)
- Caused damage to hospital property

We request immediate action under Section [relevant section] and protection for all medical staff at this facility.

Yours sincerely,
Dr. [NAME]
Medical Registration No: [MRN]
Contact: [PHONE]
Date: [DATE]
"""

# ---------------------------------------------------------------------------
# Media Statements
# ---------------------------------------------------------------------------
DUMMY_MEDIA_STATEMENTS = [
    {
        "id": "stmt-001",
        "doctor_id": "doc-001",
        "title": "Official Statement on KEM Hospital Incident",
        "content": "MedGuardian Legal Cell: Dr. Mehta is safe following an unfortunate incident at KEM Hospital. Our IRU team secured the premises. Legal proceedings are underway. We call for strict enforcement of violence-against-doctors laws.",
        "status": "published",
        "published_at": (datetime.now() - timedelta(days=44)).isoformat(),
    }
]
