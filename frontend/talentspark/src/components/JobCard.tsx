import { useEffect, useState } from "react";
import JobService from "../Services/JobService";
import type { Job } from "../types/job";
import "../styles/cards.css";

function JobCard() {

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            const response = await JobService.getJobs();

            setJobs(response);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return (
            <div className="cards-section">
                <h2 className="cards-title">Loading Jobs...</h2>
            </div>
        );
    }

    return (

        <section className="cards-section">

            <h1 className="cards-title">
                Latest Job Opportunities
            </h1>

            <p className="cards-subtitle">
                Discover jobs recommended for you
            </p>

            <div className="cards-grid">

                {jobs.map((job) => (

                    <div
                        className="job-card"
                        key={job.id}
                    >

                        <div className="job-header">

                            <div className="job-logo">
                                💼
                            </div>

                            <div>
                                <h3>{job.title}</h3>
                                <span>TalentSpark</span>
                            </div>

                        </div>

                        <div className="job-badges">

                            <span className="badge blue">
                                Full Time
                            </span>

                            <span className="badge green">
                                Remote
                            </span>

                        </div>

                        <p className="job-description">
                            {job.description}
                        </p>

                        <div className="job-footer">

                            <div>
                                <h4>₹ {job.salary}</h4>
                                <span>Annual Package</span>
                            </div>

                            <button className="apply-btn">
                                Apply →
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default JobCard;