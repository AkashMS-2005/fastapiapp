from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    session_id: str="default_session"

class ChatResponse(BaseModel):
    response:str

    