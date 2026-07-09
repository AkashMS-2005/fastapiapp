import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Shield, ArrowRight, AlertCircle, Loader } from "lucide-react";
import { register } from "../Services/AuthService";
import "../styles/login.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await register({ name, email, password, role });
            // Successfully registered, redirect to login
            alert("Registration successful! Please login with your credentials.");
            navigate("/login");
        } catch (err: any) {
            console.error("Error during registration:", err);
            const message = err.response?.data?.detail || "Registration failed. Please try again.";
            setError(typeof message === "string" ? message : JSON.stringify(message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">🚀 Akash M S Spark</div>
                    <h2>Create Account</h2>
                    <p>Register to unlock job matching and AI analysis</p>
                </div>

                {error && (
                    <div className="error-banner">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <div className="auth-input-wrapper">
                            <User size={18} />
                            <input
                                id="name"
                                type="text"
                                className="auth-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="auth-input-wrapper">
                            <Mail size={18} />
                            <input
                                id="email"
                                type="email"
                                className="auth-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="auth-input-wrapper">
                            <Lock size={18} />
                            <input
                                id="password"
                                type="password"
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Your Role</label>
                        <div className="auth-input-wrapper">
                            <Shield size={18} />
                            <select
                                id="role"
                                className="auth-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                disabled={loading}
                            >
                                <option value="student">Student / Job Seeker</option>
                                <option value="recruiter">Recruiter / Employer</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader className="animate-spin" size={18} style={{ animation: "spin 1s linear infinite" }} />
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Register
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer-text">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                        Login here
                    </Link>
                </div>
            </div>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
}

export default Register;