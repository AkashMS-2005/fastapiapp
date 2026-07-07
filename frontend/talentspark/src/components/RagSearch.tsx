import { useState } from "react";
import RagService from "../Services/RagService";
import "./rag.css";

const RagSearch = () => {

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {

        if (!question.trim()) {

            alert("Please enter your question.");

            return;
        }

        try {

            setLoading(true);

            const response = await RagService.askAI(question);

            setAnswer(response.data.answer);

        } catch (error) {

            console.error(error);

            alert("Unable to get AI response.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="rag-card">

            <h2>🤖 AI Career Assistant</h2>

            <input
                className="rag-input"
                type="text"
                placeholder="Ask anything about jobs..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <button
                className="rag-btn"
                onClick={handleAsk}
                disabled={loading}
            >
                {loading ? "Thinking..." : "Ask AI"}
            </button>

            {answer && (

                <div className="rag-result">

                    <h3>AI Response</h3>

                    <pre>{answer}</pre>

                </div>

            )}

        </div>

    );

};

export default RagSearch;