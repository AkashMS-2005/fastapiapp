import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../Services/ChatService";
import type { ChatMessage } from "../types/chat";
import "./chat.css";

const STORAGE_KEY = "talentspark_chat_history";

function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [sessionId] = useState(() => {
        let id = localStorage.getItem("chat_session");

        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("chat_session", id);
        }

        return id;
    });

    // Load history only once
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const history: ChatMessage[] = JSON.parse(saved).map((m: any) => ({
                ...m,
                timestamp: new Date(m.timestamp),
            }));

            setMessages(history);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    // Helper function that updates BOTH state and localStorage
    const updateHistory = (newMessages: ChatMessage[]) => {
        setMessages(newMessages);
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(newMessages)
        );
    };

    const handleSendMessage = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!input.trim() || loading) return;

        const text = input;

        setInput("");

        const userMessage: ChatMessage = {
            id: Date.now(),
            sender: "user",
            text,
            timestamp: new Date(),
        };

        const userHistory = [...messages, userMessage];
        updateHistory(userHistory);

        setLoading(true);

        try {
            const reply = await sendMessage(
                text,
                sessionId
            );

            const botMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: "bot",
                text: reply,
                timestamp: new Date(),
            };

            updateHistory([
                ...userHistory,
                botMessage,
            ]);
        } catch {
            const errorMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: "bot",
                text: "❌ Unable to contact AI server.",
                timestamp: new Date(),
            };

            updateHistory([
                ...userHistory,
                errorMessage,
            ]);
        } finally {
            setLoading(false);
        }
    };

    const clearHistory = () => {
        localStorage.removeItem(STORAGE_KEY);
        setMessages([]);
    };

    return (
        <div className="chat-container">

            <div className="chat-messages">

                {messages.length === 0 && (
                    <div className="welcome">
                        <h3>Hello Dosthh 👋</h3>

                        <p>I'm your AI Career Assistant.</p>

                        <p>
                            Ask me about jobs,
                            companies,
                            coding,
                            interviews,
                            placements,
                            AI,
                            and career guidance.
                        </p>
                    </div>
                )}

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message ${msg.sender}`}
                    >
                        <div className="bubble">
                            {msg.text}

                            <div className="time">
                                {msg.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="message bot">
                        <div className="bubble">
                            <div className="typing">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef}></div>

            </div>

            <form
                onSubmit={handleSendMessage}
                className="chat-input-area"
            >
                <input
                    value={input}
                    onChange={(e) =>
                        setInput(e.target.value)
                    }
                    placeholder="Ask TalentSpark AI..."
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    ➤
                </button>
            </form>

        </div>
    );
}

export default Chat;