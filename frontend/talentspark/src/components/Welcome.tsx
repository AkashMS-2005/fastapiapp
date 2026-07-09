import "../styles/dashboard.css";

function Welcome() {

    return (

        <>

            <section className="hero">

                <div className="hero-content">

                    <div className="hero-left">

                        <h1>

                            Find Your

                            <br />

                            <span>Dream Job</span>

                            <br />

                            with AI

                        </h1>

                        <p>

                            Akash M S Spark helps students and professionals
                            discover jobs, analyse resumes, perform semantic
                            search and chat with an AI career assistant.

                        </p>

                        <div className="hero-buttons">

                            <button className="primary-btn">

                                🚀 Explore Jobs

                            </button>

                            <button className="secondary-btn">

                                Learn More

                            </button>

                        </div>

                    </div>

                    <div className="hero-right">

                        <div className="ai-card">

                            <h2>

                                🤖 AI Features

                            </h2>

                            <p>

                                Everything you need to accelerate your career.

                            </p>

                            <ul>

                                <li>✅ AI Resume Analysis</li>

                                <li>✅ Semantic Job Search</li>

                                <li>✅ AI Job Matching</li>

                                <li>✅ Career Chatbot</li>

                                <li>✅ Smart Recommendations</li>

                            </ul>

                        </div>

                    </div>

                </div>

            </section>

            <section className="stats">

                <div className="stat-card">

                    <h2>500+</h2>

                    <p>Companies</p>

                </div>

                <div className="stat-card">

                    <h2>10K+</h2>

                    <p>Jobs</p>

                </div>

                <div className="stat-card">

                    <h2>95%</h2>

                    <p>AI Accuracy</p>

                </div>

                <div className="stat-card">

                    <h2>24/7</h2>

                    <p>Career Assistant</p>

                </div>

            </section>

        </>

    );

}

export default Welcome;