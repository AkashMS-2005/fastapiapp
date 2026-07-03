fastapiapp/
│
├── backend/
│   │
│   ├── app/
│   │   └── main.py                 # FastAPI entry point
│   │
│   ├── models/
│   │   ├── company.py
│   │   ├── job.py
│   │   └── user.py
│   │
│   ├── routers/
│   │   ├── auth.py
│   │   ├── company.py
│   │   └── job.py
│   │
│   ├── schemas/
│   │   ├── company.py
│   │   ├── job.py
│   │   ├── token.py
│   │   └── user.py
│   │
│   ├── utils/
│   │   ├── hash.py
│   │   └── token.py
│   │
│   ├── database.py
│   ├── requirements.txt
│   ├── .env
│   └── env/                        # Virtual environment
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
│       │   │   ├── CompanyService.ts
│       │   │   └── JobService.ts
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
├── README.md
