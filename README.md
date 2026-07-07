# 🌟 TalentSpark: AI-Powered Recruitment & Job Matching Platform

TalentSpark is a modern, full-stack recruitment platform designed to connect talent with opportunities. It utilizes **FastAPI** on the backend, **React (Vite + TypeScript)** on the frontend, **PostgreSQL** for persistent relational storage, **Qdrant Vector Cloud** for semantic searches & profile matching, and **LangChain + Groq (Llama-3.3-70b)** for LLM-powered resume analytics and retrieval-augmented generation (RAG) assistance.

---

## 🚀 Key Features

### 🧠 Intelligent Recruitment Features
* **AI Resume Analysis**: Evaluates resume text and extracts key skills, experience level, strengths, areas for improvement, and suggested job roles.
* **Automated Job Matching**: Matches candidate profiles (skills and experience) against vector-embedded job descriptions, displaying a similarity percentage match score.
* **RAG Job Search Assistant**: Ask the AI questions about available job openings; the assistant retrieves the top matching jobs and answers queries based only on verified job contexts (preventing hallucinations).
* **Semantic Job Search**: Contextual search that understands user intent and semantic meaning instead of just exact keyword matches.

### 💼 Application Infrastructure
* **Full CRUD APIs**: Managed APIs for Companies and Job Listings with PostgreSQL and SQLAlchemy ORM.
* **Secure Authentication**: Role-based authentication using JWT tokens and secure password hashing.
* **Premium Dashboard Interface**: React-based dashboard featuring a collapsible sidebar, interactive charts, and user-friendly components animated with Framer Motion.

---

## 🏗️ System Architecture

```mermaid
graph TD
    Client["React Frontend (Vite + TS)"] -->|HTTP Requests| FastAPI["FastAPI Backend"]
    
    subgraph FastAPI Backend
        Router["API Routers: Auth, Company, Job, Chat, RAG"] -->|SQLAlchemy ORM| PG[("PostgreSQL Database")]
        Router -->|Services| Services["Services Layer"]
        
        Services -->|FastEmbed / Qdrant SDK| Qdrant[("Qdrant Vector Database")]
        Services -->|LangChain ChatGroq| LLM["Groq Cloud: Llama-3.3-70b"]
    end
    
    style Client fill:#2563eb,stroke:#3b82f6,stroke-width:2px,color:#fff
    style FastAPI fill:#059669,stroke:#10b981,stroke-width:2px,color:#fff
    style PG fill:#4b5563,stroke:#6b7280,stroke-width:2px,color:#fff
    style Qdrant fill:#ea580c,stroke:#f97316,stroke-width:2px,color:#fff
    style LLM fill:#7c3aed,stroke:#8b5cf6,stroke-width:2px,color:#fff
```

### Flow of Data for RAG Search
1. The user asks a question via the React frontend.
2. The FastAPI backend embeds the user's question using `BAAI/bge-small-en-v1.5` embeddings via **FastEmbed**.
3. The backend queries the Qdrant Cloud collection (`job_descriptions`) to retrieve top matching job vectors.
4. The retrieved job contexts (title, description, salary, similarity score) are passed to the LangChain prompt template.
5. The LangChain chain invokes the ChatGroq model (`llama-3.3-70b-versatile`) with the contextual prompt.
6. The model responds with a formatted response, which is returned to the user.

---

## 📁 Directory Structure

```text
fastapiapp/
├── backend/                        # FastAPI Application
│   ├── alembic/                    # Database Migrations
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py                 # FastAPI Entry Point & CORS Setup
│   ├── models/                     # SQLAlchemy Models
│   │   ├── company.py              # Company Model
│   │   ├── job.py                  # Job Model
│   │   └── users.py                # User Model
│   ├── routers/                    # Endpoint Routers
│   │   ├── auth.py                 # Authentication Endpoints
│   │   ├── chat.py                 # Chat & Assistant Endpoints
│   │   ├── company.py              # Company CRUD
│   │   ├── job.py                  # Job CRUD
│   │   └── rag.py                  # RAG & Resume Analysis Endpoints
│   ├── schemas/                    # Pydantic Schemas
│   │   ├── chat.py
│   │   ├── company.py
│   │   ├── job.py
│   │   ├── rag.py                  # Requests & Responses for RAG
│   │   ├── token.py
│   │   └── users.py
│   ├── services/                   # Business & LLM logic
│   │   ├── langchain_service.py
│   │   ├── qdrant_service.py       # Embeddings and Qdrant interactions
│   │   ├── rag_service.py          # RAG pipeline logic
│   │   └── resume_service.py       # Resume analysis prompt and chain
│   ├── utils/                      # Helper Utilities
│   │   ├── oauth2.py               # Token verification middleware
│   │   ├── security.py             # Hash utilities
│   │   └── token.py                # JWT token helpers
│   ├── database.py                 # Database Connection configuration
│   ├── requirements.txt            # Python Dependencies
│   └── .env                        # Environment Configuration
│
└── frontend/
    └── talentspark/                # React Vite + TypeScript App
        ├── src/
        │   ├── assets/                 # Static Assets
        │   ├── components/             # Reusable UI Components
        │   │   ├── ChatButton.tsx
        │   │   ├── ChatWindow.tsx
        │   │   ├── CompanyCard.tsx
        │   │   ├── Footer.tsx
        │   │   ├── JobCard.tsx
        │   │   ├── JobMatch.tsx
        │   │   ├── NavBar.tsx
        │   │   ├── RagSearch.tsx
        │   │   ├── ResumeAnalysis.tsx
        │   │   ├── SemanticSearch.tsx
        │   │   ├── Sidebar.tsx
        │   │   └── Welcome.tsx
        │   ├── layout/                 # Layout wrappers
        │   │   └── DashboardLayout.tsx
        │   ├── pages/                  # Main Page Views
        │   │   ├── ChatPage.tsx
        │   │   ├── JobMatchingPage.tsx
        │   │   ├── Login.tsx
        │   │   ├── Register.tsx
        │   │   └── ResumeAnalyserPage.tsx
        │   ├── Services/               # Axios API Services
        │   │   ├── api.ts
        │   │   ├── AuthService.ts
        │   │   ├── ChatService.ts
        │   │   ├── CompanyService.ts
        │   │   ├── JobService.ts
        │   │   └── RagService.ts
        │   ├── styles/                 # Custom CSS
        │   ├── types/                  # TypeScript Interfaces
        │   ├── App.tsx                 # Routing & Protected Route setup
        │   ├── main.tsx
        │   └── index.css
        ├── package.json
        └── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
* **Python 3.10+**
* **Node.js 18+ & npm**
* **PostgreSQL Database**
* **Qdrant Vector Database Account** (Free tier on Qdrant Cloud or local Docker instance)
* **Groq API Key**

---

### 1. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment & activate it:**
   ```bash
   # Windows
   python -m venv env
   .\env\Scripts\activate

   # macOS/Linux
   python3 -m venv env
   source env/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the Environment Variables:**
   Create a `.env` file in the `backend/` directory with the following variables:
   ```env
   SECRET_KEY=your_jwt_secret_key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   
   # Groq LLM Setup
   GROQ_API_KEY=your_groq_api_key
   
   # Qdrant Vector DB Setup
   QDRANT_URL=your_qdrant_cloud_url_or_localhost
   QDRANT_API_KEY=your_qdrant_api_key_if_cloud
   
   # Database Setup
   # PostgreSQL Connection String: postgresql://username:password@host:port/database_name
   DATABASE_URL=postgresql://postgres:admin123@localhost:5432/student_db
   ```

5. **Run database migrations:**
   ```bash
   alembic upgrade head
   ```

6. **Start the FastAPI backend server:**
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend API will be available at `http://localhost:8000`. You can access the interactive Swagger documentation at `http://localhost:8000/docs`.

---

### 2. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend/talentspark
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

---

## ⚡ API Endpoints Summary

### Authentication (`/auth`)
* `POST /auth/register` - Create a new user account.
* `POST /auth/token` - Authenticate user and receive a JWT token.

### Companies (`/companies`)
* `POST /companies` - Create a new company profile.
* `GET /companies` - Retrieve a list of companies.
* `GET /companies/{id}` - Retrieve details of a specific company.
* `PUT /companies/{id}` - Update company details.
* `DELETE /companies/{id}` - Delete a company profile.

### Jobs (`/jobs`)
* `POST /jobs` - Add a new job listing.
* `GET /jobs` - Retrieve all job listings.
* `GET /jobs/{id}` - Retrieve a specific job.
* `PUT /jobs/{id}` - Update a job listing.
* `DELETE /jobs/{id}` - Remove a job listing.

### RAG and AI Operations (`/rag`)
* `POST /rag/embed-jobs` - Fetches all jobs from PostgreSQL, generates embeddings, and upserts them to the Qdrant Cloud.
* `POST /rag/search` - Searches for jobs using semantic vector comparison.
* `POST /rag/ask` - Answers question using context retrieved from the job listings vector database.
* `POST /rag/analyse-resume` - Submits raw resume text to Llama 3.3 for structured layout feedback.
* `POST /rag/job-match` - Calculates similarity percentages between user profile skills/experience and database job descriptions.
