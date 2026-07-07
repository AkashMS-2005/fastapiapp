import { useState } from "react";
import RagService from "../Services/RagService";
import "./rag.css";

const ResumeAnalysis = () => {
  const [resume, setResume] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyseResume = async () => {
    if (!resume.trim()) {
      alert("Please paste your resume.");
      return;
    }

    try {
      setLoading(true);

      const response = await RagService.analyseResume(resume);

      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error(error);
      alert("Failed to analyse resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rag-card">

      <h2>📄 Resume Analyzer</h2>

      <textarea
        className="rag-textarea"
        rows={12}
        placeholder="Paste your resume here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <button
        className="rag-btn"
        onClick={analyseResume}
        disabled={loading}
      >
        {loading ? "Analysing..." : "Analyse Resume"}
      </button>

      {analysis && (
        <div className="rag-result">
          <h3>Analysis</h3>

          <pre>{analysis}</pre>
        </div>
      )}

    </div>
  );
};

export default ResumeAnalysis;