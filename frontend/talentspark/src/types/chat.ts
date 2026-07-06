export interface ChatMessage {
    id: number;
    sender: "user" | "bot";
    text: string;
    timestamp: Date;
}

export interface ChatRequest {
    message: string;
    session_id: string;
}

export interface ChatResponse {
    response: string;
}