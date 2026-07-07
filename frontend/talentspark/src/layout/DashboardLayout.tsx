import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/layout.css";

type Props = {
    children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {

    return (

        <div className="dashboard">

            <Sidebar />

            <main className="dashboard-main">

                <Topbar />

                <div className="dashboard-content">

                    {children}

                </div>

            </main>

        </div>

    );

}

export default DashboardLayout;