# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from database import Base,engine    
# pyrefly: ignore [missing-import]
from routers import auth, company, job, chat,rag

app = FastAPI(
    title="Akash M S Spark API",
    version="1.0.0",
    description="Akash M S Spark Backend using FastAPI"
)

@app.on_event("startup")
async def startup_event():
    from database import engine
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

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
        "message": "Akash M S Spark Backend Running Successfully"
    }

# Health Check Endpoint
@app.get("/health")
def health():
    return {
        "status": "OK"
    }