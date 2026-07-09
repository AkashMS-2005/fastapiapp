import { useEffect, useRef, useState } from "react";
import ChatService from "../Services/ChatService";import "../styles/chat.css";

interface Message {
    id: number;
    sender: "user" | "bot";
    text: string;
    time: string;
}

function Chat() {

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "bot",
            text:
                "👋 Hello! I'm Akash M S Spark.\n\nI can help you:\n\n• Find Jobs\n• Analyse Resume\n• Career Guidance\n• Interview Questions\n• AI Search",
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        },
    ]);

    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);

    const handleSend = async () => {

        if (!input.trim()) return;

        const question = input;

        const userMessage: Message = {

            id: Date.now(),

            sender: "user",

            text: question,

            time: new Date().toLocaleTimeString([], {

                hour: "2-digit",

                minute: "2-digit",

            }),

        };

        setMessages((prev) => [...prev, userMessage]);

        setInput("");

        setLoading(true);

        try {

            const reply = await ChatService.sendMessage(
                question,
                "default-session"
            );

            const botMessage: Message = {

                id: Date.now() + 1,

                sender: "bot",

                text: reply,

                time: new Date().toLocaleTimeString([], {

                    hour: "2-digit",

                    minute: "2-digit",

                }),

            };

            setMessages((prev) => [...prev, botMessage]);

        } catch (err) {

            console.error(err);

            setMessages((prev) => [

                ...prev,

                {

                    id: Date.now(),

                    sender: "bot",

                    text: "❌ Unable to contact AI.",

                    time: new Date().toLocaleTimeString([], {

                        hour: "2-digit",

                        minute: "2-digit",

                    }),

                },

            ]);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="chat-container">

            <div className="chat-header">

                <h3>🤖 Akash M S Spark</h3>

                <span>Online</span>

            </div>

            <div className="chat-body">

                {messages.map((msg) => (

                    <div
                        key={msg.id}
                        className={`message ${msg.sender}`}
                    >

                        <div className="bubble">

                            {msg.text
                                .split("\n")
                                .map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}

                            <small>{msg.time}</small>

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

            <div className="chat-footer">

                <input

                    value={input}

                    placeholder="Ask Akash M S Spark..."

                    onChange={(e) => setInput(e.target.value)}

                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSend();
                        }
                    }}

                />

                <button
                    onClick={handleSend}
                    disabled={loading}
                >

                    ➤

                </button>

            </div>

        </div>

    );

}

export default Chat;