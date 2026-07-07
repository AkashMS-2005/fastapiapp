import { useState } from "react";
import JobMatch from "../components/JobMatch";
import SemanticSearch from "../components/SemanticSearch";

function JobMatchingPage() {
    const [activeTab, setActiveTab] = useState<"skills" | "semantic">("skills");

    return (
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            <div className="tab-container" style={styles.tabContainer}>
                <button
                    onClick={() => setActiveTab("skills")}
                    style={{
                        ...styles.tabButton,
                        ...(activeTab === "skills" ? styles.activeTabButton : {}),
                    }}
                >
                    🎯 Skills Matcher
                </button>
                <button
                    onClick={() => setActiveTab("semantic")}
                    style={{
                        ...styles.tabButton,
                        ...(activeTab === "semantic" ? styles.activeTabButton : {}),
                    }}
                >
                    🔍 Semantic Job Search
                </button>
            </div>

            <div className="tab-content" style={styles.tabContent}>
                {activeTab === "skills" ? <JobMatch /> : <SemanticSearch />}
            </div>
        </div>
    );
}

const styles = {
    tabContainer: {
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        paddingBottom: "10px",
        justifyContent: "center",
    },
    tabButton: {
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: 600,
        background: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "#cbd5e1",
        borderRadius: "30px",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
    activeTabButton: {
        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
        color: "#ffffff",
        borderColor: "transparent",
        boxShadow: "0 8px 20px rgba(37, 99, 235, 0.3)",
    },
    tabContent: {
        animation: "tabFadeIn 0.4s ease-out",
    },
};

export default JobMatchingPage;
