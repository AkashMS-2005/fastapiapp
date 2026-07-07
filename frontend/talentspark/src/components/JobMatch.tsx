import { useState } from "react";
import RagService from "../Services/RagService";
import type { JobMatchResult } from "../types/rag";
import "../styles/rag.css";

function JobMatch() {

    const [skills, setSkills] = useState("");

    const [experience, setExperience] = useState(0);

    const [loading, setLoading] = useState(false);

    const [matches, setMatches] = useState<JobMatchResult[]>([]);

    const handleMatch = async () => {

        if (!skills.trim()) {

            alert("Please enter your skills.");

            return;

        }

        try {

            setLoading(true);

            const response = await RagService.jobMatch(
                skills.split(",").map(skill => skill.trim()),
                experience
            );

            setMatches(response.data.matches);

        } catch (err) {

            console.error(err);

            alert("Unable to match jobs.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <section className="rag-container">

            <div className="rag-box">

                <div className="rag-header">

                    <h1>

                        🎯 AI Job Matcher

                    </h1>

                    <p>

                        Discover the best jobs based on your skills and experience.

                    </p>

                </div>

                <div className="match-form">

                    <input

                        type="text"

                        className="match-input"

                        placeholder="Python, React, FastAPI, SQL"

                        value={skills}

                        onChange={(e)=>setSkills(e.target.value)}

                    />

                    <input

                        type="number"

                        className="match-input"

                        value={experience}

                        min={0}

                        placeholder="Years of Experience"

                        onChange={(e)=>setExperience(Number(e.target.value))}

                    />

                    <button

                        className="premium-btn"

                        onClick={handleMatch}

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Matching..."

                            :

                            "🚀 Find Jobs"

                        }

                    </button>

                </div>

                {

                    matches.length>0 &&

                    <div className="match-grid">

                        {

                            matches.map(job=>(

                                <div

                                    className="match-card"

                                    key={job.job_id}

                                >

                                    <div className="match-score">

                                        {job.match_score.toFixed(0)}%

                                    </div>

                                    <h2>

                                        {job.title}

                                    </h2>

                                    <p>

                                        {job.description}

                                    </p>

                                    <div className="match-footer">

                                        <span>

                                            💰 ₹ {job.salary}

                                        </span>

                                        <button className="apply-btn">

                                            Apply Now

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

export default JobMatch;