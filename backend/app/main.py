from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, company, job, chat,rag

app = FastAPI(
    title="TalentSpark API",
    version="1.0.0",
    description="TalentSpark Backend using FastAPI"
)

# React Frontend URL
origins = [
    "http://localhost:5173",
]

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(company.router)
app.include_router(job.router)
app.include_router(chat.router)
app.include_router(rag.router)

# Root Endpoint
@app.get("/")
def root():
    return {
        "message": "TalentSpark Backend Running Successfully"
    }

# Health Check Endpoint
@app.get("/health")
def health():
    return {
        "status": "OK"
    }