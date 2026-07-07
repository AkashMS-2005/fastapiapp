import { useState } from "react";
import RagService from "../Services/RagService";
import type { SemanticSearchResult } from "../types/rag";
import "../styles/rag.css";

function SemanticSearch() {

    const [query, setQuery] = useState("");

    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState<SemanticSearchResult[]>([]);

    const handleSearch = async () => {

        if (!query.trim()) {

            alert("Please enter a search query.");

            return;

        }

        try {

            setLoading(true);

            const response = await RagService.semanticSearch(query);

            setResults(response.data.results);

        }

        catch (error) {

            console.error(error);

            alert("Search failed.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <section className="rag-container">

            <div className="rag-box">

                <div className="rag-header">

                    <h1>

                        🔍 AI Semantic Job Search

                    </h1>

                    <p>

                        Search jobs using natural language powered by AI.

                    </p>

                </div>

                <div className="search-box">

                    <input

                        type="text"

                        placeholder="Example: Python Developer with FastAPI"

                        value={query}

                        onChange={(e)=>setQuery(e.target.value)}

                    />

                    <button

                        className="premium-btn"

                        onClick={handleSearch}

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Searching..."

                            :

                            "Search"

                        }

                    </button>

                </div>

                {

                    results.length>0 &&

                    <div className="search-results">

                        {

                            results.map((job)=>(

                                <div

                                    key={job.job_id}

                                    className="search-card"

                                >

                                    <div className="search-header">

                                        <div>

                                            <h2>

                                                {job.title}

                                            </h2>

                                            <span>

                                                AI Recommended Job

                                            </span>

                                        </div>

                                        <div className="score-badge">

                                            {(job.score*100).toFixed(1)}%

                                        </div>

                                    </div>

                                    <p>

                                        {job.description}

                                    </p>

                                    <div className="search-footer">

                                        <span>

                                            💰 ₹ {job.salary}

                                        </span>

                                        <button className="premium-btn">

                                            View Job

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                }

            </div>

        </section>

    );

}

export default SemanticSearch;