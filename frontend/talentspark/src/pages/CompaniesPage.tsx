import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, X, Search, Building2 } from "lucide-react";
import {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany
} from "../Services/CompanyService";
import CompanyCard from "../components/CompanyCard";
import type { Company } from "../types/company";
import "../styles/forms.css";

function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);

    // Form fields state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        location: ""
    });

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        setLoading(true);
        try {
            const data = await getCompanies();
            setCompanies(data);
        } catch (error) {
            toast.error("Failed to load companies.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingCompany(null);
        setFormData({
            name: "",
            email: "",
            phone: "",
            location: ""
        });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (company: Company) => {
        setEditingCompany(company);
        setFormData({
            name: company.name || "",
            email: company.email || "",
            phone: company.phone || "",
            location: company.location || ""
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCompany(null);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
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
        if (!formData.name.trim()) {
            toast.warning("Company name is required.");
            return;
        }

        try {
            if (editingCompany) {
                // Update
                const updated = await updateCompany(editingCompany.id, {
                    ...editingCompany,
                    ...formData
                });
                setCompanies((prev) =>
                    prev.map((c) => (c.id === editingCompany.id ? updated : c))
                );
                toast.success("Company updated successfully!");
            } else {
                // Create
                const created = await createCompany({
                    id: 0, // Backend will auto-generate
                    ...formData,
                    jobs: []
                });
                setCompanies((prev) => [...prev, created]);
                toast.success("Company added successfully!");
            }
            handleCloseModal();
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this company?")) {
            return;
        }

        try {
            await deleteCompany(id);
            setCompanies((prev) => prev.filter((c) => c.id !== id));
            toast.success("Company deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete company.");
            console.error(error);
        }
    };

    // Filter companies based on search query
    const filteredCompanies = companies.filter((c) => {
        const query = searchQuery.toLowerCase();
        return (
            (c.name && c.name.toLowerCase().includes(query)) ||
            (c.location && c.location.toLowerCase().includes(query)) ||
            (c.email && c.email.toLowerCase().includes(query))
        );
    });

    return (
        <div style={{ padding: "20px" }}>
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />

            <div className="header-container">
                <div>
                    <h1 style={{ color: "white", fontSize: "2rem", fontWeight: 700, margin: 0 }}>
                        Company Profiles
                    </h1>
                    <p style={{ color: "var(--text-light)", marginTop: "4px" }}>
                        Manage corporate partner profiles and details
                    </p>
                </div>

                <button className="add-btn" onClick={handleOpenAddModal}>
                    <Plus size={18} />
                    Add Company
                </button>
            </div>

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
                    placeholder="Search by name, location or email..."
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
                    <h2>Loading Companies...</h2>
                </div>
            ) : filteredCompanies.length === 0 ? (
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
                    <Building2 size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
                    <h3>No companies found</h3>
                    <p>Try searching for a different keyword or create a new company profile.</p>
                </div>
            ) : (
                <CompanyCard
                    companies={filteredCompanies}
                    onedit={handleOpenEditModal}
                    ondelete={handleDelete}
                    onadd={handleOpenAddModal}
                />
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingCompany ? "Edit Company Profile" : "Add New Company"}</h2>
                            <button className="close-btn" onClick={handleCloseModal}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    placeholder="e.g. Google India"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="e.g. contact@company.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="phone">
                                    Contact Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    placeholder="e.g. +91 98765 43210"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    className="form-input"
                                    placeholder="e.g. Bangalore, India"
                                    value={formData.location}
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
                                    {editingCompany ? "Save Changes" : "Create Profile"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompaniesPage;
