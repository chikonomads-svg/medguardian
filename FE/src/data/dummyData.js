// MedGuardian — All Dummy Data

export const DUMMY_DOCTOR = {
    id: 'doc-001',
    full_name: 'Dr. Arjun Mehta',
    email: 'arjun.mehta@aiims.edu',
    phone: '+91-9812345678',
    specialty: 'Emergency Medicine',
    hospital: 'AIIMS New Delhi',
    mrn: 'MH-2019-45231',
    membership: 'Premium Shield',
    membership_valid_until: '2026-12-31',
    member_since: '2024-01-15',
    incidents_count: 2,
    avatar_initials: 'AM',
};

export const DUMMY_IRU_UNITS = [
    {
        unit_id: 'IRU-MUM-01',
        unit_code: 'MG-21',
        city: 'Mumbai',
        region: 'South Mumbai',
        team_size: 4,
        team_lead: 'Rajesh Patil',
        team_lead_phone: '+91-9900112233',
        vehicle: 'SUV — MH-01-AB-4521',
        availability: 'available',
        latitude: 19.076,
        longitude: 72.8777,
    },
    {
        unit_id: 'IRU-MUM-02',
        unit_code: 'MG-22',
        city: 'Mumbai',
        region: 'Andheri West',
        team_size: 3,
        team_lead: 'Suresh Kumar',
        team_lead_phone: '+91-9900445566',
        vehicle: 'Van — MH-02-CD-7890',
        availability: 'available',
        latitude: 19.119,
        longitude: 72.847,
    },
];

export const DUMMY_INCIDENTS = [
    {
        id: 'inc-001',
        alert_status: 'resolved',
        trigger_time: '2025-12-10T14:22:00',
        location_address: 'KEM Hospital, Mumbai',
        assigned_unit: 'MG-21',
        lawyer_assigned: 'Adv. Priya Sharma',
        severity_level: 'high',
        description: 'Patient party mob tried to assault doctor in ward.',
        resolved_at: '2025-12-10T16:45:00',
    },
    {
        id: 'inc-002',
        alert_status: 'resolved',
        trigger_time: '2026-02-12T09:15:00',
        location_address: 'Lilavati Hospital, Bandra',
        assigned_unit: 'MG-22',
        lawyer_assigned: 'Adv. Vivek Rao',
        severity_level: 'medium',
        description: 'Verbal threats from family member in ICU corridor.',
        resolved_at: '2026-02-12T11:30:00',
    },
    {
        id: 'inc-003',
        alert_status: 'cancelled',
        trigger_time: '2026-02-21T21:08:00',
        location_address: 'Ruby Hall Clinic, Pune',
        assigned_unit: null,
        lawyer_assigned: null,
        severity_level: 'low',
        description: 'Accidental trigger — test.',
        resolved_at: '2026-02-21T21:08:30',
    },
];

export const DUMMY_COMMUNITY_POSTS = [
    {
        id: 'post-001',
        author: 'Dr. Kavita Nair',
        specialty: 'Cardiology',
        is_anonymous: false,
        post_type: 'incident_share',
        content:
            'Faced a mob situation at Sion Hospital last week. MedGuardian\'s IRU arrived in 12 minutes. Absolutely life-saving. Thank you team 🛡️',
        upvotes: 47,
        comments_count: 8,
        created_at: '6 hours ago',
    },
    {
        id: 'post-002',
        author: 'Anonymous Doctor',
        specialty: 'General Medicine',
        is_anonymous: true,
        post_type: 'support',
        content:
            'After last month\'s incident I developed severe anxiety entering the ward. Has anyone else dealt with this? How did you cope?',
        upvotes: 92,
        comments_count: 23,
        created_at: '14 hours ago',
    },
    {
        id: 'post-003',
        author: 'Dr. Rahul Desai',
        specialty: 'Neurosurgery',
        is_anonymous: false,
        post_type: 'advice',
        content:
            'Document EVERYTHING. Start audio recording before any tense family interaction. It saved my case in court.',
        upvotes: 134,
        comments_count: 11,
        created_at: '1 day ago',
    },
    {
        id: 'post-004',
        author: 'Dr. Meera Pillai',
        specialty: 'Pediatrics',
        is_anonymous: false,
        post_type: 'question',
        content:
            'Has anyone used the FIR template from MedGuardian legal? Was it accepted as-is at the police station?',
        upvotes: 28,
        comments_count: 14,
        created_at: '2 days ago',
    },
    {
        id: 'post-005',
        author: 'Dr. Sanjay Ghosh',
        specialty: 'Orthopaedics',
        is_anonymous: false,
        post_type: 'support',
        content:
            'Just renewed my Premium Shield membership for the third year. Peace of mind is priceless. Highly recommend to every clinician.',
        upvotes: 61,
        comments_count: 5,
        created_at: '3 days ago',
    },
];

export const DUMMY_LAWYERS = [
    {
        id: 'law-001',
        full_name: 'Adv. Priya Sharma',
        specialty: 'Medical Negligence & Criminal Defense',
        city: 'Mumbai',
        experience_years: 11,
        bar_number: 'MH/1234/2015',
        phone: '+91-9822334455',
        is_available: true,
    },
    {
        id: 'law-002',
        full_name: 'Adv. Vivek Rao',
        specialty: 'Constitutional Law & Doctor Rights',
        city: 'New Delhi',
        experience_years: 14,
        bar_number: 'DL/5678/2012',
        phone: '+91-9811556677',
        is_available: true,
    },
];

export const FIR_TEMPLATE = `FIRST INFORMATION REPORT (FIR) TEMPLATE
─────────────────────────────────────────
MedGuardian Legal Cell | Version 1.0

DATE: [INSERT DATE]
POLICE STATION: [INSERT POLICE STATION]

TO,
The Station House Officer,
[Police Station Name], [City]

SUBJECT: Complaint of assault/threat against Dr. [NAME]

I, Dr. [DOCTOR NAME], [SPECIALTY], attached to [HOSPITAL],
lodge this complaint under Sections 323, 341, 506 IPC.

INCIDENT:
On [DATE] at [TIME], at [LOCATION], a group of [NUMBER]
persons entered the premises and:
• Verbally abused and threatened my life
• Physically assaulted me (if applicable)
• Caused damage to hospital property

We request immediate action and protection for all
medical staff at this facility.

Dr. [NAME]
MRN: [MEDICAL REGISTRATION NUMBER]
Contact: [PHONE]
Date: [DATE]
`;

export const MEDIA_STATEMENTS = [
    {
        id: 'stmt-001',
        title: 'Official Statement — KEM Hospital Incident',
        content:
            'MedGuardian Legal Cell: Dr. Mehta is safe following an unfortunate incident at KEM Hospital. Our IRU team secured the premises within 12 minutes. Legal proceedings are underway. We call for strict enforcement of the Epidemic Diseases Act amendments protecting healthcare workers.',
        status: 'published',
        published_at: '2025-12-11',
    },
];
