# pyrefly: ignore [missing-import]
from fastapi import APIRouter, HTTPException

from schemas.chat import ChatRequest, ChatResponse

from services.langchain_service import chat

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/", response_model=ChatResponse)
def chatbot(request: ChatRequest):

    try:

        response = chat(
            request.message,
            request.session_id
        )

        return ChatResponse(
            response=response
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )