import Chat from "../components/chat";

function ChatPage() {
    return (
        <div style={{ height: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
            <Chat />
        </div>
    );
}

export default ChatPage;
