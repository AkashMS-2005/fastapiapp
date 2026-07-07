import { useState } from "react";
import RagService from "../Services/RagService";
import "../styles/rag.css";

function ResumeAnalysis() {

    const [resume, setResume] = useState("");

    const [loading, setLoading] = useState(false);

    const [analysis, setAnalysis] = useState("");

    const analyseResume = async () => {

        if (!resume.trim()) {

            alert("Please enter your resume.");

            return;

        }

        try {

            setLoading(true);

            const response = await RagService.analyseResume(resume);

            setAnalysis(response.data.analysis);

        }

        catch (err) {

            console.error(err);

            alert("Unable to analyse resume.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <section className="rag-container">

            <div className="rag-box">

                <div className="rag-header">

                    <div>

                        <h1>

                            🤖 AI Resume Analyzer

                        </h1>

                        <p>

                            Upload or paste your resume and receive AI-powered
                            career insights instantly.

                        </p>

                    </div>

                </div>

                <textarea

                    className="resume-input"

                    placeholder="Paste your resume here..."

                    value={resume}

                    onChange={(e)=>setResume(e.target.value)}

                />

                <button

                    className="premium-btn"

                    onClick={analyseResume}

                    disabled={loading}

                >

                    {

                        loading

                        ?

                        "Analyzing Resume..."

                        :

                        "🚀 Analyze Resume"

                    }

                </button>

                {

                    analysis &&

                    <div className="analysis-card">

                        <h2>

                            AI Analysis

                        </h2>

                        <pre>

                            {analysis}

                        </pre>

                    </div>

                }

            </div>

        </section>

    );

}

export default ResumeAnalysis;