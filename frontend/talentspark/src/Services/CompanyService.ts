import api from "./api";
import type { Company } from "../types/company";

/**
 * Get all companies
 */
export const getCompanies = async (): Promise<Company[]> => {
    try {
        const response = await api.get<Company[]>("/company/");
        return response.data;
    } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
    }
};

/**
 * Get company by ID
 */
export const getCompany = async (id: number): Promise<Company> => {
    try {
        const response = await api.get<Company>(`/company/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching company:", error);
        throw error;
    }
};

/**
 * Create new company
 */
export const createCompany = async (
    company: Company
): Promise<Company> => {
    try {
        const response = await api.post<Company>("/company/", company);
        return response.data;
    } catch (error) {
        console.error("Error creating company:", error);
        throw error;
    }
};

/**
 * Update company
 */
export const updateCompany = async (
    id: number,
    company: Company
): Promise<Company> => {
    try {
        const response = await api.put<Company>(
            `/company/${id}`,
            company
        );

        return response.data;
    } catch (error) {
        console.error("Error updating company:", error);
        throw error;
    }
};

/**
 * Delete company
 */
export const deleteCompany = async (
    id: number
): Promise<void> => {
    try {
        await api.delete(`/company/${id}`);
    } catch (error) {
        console.error("Error deleting company:", error);
        throw error;
    }
};