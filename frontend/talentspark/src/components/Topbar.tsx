import { useNavigate } from "react-router-dom";
import { Bell, Search, LogOut } from "lucide-react";
import { logout } from "../Services/AuthService";
import "../styles/topbar.css";

function Topbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            logout();
            navigate("/login");
        }
    };

    return (
        <header className="topbar">
            <div className="search-box">
                <Search size={18} />
                <input placeholder="Search jobs, skills, or candidates..." />
            </div>

            <div className="topbar-right">
                <button title="Notifications">
                    <Bell size={20} />
                </button>

                <button onClick={handleLogout} title="Log Out" style={{ color: "#ef4444" }}>
                    <LogOut size={20} />
                </button>

                <div className="profile">
                    <img
                        src="https://ui-avatars.com/api/?name=TalentSpark+User&background=3b82f6&color=fff"
                        alt="profile"
                    />
                    <div>
                        <strong>Welcome</strong>
                        <small>TalentSpark User</small>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Topbar;