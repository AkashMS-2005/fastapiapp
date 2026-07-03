# Project Structure

```text
fastapiapp/
│
├── backend/
│   │
│   ├── app/
│   │   └── main.py                 # FastAPI entry point
│   │
│   ├── models/
│   │   ├── company.py              # Company database model
│   │   ├── job.py                  # Job database model
│   │   └── user.py                 # User database model
│   │
│   ├── routers/
│   │   ├── auth.py                 # Authentication APIs
│   │   ├── company.py              # Company CRUD APIs
│   │   └── job.py                  # Job CRUD APIs
│   │
│   ├── schemas/
│   │   ├── company.py              # Company request/response schemas
│   │   ├── job.py                  # Job request/response schemas
│   │   ├── token.py                # JWT token schema
│   │   └── user.py                 # User request/response schemas
│   │
│   ├── utils/
│   │   ├── hash.py                 # Password hashing utilities
│   │   └── token.py                # JWT token generation & verification
│   │
│   ├── database.py                 # Database configuration
│   ├── requirements.txt            # Python dependencies
│   ├── .env                        # Environment variables
│   └── env/                        # Python virtual environment
│
├── frontend/
│   └── talentspark/
│       │
│       ├── src/
│       │   ├── components/
│       │   │   ├── CompanyCard.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── JobCard.tsx
│       │   │   ├── NavBar.tsx
│       │   │   └── Welcome.tsx
│       │   │
│       │   ├── Services/
│       │   │   ├── AuthService.ts
│       │   │   ├── CompanyService.ts
│       │   │   └── JobService.ts
│       │   │
│       │   ├── pages/
│       │   │   └── Login.tsx
│       │   │
│       │   ├── types/
│       │   │   ├── company.ts
│       │   │   └── job.ts
│       │   │
│       │   ├── assets/
│       │   ├── App.tsx
│       │   ├── App.css
│       │   ├── index.css
│       │   └── main.tsx
│       │
│       ├── public/
│       ├── package.json
│       ├── package-lock.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── node_modules/
│
└── README.md
```
