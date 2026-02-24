# 🛡️ MedGuardian — Physician Safety Ecosystem

A real-time emergency response platform for doctors in India.

---

## 🚀 Quick Start

### Backend (FastAPI)
```bash
cd BE
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

- **API Docs:** http://localhost:8000/docs  
- **Health:**   http://localhost:8000/health

### Frontend (Expo — React Native)
```bash
cd FE
npm install
npx expo start
```
Press `i` for iOS · `a` for Android · `w` for Web

---

## 📱 App Flow

```
Splash (2s) → Onboarding (3 slides) → Login → Dashboard (Peace Mode)
                                                    ↓ Hold SOS button
                                             Countdown 3–2–1
                                                    ↓
                                            War Mode Emergency Screen
                                    (IRU ETA + Lawyer + Live WebSocket)
```

## 📡 Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/sos/trigger` | Trigger SOS, start IRU dispatch |
| `GET`  | `/sos/status/{id}` | Get incident status |
| `PUT`  | `/sos/cancel/{id}` | Cancel SOS |
| `GET`  | `/iru/status/{id}` | Get assigned IRU unit |
| `GET`  | `/iru/units/nearby` | Nearby IRU units |
| `GET`  | `/incident/history` | Past incidents |
| `GET`  | `/legal/cases` | Legal cases |
| `GET`  | `/legal/fir-template` | FIR draft template |
| `GET`  | `/community/posts` | Doctor community feed |
| `GET`  | `/profile/me` | Doctor profile |
| `WS`   | `/ws/incident/{id}` | Live incident updates |

---

## 🏗️ Architecture

```
Medgardian/
├── BE/                      ← FastAPI Backend (Python)
│   ├── app/
│   │   ├── main.py          ← Entry point
│   │   ├── routes/          ← sos, iru, incident, legal, media, community, profile
│   │   ├── services/        ← incident_manager, dispatch_engine
│   │   ├── websocket/       ← incident_ws.py (live updates)
│   │   └── data/            ← dummy_data.py (in-memory store)
│   └── requirements.txt
│
└── FE/                      ← React Native (Expo)
    ├── src/
    │   ├── App.js
    │   ├── navigation/      ← AppNavigator, TabNavigator
    │   ├── screens/         ← 11 screens
    │   ├── components/      ← EmergencyButton, GlassCard, StatusBadge
    │   ├── context/         ← SOSContext (WebSocket + state machine)
    │   ├── data/            ← dummyData.js
    │   └── theme/           ← colors.js (Peace Mode + War Mode)
    └── package.json
```

---

## 🧠 SOS State Machine

```
idle → countdown (3-2-1) → active
                               ↓ (WebSocket)
                           dispatched → en_route → on_scene → lawyer_connected → resolved
                               ↑
                           cancelled (any time)
```

---

## 🔐 Demo Login
Use any phone number on the login screen, or tap **"Demo Login (Skip Auth)"**.

---

## 📦 Tech Stack

| Layer | Stack |
|-------|-------|
| Backend | FastAPI, Uvicorn, WebSockets, Pydantic |
| Frontend | React Native (Expo), React Navigation v6, Reanimated |
| Real-time | Native WebSockets |
| Auth (V1) | Demo bypass |
| Data (V1) | In-memory dummy data |

---

*MedGuardian v1.0 — V1 In-Memory Simulation Mode*  
*Phase 2: PostgreSQL · Firebase · Real Police API Integration*
