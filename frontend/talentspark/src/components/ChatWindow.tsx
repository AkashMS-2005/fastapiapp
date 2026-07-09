import { useEffect } from "react";
import Chat from "./chat";

type Props = {
    open: boolean;
    onClose: () => void;
};

function ChatWindow({ open, onClose }: Props) {

    useEffect(() => {

        const handleEsc = (e: KeyboardEvent) => {

            if (e.key === "Escape") {

                onClose();

            }

        };

        window.addEventListener("keydown", handleEsc);

        return () => {

            window.removeEventListener("keydown", handleEsc);

        };

    }, [onClose]);

    if (!open) return null;

    return (

        <>

            {/* Background Blur */}

            <div

                onClick={onClose}

                style={{

                    position: "fixed",

                    inset: 0,

                    background: "rgba(0,0,0,.45)",

                    backdropFilter: "blur(6px)",

                    zIndex: 9998,

                }}

            />

            {/* Chat Window */}

            <div

                style={{

                    position: "fixed",

                    right: "35px",

                    bottom: "95px",

                    width: "420px",

                    height: "720px",

                    background: "#0f172a",

                    borderRadius: "28px",

                    overflow: "hidden",

                    border: "1px solid rgba(255,255,255,.08)",

                    boxShadow:
                        "0 30px 70px rgba(0,0,0,.45)",

                    display: "flex",

                    flexDirection: "column",

                    animation: "popup .35s ease",

                    zIndex: 9999,

                }}

            >

                {/* Header */}

                <div

                    style={{

                        height: "75px",

                        display: "flex",

                        justifyContent: "space-between",

                        alignItems: "center",

                        padding: "0 22px",

                        background:
                            "linear-gradient(135deg,#2563eb,#7c3aed)",

                        color: "white",

                    }}

                >

                    <div>

                        <div

                            style={{

                                fontSize: "19px",

                                fontWeight: 700,

                            }}

                        >

                            🤖 Akash M S Spark

                        </div>

                        <div

                            style={{

                                fontSize: "12px",

                                opacity: .8,

                            }}

                        >

                            AI Career Assistant

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        style={{

                            width: "40px",

                            height: "40px",

                            borderRadius: "50%",

                            border: "none",

                            background:
                                "rgba(255,255,255,.18)",

                            color: "white",

                            fontSize: "18px",

                            cursor: "pointer",

                            transition: ".3s",

                        }}

                    >

                        ✕

                    </button>

                </div>

                {/* Chat */}

                <div

                    style={{

                        flex: 1,

                        overflow: "hidden",

                    }}

                >

                    <Chat />

                </div>

            </div>

        </>

    );

}

export default ChatWindow;