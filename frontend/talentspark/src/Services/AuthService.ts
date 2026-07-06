import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from "../types/user";

import api from "./api";

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
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
        }
    );

    localStorage.setItem(
        "token",
        response.data.access_token
    );

    return response.data;
};

export const register = async (
    user: RegisterRequest
): Promise<RegisterResponse> => {

    const response = await api.post(
        "/auth/register",
        user
    );

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
};