import api from "./api";
import type { ChatRequest, ChatResponse } from "../types/chat";

const CHAT_ENDPOINT = "/chat";

export const sendMessage = async (
  message: string,
  sessionId: string = "default_session"
): Promise<ChatResponse> => {
  const payload: ChatRequest = {
    message,
    session_id: sessionId,
  };

  const response = await api.post<ChatResponse>(`${CHAT_ENDPOINT}/`, payload);
  return response.data;
};

export const checkChatHealth = async (): Promise<{ status: string; service: string }> => {
  const response = await api.get(`${CHAT_ENDPOINT}/health`);
  return response.data;
};
