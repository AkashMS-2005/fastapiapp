import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq

from langchain_core.prompts import ChatPromptTemplate

from langchain_core.runnables.history import RunnableWithMessageHistory

from langchain_community.chat_message_histories import ChatMessageHistory

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

MODEL = "llama-3.3-70b-versatile"

llm = ChatGroq(
    groq_api_key=GROQ_API_KEY,
    model_name=MODEL,
    temperature=0.7
)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are TalentSpark AI.

You are an intelligent AI Career Assistant.

IMPORTANT:

- Always remember previous messages in the conversation.
- Use the conversation history when answering.
- If the user tells you their name, remember it.
- If they ask follow-up questions, answer using previous messages.

You help users with:

• Companies
• Jobs
• Resume Building
• Interview Preparation
• Programming
• AI
• Career Guidance

Be friendly and conversational.
"""
        ),
        ("placeholder", "{chat_history}"),
        ("human", "{user_query}")
    ]
)

chain = prompt | llm

# Global memory store
store = {}


def get_history(session_id: str):

    if session_id not in store:
        print(f"Creating history for {session_id}")
        store[session_id] = ChatMessageHistory()

    return store[session_id]


chat_chain = RunnableWithMessageHistory(
    chain,
    get_history,
    input_messages_key="user_query",
    history_messages_key="chat_history",
)


def chat(message: str, session_id: str):

    response = chat_chain.invoke(
        {
            "user_query": message
        },
        config={
            "configurable": {
                "session_id": session_id
            }
        }
    )

    return response.content