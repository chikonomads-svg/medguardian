// MedGuardian — Dummy Data (Web)
export const DOCTOR = {
    id: 'doc-001', full_name: 'Dr. Arjun Mehta', initials: 'AM',
    specialty: 'Orthopedic Surgery', hospital: 'AIIMS New Delhi',
    phone: '+91 98765 43210', email: 'arjun.mehta@aiims.in',
    mrn: 'MH-MRN-2025-001', membership: 'Premium Shield',
    valid_until: '2026-12-31', incidents_count: 2,
};

export const IRU_UNITS = [
    {
        id: 'iru-01', unit_code: 'MG-21', team_lead: 'Rajesh Patil', phone: '+91 98765 11111',
        vehicle: 'Tata Safari MG-21', team_size: 5, city: 'Mumbai', region: 'Maharashtra',
        lat: 19.0860, lng: 72.8890, status: 'available'
    },
    {
        id: 'iru-02', unit_code: 'MG-22', team_lead: 'Anita Desai', phone: '+91 98765 22222',
        vehicle: 'Mahindra Scorpio MG-22', team_size: 4, city: 'Mumbai', region: 'Maharashtra',
        lat: 19.0650, lng: 72.8600, status: 'available'
    },
];

export const INCIDENTS = [
    {
        id: 'inc-001', location: 'Emergency Ward, KEM Hospital, Parel, Mumbai',
        date: '2025-01-15', status: 'resolved', severity: 'high',
        unit: 'MG-21', lawyer: 'Adv. Priya Sharma'
    },
    {
        id: 'inc-002', location: 'OPD Block B, AIIMS New Delhi',
        date: '2024-11-23', status: 'resolved', severity: 'medium',
        unit: 'MG-22', lawyer: 'Adv. Rahul Verma'
    },
    {
        id: 'inc-003', location: 'ICU, Fortis Hospital, Bangalore',
        date: '2024-08-09', status: 'cancelled', severity: 'low',
        unit: null, lawyer: null
    },
];

export const LAWYERS = [
    {
        id: 'law-01', name: 'Adv. Priya Sharma', specialty: 'Medical Law & IPC Section 304A',
        city: 'Mumbai', experience: 12, bar: 'MH/2013/45678', available: true
    },
    {
        id: 'law-02', name: 'Adv. Rahul Verma', specialty: 'Healthcare Litigation',
        city: 'Delhi', experience: 8, bar: 'DL/2017/23456', available: true
    },
    {
        id: 'law-03', name: 'Adv. Meera Iyer', specialty: 'Medical Protection & Human Rights',
        city: 'Bangalore', experience: 15, bar: 'KA/2010/12345', available: false
    },
];

export const POSTS = [
    {
        id: 'p1', author: 'Dr. Sneha Kapoor', specialty: 'Emergency Medicine', type: 'incident_share',
        content: 'Faced mob violence in ER last night. IRU reached in 8 minutes. Grateful for MedGuardian.',
        upvotes: 47, comments: 12, anonymous: false, time: '2h ago'
    },
    {
        id: 'p2', author: 'Anonymous Doctor', specialty: 'General Surgery', type: 'support',
        content: 'To fellow doctors going through tough times — you are not alone. This community has your back.',
        upvotes: 89, comments: 23, anonymous: true, time: '5h ago'
    },
    {
        id: 'p3', author: 'Dr. Vikram Singh', specialty: 'Pediatrics', type: 'advice',
        content: 'Always document CCTV footage and keep a witness list. It saved my case.',
        upvotes: 124, comments: 31, anonymous: false, time: '1d ago'
    },
    {
        id: 'p4', author: 'Dr. Fatima Khan', specialty: 'Dermatology', type: 'question',
        content: 'Has anyone used the FIR template successfully in Maharashtra? How responsive were the police?',
        upvotes: 33, comments: 18, anonymous: false, time: '2d ago'
    },
];

export const MEDIA_STATEMENTS = [
    {
        id: 'ms-01', title: 'Official Statement: KEM Hospital Incident',
        content: 'MedGuardian condemns the violence against Dr. [Name] at KEM Hospital. Our IRU team responded within 8 minutes...',
        status: 'published', date: '2025-01-16'
    },
    {
        id: 'ms-02', title: 'Declaration on Healthcare Worker Safety',
        content: 'We call upon the government to enforce stricter penalties. Data from 500+ incidents shows 72% of attacks occur in emergency wards...',
        status: 'published', date: '2024-12-01'
    },
];

export const FIR_TEMPLATE = `FIRST INFORMATION REPORT (FIR)
Under Section 154 Cr.P.C.

Station: _______________
Date/Time: _______________

Complainant:
Name: Dr. _______________
MRN: _______________
Hospital: _______________

Details of Incident:
Date/Time: _______________
Location: _______________
Nature: Physical assault / Verbal threat / Property damage

Description:
_______________________________________________
_______________________________________________

Witnesses:
1. _______________
2. _______________

Evidence: CCTV footage / Mobile recording / Photographs

Note: This FIR is filed under the Medical Protection Act.
The MedGuardian Legal Cell is providing representation.`;
