import { useState } from "react";
import RagService from "../Services/RagService";
import type { JobMatchResult } from "../types/rag";
import "./rag.css";

const JobMatch = () => {

    const [skills, setSkills] = useState("");

    const [experience, setExperience] = useState(0);

    const [matches, setMatches] = useState<JobMatchResult[]>([]);

    const [loading, setLoading] = useState(false);

    const handleMatch = async () => {

        if (!skills.trim()) {

            alert("Enter your skills.");

            return;

        }

        try {

            setLoading(true);

            const response = await RagService.jobMatch(

                skills
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill.length > 0),

                experience

            );

            setMatches(response.data.matches);

        } catch (error) {

            console.error(error);

            alert("Unable to match jobs.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="rag-card">

            <h2>🎯 AI Job Matching</h2>

            <input
                className="rag-input"
                type="text"
                placeholder="Example: Python, FastAPI, React"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
            />

            <input
                className="rag-input"
                type="number"
                min={0}
                placeholder="Years of Experience"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
            />

            <button
                className="rag-btn"
                onClick={handleMatch}
                disabled={loading}
            >
                {loading ? "Matching..." : "Match Jobs"}
            </button>

            {

                matches.length > 0 && (

                    <div className="rag-result">

                        <h3>Recommended Jobs</h3>

                        {
    matches.map((job) => (

        <div
            key={job.job_id}
            className="job-result-card"
        >

            <h4>{job.title}</h4>

            <p>
                <strong>Description:</strong>{" "}
                {job.description}
            </p>

            <p>
                <strong>Salary:</strong>{" "}
                ₹{job.salary?.toLocaleString()}
            </p>

            <p>
                <strong>Match Score:</strong>{" "}
                {job.match_score.toFixed(2)}%
            </p>

        </div>

    ))
}

                    </div>

                )

            }

        </div>

    );

};

export default JobMatch;