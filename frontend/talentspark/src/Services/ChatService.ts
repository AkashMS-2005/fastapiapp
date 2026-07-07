import api from "./api";

import type {
    ChatRequest,
    ChatResponse,
} from "../types/chat";

class ChatService {

    async sendMessage(
        message: string,
        sessionId: string
    ): Promise<string> {

        const body: ChatRequest = {
            message,
            session_id: sessionId,
        };

        const response = await api.post<ChatResponse>(
            "/chat/",
            body
        );

        return response.data.response;
    }

}

export default new ChatService();