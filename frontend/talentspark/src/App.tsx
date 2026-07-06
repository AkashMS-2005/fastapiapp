import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import CompanyCard from "./components/CompanyCard";
import JobCard from "./components/JobCard";
import Footer from "./components/Footer";
import ChatButton from "./components/ChatButton";
import ChatWindow from "./components/ChatWindow";

import Login from "./pages/Login";
import Register from "./pages/Register";

import {
    getCompanies,
    updateCompany,
    deleteCompany,
    createCompany,
} from "./Services/CompanyService";

import {
    isAuthenticated,
    logout,
} from "./Services/AuthService";

import type { Company } from "./types/company";

function App() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [companies, setCompanies] = useState<Company[]>([]);

    const [authenticated, setAuthenticated] = useState(
        isAuthenticated()
    );

    const [currentPage, setCurrentPage] = useState<
        "login" | "register" | "dashboard"
    >("login");

    // Chat popup state
    const [chatOpen, setChatOpen] = useState(false);

    const fetchCompanies = async () => {

        setLoading(true);

        try {

            const data = await getCompanies();

            setCompanies(data);

        } catch (err) {

            setError(err as Error);

        } finally {

            setLoading(false);

        }
    };

    const handleEdit = async (company: Company) => {

        try {

            const updatedCompany = await updateCompany(
                company.id,
                company
            );

            setCompanies((prev) =>
                prev.map((c) =>
                    c.id === updatedCompany.id ? updatedCompany : c
                )
            );

        } catch (err) {

            setError(err as Error);

        }
    };

    const handleDelete = async (id: number) => {

        try {

            await deleteCompany(id);

            setCompanies((prev) =>
                prev.filter((company) => company.id !== id)
            );

        } catch (err) {

            setError(err as Error);

        }
    };

    const handleAdd = async (company: Company) => {

        try {

            const newCompany = await createCompany(company);

            setCompanies((prev) => [
                ...prev,
                newCompany,
            ]);

        } catch (err) {

            setError(err as Error);

        }
    };

    const handleLogin = () => {

        setAuthenticated(true);

        setCurrentPage("dashboard");

        fetchCompanies();
    };

    const handleLogout = () => {

        logout();

        setAuthenticated(false);

        setCurrentPage("login");

        setCompanies([]);
    };

    useEffect(() => {

        if (isAuthenticated()) {

            setAuthenticated(true);

            setCurrentPage("dashboard");

            fetchCompanies();

        } else {

            setLoading(false);

        }

    }, []);

    if (!authenticated) {

        if (currentPage === "login") {

            return (
                <Login
                    onLogin={handleLogin}
                    onSwitchToRegister={() =>
                        setCurrentPage("register")
                    }
                />
            );
        }

        return (
            <Register
                onRegister={() =>
                    setCurrentPage("login")
                }
                onSwitchToLogin={() =>
                    setCurrentPage("login")
                }
            />
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <NavBar onLogout={handleLogout} />

            <br />

            <CompanyCard
                companies={companies}
                onedit={handleEdit}
                ondelete={handleDelete}
                onadd={handleAdd}
            />

            <JobCard />

            <Footer />

            {/* Chat Window */}
            <ChatWindow
                open={chatOpen}
                onClose={() => setChatOpen(false)}
            />

            {/* Floating Button */}
            <ChatButton
                onClick={() => setChatOpen(true)}
            />
        </>
    );
}

export default App;