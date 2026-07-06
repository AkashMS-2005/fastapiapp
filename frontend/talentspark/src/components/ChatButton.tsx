type Props = {
    onClick: () => void;
};

function ChatButton({ onClick }: Props) {

    return (

        <button
            onClick={onClick}
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                width: "65px",
                height: "65px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: "#2563eb",
                color: "white",
                fontSize: "30px",
                boxShadow: "0 0 15px rgba(0,0,0,.3)",
                zIndex: 999,
            }}
        >
            💬
        </button>

    );
}

export default ChatButton;
