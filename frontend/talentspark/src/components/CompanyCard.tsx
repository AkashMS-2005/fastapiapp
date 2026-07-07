import { useState } from "react";
import "../styles/cards.css";
import type { Company } from "../types/company";

type Props = {

    companies: Company[];

    onedit: (company: Company) => void;

    ondelete: (id: number) => void;

    onadd: (company: Company) => void;

};

function CompanyCard({

    companies,

    onedit,

    ondelete,

}: Props) {

    return (

        <section className="cards-section">

            <h1 className="cards-title">

                Our Companies

            </h1>

            <p className="cards-subtitle">

                Discover top companies hiring talented professionals

            </p>

            <div className="cards-grid">

                {

                    companies.map((company) => (

                        <div

                            className="company-card"

                            key={company.id}

                        >

                            <div className="company-header">

                                <div className="company-logo">

                                    🏢

                                </div>

                                <div>

                                    <div className="company-name">

                                        {company.name}

                                    </div>

                                    <div className="company-industry">

                                        Technology Company

                                    </div>

                                </div>

                            </div>

                            <div className="company-info">

                                <p>

                                    📍 Bangalore, India

                                </p>

                                <p>

                                    🌐 Premium Hiring Partner

                                </p>

                                <span className="badge">

                                    Active

                                </span>

                            </div>

                            <div className="company-actions">

                                <button

                                    className="btn-edit"

                                    onClick={() =>
                                        onedit(company)
                                    }

                                >

                                    Edit

                                </button>

                                <button

                                    className="btn-delete"

                                    onClick={() =>
                                        ondelete(company.id)
                                    }

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default CompanyCard;