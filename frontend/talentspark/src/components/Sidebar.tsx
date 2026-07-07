import {
    Home,
    Briefcase,
    Building2,
    FileText,
    Search,
    Bot,
    User
} from "lucide-react";

import "../styles/sidebar.css";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div className="logo">

                🚀 TalentSpark

            </div>

            <nav>

                <a href="#">

                    <Home size={20}/>

                    Dashboard

                </a>

                <a href="#">

                    <Building2 size={20}/>

                    Companies

                </a>

                <a href="#">

                    <Briefcase size={20}/>

                    Jobs

                </a>

                <a href="#">

                    <Search size={20}/>

                    AI Search

                </a>

                <a href="#">

                    <Bot size={20}/>

                    AI Assistant

                </a>

                <a href="#">

                    <FileText size={20}/>

                    Resume AI

                </a>

                <a href="#">

                    <User size={20}/>

                    Profile

                </a>

            </nav>

        </aside>

    );

}

export default Sidebar;