import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from "../types/user";

import api from "./api";
 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
/**
 * Login User
 */
export const login = async (
    credentials: LoginRequest
): Promise<LoginResponse> => {

    const formData = new URLSearchParams();

    formData.append("username", credentials.email);
    formData.append("password", credentials.password);

    const response = await api.post<LoginResponse>(
        "/auth/login",
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    // Save JWT Token
    localStorage.setItem("token", response.data.access_token);

    return response.data;
};

/**
 * Register User
 */
export const register = async (
    user: RegisterRequest
): Promise<RegisterResponse> => {

    const response = await api.post<RegisterResponse>(
        "/auth/register",
        user
    );

    return response.data;
};

/**
 * Logout User
 */
export const logout = (): void => {
    localStorage.removeItem("token");
};

/**
 * Check Authentication
 */
export const isAuthenticated = (): boolean => {
    return localStorage.getItem("token") !== null;
};

/**
 * Get Stored JWT Token
 */
export const getToken = (): string | null => {
    return localStorage.getItem("token");
};