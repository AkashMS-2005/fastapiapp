import { NavLink } from "react-router-dom";
import {
    Home,
    Briefcase,
    FileText,
    Bot,
    User
} from "lucide-react";
import "../styles/sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="logo" style={{ cursor: "default" }}>
                🚀 TalentSpark
            </div>

            <nav>
                <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                    <Home size={20} />
                    Dashboard
                </NavLink>

                <NavLink to="/job-matcher" className={({ isActive }) => (isActive ? "active" : "")}>
                    <Briefcase size={20} />
                    AI Job Matcher
                </NavLink>

                <NavLink to="/chat" className={({ isActive }) => (isActive ? "active" : "")}>
                    <Bot size={20} />
                    AI Assistant
                </NavLink>

                <NavLink to="/resume-analyser" className={({ isActive }) => (isActive ? "active" : "")}>
                    <FileText size={20} />
                    Resume AI
                </NavLink>

                <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")} style={{ opacity: 0.6, cursor: "not-allowed" }} onClick={(e) => e.preventDefault()}>
                    <User size={20} />
                    Profile (Lock)
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;