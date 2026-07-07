import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layout/DashboardLayout";
import Welcome from "./components/Welcome";
import JobCard from "./components/JobCard";
import ChatPage from "./pages/ChatPage";
import ResumeAnalyserPage from "./pages/ResumeAnalyserPage";
import JobMatchingPage from "./pages/JobMatchingPage";
import { isAuthenticated } from "./Services/AuthService";

// Helper component to protect dashboard routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuth = isAuthenticated();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}

// Combined Dashboard Home view
function DashboardHome() {
    return (
        <div>
            <Welcome />
            <div style={{ marginTop: "40px" }}>
                <JobCard />
            </div>
        </div>
    );
}

function App() {
    // Keep track of auth state to force re-renders on login/logout
    const [userAuth, setUserAuth] = useState(isAuthenticated());

    const handleLoginSuccess = () => {
        setUserAuth(true);
    };

    useEffect(() => {
        // Sync auth state
        setUserAuth(isAuthenticated());
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Routes */}
                <Route
                    path="/login"
                    element={
                        userAuth ? (
                            <Navigate to="/" replace />
                        ) : (
                            <Login onLoginSuccess={handleLoginSuccess} />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        userAuth ? (
                            <Navigate to="/" replace />
                        ) : (
                            <Register />
                        )
                    }
                />

                {/* Dashboard & Feature Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <DashboardHome />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <ChatPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resume-analyser"
                    element={
                        <ProtectedRoute>
                            <ResumeAnalyserPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/job-matcher"
                    element={
                        <ProtectedRoute>
                            <JobMatchingPage />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;