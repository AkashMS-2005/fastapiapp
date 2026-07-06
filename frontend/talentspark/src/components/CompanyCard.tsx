import { useState } from "react";
import type { Company } from "../types/company";

type Props = {
    companies: Company[];
    onedit: (company: Company) => void;
    ondelete: (id: number) => void;
    onadd: (company: Company) => void;
};

function CompanyCard({
    companies,
    onadd,
    onedit,
    ondelete,
}: Props) {

    const emptyCompany: Company = {
        id: 0,
        name: "",
        email: "",
        phone: "",
        location: "",
        jobs: [],
    };

    const [editCompanyId, setEditCompanyId] =
        useState<number | null>(null);

    const [editForm, setEditForm] =
        useState<Company>(emptyCompany);

    const [addForm, setAddForm] =
        useState<Company>(emptyCompany);

    // -----------------------------
    // Add Company
    // -----------------------------

    const handleAdd = () => {

        onadd(addForm);

        setAddForm(emptyCompany);
    };

    // -----------------------------
    // Edit Company
    // -----------------------------

    const handleEdit = (company: Company) => {

        setEditCompanyId(company.id);

        setEditForm({
            ...company,
        });
    };

    // -----------------------------
    // Save Company
    // -----------------------------

    const handleSave = () => {

        onedit(editForm);

        setEditCompanyId(null);

        setEditForm(emptyCompany);
    };

    // -----------------------------
    // Cancel
    // -----------------------------

    const handleCancel = () => {

        setEditCompanyId(null);

        setEditForm(emptyCompany);
    };

    return (
        <div>

            {companies.map((company) => (

                <div key={company.id}>

                    {editCompanyId === company.id ? (

                        <>
                            <input
                                value={editForm.name}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        name: e.target.value,
                                    })
                                }
                            />

                            <input
                                value={editForm.email}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        email: e.target.value,
                                    })
                                }
                            />

                            <input
                                value={editForm.phone}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        phone: e.target.value,
                                    })
                                }
                            />

                            <input
                                value={editForm.location}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        location: e.target.value,
                                    })
                                }
                            />

                            <button onClick={handleSave}>
                                Save
                            </button>

                            <button onClick={handleCancel}>
                                Cancel
                            </button>

                        </>

                    ) : (

                        <>

                            <h2>{company.name}</h2>

                            <p>Email : {company.email}</p>

                            <p>Phone : {company.phone}</p>

                            <p>Location : {company.location}</p>

                            <button
                                onClick={() =>
                                    handleEdit(company)
                                }
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    ondelete(company.id)
                                }
                            >
                                Delete
                            </button>

                        </>

                    )}

                    <hr />

                </div>

            ))}

            <h2>Add Company</h2>

            <input
                value={addForm.name}
                placeholder="Company Name"
                onChange={(e) =>
                    setAddForm({
                        ...addForm,
                        name: e.target.value,
                    })
                }
            />

            <input
                value={addForm.email}
                placeholder="Email"
                onChange={(e) =>
                    setAddForm({
                        ...addForm,
                        email: e.target.value,
                    })
                }
            />

            <input
                value={addForm.phone}
                placeholder="Phone"
                onChange={(e) =>
                    setAddForm({
                        ...addForm,
                        phone: e.target.value,
                    })
                }
            />

            <input
                value={addForm.location}
                placeholder="Location"
                onChange={(e) =>
                    setAddForm({
                        ...addForm,
                        location: e.target.value,
                    })
                }
            />

            <button onClick={handleAdd}>
                Add Company
            </button>

        </div>
    );
}

export default CompanyCard;