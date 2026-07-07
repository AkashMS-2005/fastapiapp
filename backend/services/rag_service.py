import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

from services.qdrant_service import search_jobs

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
)

rag_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an AI Job Search Assistant.

Use ONLY the retrieved job listings below to answer the user's question.

Retrieved Jobs:
{context}

If no suitable job exists, clearly say so.
Answer in a professional and concise manner.
"""
    ),
    ("human", "{question}")
])

rag_chain = rag_prompt | llm


def rag_job_search(query: str, top_k: int = 5) -> str:

    # Retrieve similar jobs from Qdrant
    results = search_jobs(query, top_k)

    if not results:
        return (
            "No relevant job listings found in the database. "
            "Please embed jobs first using the /rag/embed-jobs endpoint."
        )

    # Build context for the LLM
    context = "\n\n".join(
        [
            f"""
Job Title: {job['title']}
Description: {job['description']}
Salary: {job['salary']}
Similarity Score: {job['score']:.2f}
"""
            for job in results
        ]
    )

    # Invoke the LLM
    response = rag_chain.invoke(
        {
            "context": context,
            "question": query
        }
    )

    return response.content