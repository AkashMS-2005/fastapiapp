import { Link } from "react-router-dom";
import "../styles/navbar.css";

function NavBar() {

    return (

        <nav className="navbar">

            <div className="navbar-left">

                <div className="logo">

                    🚀

                </div>

                <div className="logo-info">

                    <h2>Akash M S Spark</h2>

                    <span>AI Powered Career Platform</span>

                </div>

            </div>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/companies">Companies</Link>

                <Link to="/jobs">Jobs</Link>

                <Link to="/resume">Resume AI</Link>

                <Link to="/chat">AI Chat</Link>

            </div>

            <div className="nav-right">

                <button className="login-btn">

                    Login

                </button>

                <button className="signup-btn">

                    Get Started

                </button>

            </div>

        </nav>

    );

}

export default NavBar;