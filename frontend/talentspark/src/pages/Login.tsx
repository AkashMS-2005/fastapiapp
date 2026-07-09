import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle, Loader } from "lucide-react";
import { login } from "../Services/AuthService";
import "../styles/login.css";

type Props = {
    onLoginSuccess?: () => void;
};

function Login({ onLoginSuccess }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await login({ email, password });
            if (response && response.access_token) {
                // If onLoginSuccess callback is provided, invoke it
                onLoginSuccess?.();
                // Navigate to home/dashboard
                navigate("/");
            } else {
                setError("Login succeeded but no token was returned.");
            }
        } catch (err: any) {
            console.error("Error during login:", err);
            // Handle error messages from backend response if available
            const message = err.response?.data?.detail || "Invalid email or password. Please try again.";
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
                    <h2>Welcome Back</h2>
                    <p>Enter your credentials to access your career dashboard</p>
                </div>

                {error && (
                    <div className="error-banner">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
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

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader className="animate-spin" size={18} style={{ animation: "spin 1s linear infinite" }} />
                                Logging in...
                            </>
                        ) : (
                            <>
                                Login
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer-text">
                    Don't have an account?{" "}
                    <Link to="/register" className="auth-link">
                        Register here
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

export default Login;