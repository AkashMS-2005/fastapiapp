import {
    Bell,
    Search
} from "lucide-react";

import "../styles/topbar.css";

function Topbar(){

    return(

        <header className="topbar">

            <div className="search-box">

                <Search size={18}/>

                <input

                    placeholder="Search anything..."

                />

            </div>

            <div className="topbar-right">

                <button>

                    <Bell size={20}/>

                </button>

                <div className="profile">

                    <img

                        src="https://ui-avatars.com/api/?name=User"

                        alt="profile"

                    />

                    <div>

                        <strong>Welcome</strong>

                        <small>TalentSpark User</small>

                    </div>

                </div>

            </div>

        </header>

    )

}

export default Topbar;