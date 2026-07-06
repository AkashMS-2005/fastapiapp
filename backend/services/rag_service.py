import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplatefrom
from services.qdrant_service import search_jobs

load_dotenv()
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
)
rag_prompt=ChatPromptTemplate.from_messages([
    ("system","""you are a job search assistance.
    Use the following job listings retrieved from the database to answer the user's question.
     
     Retrieved Jobs:
        {context}"""),
            ("human","{question}")
    ])
rag_chain = rag_prompt | llm


def rag_job_search(query: str, top_k: int = 5) -> str:

    results = search_jobs(query, top_k)
    
    if not results:
        return "No relevant job listings found in database. Please embed jobs first using the /rag/embed-jobs endpoint"
    

    context = "\n".join(
        [f" - {r['title']}: {r['description']} (salary:{r['salary']},match:{r['score']})"
        for r in results
        ]
    )
    

    response = rag_chain.invoke({"context": context, "question": question})
    
    return response.content