import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, X, Search, Briefcase } from "lucide-react";
import JobService from "../Services/JobService";
import { getCompanies } from "../Services/CompanyService";
import type { Job } from "../types/job";
import type { Company } from "../types/company";
import "../styles/forms.css";

function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    // Form fields state
    const [formData, setFormData] = useState({
        title: "",
        salary: "",
        description: "",
        company_id: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [jobsData, companiesData] = await Promise.all([
                JobService.getJobs(),
                getCompanies()
            ]);
            setJobs(jobsData);
            setCompanies(companiesData);
        } catch (error) {
            toast.error("Failed to load data.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingJob(null);
        setFormData({
            title: "",
            salary: "",
            description: "",
            company_id: companies.length > 0 ? companies[0].id.toString() : ""
        });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (job: Job) => {
        setEditingJob(job);
        setFormData({
            title: job.title || "",
            salary: job.salary ? job.salary.toString() : "",
            description: job.description || "",
            company_id: job.company_id ? job.company_id.toString() : ""
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingJob(null);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        if (!formData.title.trim()) {
            toast.warning("Job title is required.");
            return;
        }
        if (!formData.company_id) {
            toast.warning("Please select a company. You may need to create a company first.");
            return;
        }

        const jobPayload: Job = {
            id: editingJob ? editingJob.id : 0,
            title: formData.title,
            salary: Number(formData.salary) || 0,
            description: formData.description,
            company_id: Number(formData.company_id)
        };

        try {
            if (editingJob) {
                // Update
                const updated = await JobService.updateJob(editingJob.id, jobPayload);
                setJobs((prev) =>
                    prev.map((j) => (j.id === editingJob.id ? updated : j))
                );
                toast.success("Job updated successfully!");
            } else {
                // Create
                const created = await JobService.createJob(jobPayload);
                setJobs((prev) => [...prev, created]);
                toast.success("Job listing created successfully!");
            }
            handleCloseModal();
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this job listing?")) {
            return;
        }

        try {
            await JobService.deleteJob(id);
            setJobs((prev) => prev.filter((j) => j.id !== id));
            toast.success("Job listing deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete job listing.");
            console.error(error);
        }
    };

    // Helper to get company name from company_id
    const getCompanyName = (companyId: number) => {
        const company = companies.find((c) => c.id === companyId);
        return company ? company.name : "Unknown Company";
    };

    // Filter jobs based on search query
    const filteredJobs = jobs.filter((j) => {
        const query = searchQuery.toLowerCase();
        const compName = getCompanyName(j.company_id || 0).toLowerCase();
        return (
            (j.title && j.title.toLowerCase().includes(query)) ||
            (j.description && j.description.toLowerCase().includes(query)) ||
            compName.includes(query)
        );
    });

    return (
        <div style={{ padding: "20px" }}>
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />

            <div className="header-container">
                <div>
                    <h1 style={{ color: "white", fontSize: "2rem", fontWeight: 700, margin: 0 }}>
                        Job Opportunities
                    </h1>
                    <p style={{ color: "var(--text-light)", marginTop: "4px" }}>
                        Manage corporate job listings, description texts, and packages
                    </p>
                </div>

                <button
                    className="add-btn"
                    onClick={handleOpenAddModal}
                    disabled={companies.length === 0}
                    style={{
                        opacity: companies.length === 0 ? 0.6 : 1,
                        cursor: companies.length === 0 ? "not-allowed" : "pointer"
                    }}
                >
                    <Plus size={18} />
                    Add Job
                </button>
            </div>

            {companies.length === 0 && !loading && (
                <div
                    style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "12px",
                        padding: "12px 20px",
                        color: "#fca5a5",
                        marginBottom: "20px",
                        fontSize: "0.9rem"
                    }}
                >
                    ⚠️ You must create at least one <strong>Company Profile</strong> before creating a Job Listing.
                </div>
            )}

            {/* Search filter bar */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "14px",
                    padding: "8px 16px",
                    marginBottom: "30px",
                    maxWidth: "400px"
                }}
            >
                <Search size={18} color="var(--text-light)" style={{ marginRight: "10px" }} />
                <input
                    type="text"
                    placeholder="Search jobs by title, company or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "white",
                        outline: "none",
                        width: "100%",
                        fontSize: "0.95rem"
                    }}
                />
            </div>

            {loading ? (
                <div style={{ textAlign: "center", color: "white", padding: "40px 0" }}>
                    <h2>Loading Jobs...</h2>
                </div>
            ) : filteredJobs.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "20px",
                        padding: "60px 20px",
                        color: "var(--text-light)"
                    }}
                >
                    <Briefcase size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
                    <h3>No job listings found</h3>
                    <p>Try searching for a different term or post a new job opening.</p>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                        gap: "24px"
                    }}
                >
                    {filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="job-card"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                background: "rgba(255, 255, 255, 0.05)",
                                backdropFilter: "blur(18px)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "24px",
                                padding: "28px",
                                transition: "all 0.3s ease"
                            }}
                        >
                            <div>
                                <div className="job-header" style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                                    <div
                                        className="job-logo"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "14px",
                                            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "24px",
                                            color: "white"
                                        }}
                                    >
                                        💼
                                    </div>
                                    <div>
                                        <h3 style={{ color: "white", margin: 0, fontSize: "1.15rem", fontWeight: 600 }}>{job.title}</h3>
                                        <span style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
                                            {getCompanyName(job.company_id || 0)}
                                        </span>
                                    </div>
                                </div>

                                <div className="job-badges" style={{ display: "flex", gap: "10px", margin: "16px 0" }}>
                                    <span style={{ background: "rgba(79, 124, 255, 0.15)", color: "#a5b4fc", padding: "4px 10px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 500 }}>
                                        Full Time
                                    </span>
                                    <span style={{ background: "rgba(34, 197, 94, 0.15)", color: "#86efac", padding: "4px 10px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 500 }}>
                                        Remote
                                    </span>
                                </div>

                                <p
                                    className="job-description"
                                    style={{
                                        color: "#cbd5e1",
                                        lineHeight: 1.6,
                                        fontSize: "0.9rem",
                                        marginBottom: "20px",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        height: "4.8em"
                                    }}
                                >
                                    {job.description}
                                </p>
                            </div>

                            <div
                                className="job-footer"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                                    paddingTop: "16px",
                                    marginTop: "8px"
                                }}
                            >
                                <div>
                                    <h4 style={{ color: "white", fontSize: "1.2rem", margin: 0 }}>₹ {job.salary.toLocaleString("en-IN")}</h4>
                                    <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>Annual Salary</span>
                                </div>

                                <div style={{ display: "flex", gap: "8px" }}>
                                    <button
                                        onClick={() => handleOpenEditModal(job)}
                                        style={{
                                            background: "rgba(255, 255, 255, 0.08)",
                                            color: "white",
                                            border: "none",
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            fontWeight: 500,
                                            fontSize: "0.85rem"
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(job.id)}
                                        style={{
                                            background: "rgba(239, 68, 68, 0.15)",
                                            color: "#fca5a5",
                                            border: "none",
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            fontWeight: 500,
                                            fontSize: "0.85rem"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingJob ? "Edit Job Listing" : "Post New Job"}</h2>
                            <button className="close-btn" onClick={handleCloseModal}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="title">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-input"
                                    placeholder="e.g. Software Engineer (L3)"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="company_id">
                                    Hiring Company
                                </label>
                                <select
                                    id="company_id"
                                    name="company_id"
                                    className="form-select"
                                    value={formData.company_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" disabled>Select Company</option>
                                    {companies.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name} ({c.location})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="salary">
                                    Salary (Annual INR)
                                </label>
                                <input
                                    type="number"
                                    id="salary"
                                    name="salary"
                                    className="form-input"
                                    placeholder="e.g. 1200000"
                                    value={formData.salary}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="description">
                                    Job Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-textarea"
                                    placeholder="Outline the responsibilities, requirements, and tech stack..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    {editingJob ? "Save Changes" : "Post Job"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobsPage;
