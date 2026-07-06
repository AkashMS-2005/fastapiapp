from fastapi import APIRouter
from pydantic import BaseModel

from services.langchain_service import chat

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    response: str


@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    reply = chat(
        session_id=request.session_id,
        message=request.message
    )

    return ChatResponse(response=reply)