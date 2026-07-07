import { useState } from "react";
import RagService from "../Services/RagService";
import type { SemanticSearchResult } from "../types/rag";
import "./rag.css";

const SemanticSearch = () => {

    const [query, setQuery] = useState("");

    const [jobs, setJobs] = useState<SemanticSearchResult[]>([]);

    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {

        if (!query.trim()) {

            alert("Enter a job search query.");

            return;
        }

        try {

            setLoading(true);

            const response = await RagService.semanticSearch(query);

            setJobs(response.data.results);

        } catch (error) {

            console.error(error);

            alert("Failed to search jobs.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="rag-card">

            <h2>🔍 Semantic Job Search</h2>

            <input
                className="rag-input"
                type="text"
                placeholder="Example: Python Backend Developer"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button
                className="rag-btn"
                onClick={handleSearch}
                disabled={loading}
            >
                {loading ? "Searching..." : "Search Jobs"}
            </button>

            {jobs.length > 0 && (

                <div className="rag-result">

                    <h3>Matching Jobs</h3>

                    {jobs.map((job) => (

                        <div
                            key={job.id}
                            className="job-result-card"
                        >

                            <h4>{job.title}</h4>

                            <p>

                                <strong>Company:</strong>

                                {" "}

                                {job.company}

                            </p>

                            <p>

                                <strong>Description:</strong>

                                {" "}

                                {job.description}

                            </p>

                            <p>

                                <strong>Similarity Score:</strong>

                                {" "}

                                {(job.score * 100).toFixed(2)}%

                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};

export default SemanticSearch;