import Chat from "../components/chat";

type Props = {
    open: boolean;
    onClose: () => void;
};

function ChatWindow({ open, onClose }: Props) {

    return (

        <div
            style={{
                position: "fixed",
                bottom: "95px",
                right: "20px",

                width: "380px",
                height: "600px",

                background: "#fff",

                borderRadius: "20px",

                boxShadow: "0 15px 40px rgba(0,0,0,.35)",

                overflow: "hidden",

                display: open ? "flex" : "none",

                flexDirection: "column",

                zIndex: 9999,
            }}
        >

            <div
                style={{
                    height: "60px",
                    background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",

                    color: "white",

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    padding: "0 20px",

                    fontWeight: "bold",

                    fontSize: "18px",
                }}
            >

                <span>🤖 TalentSpark AI</span>

                <button
                    onClick={onClose}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "white",
                        fontSize: "24px",
                        cursor: "pointer",
                    }}
                >
                    ✕

                </button>

            </div>

            <div
                style={{
                    flex: 1,
                    overflow: "hidden",
                }}
            >

                <Chat />

            </div>

        </div>

    );

}

export default ChatWindow;