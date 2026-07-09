type Props = {
    onClick: () => void;
};

function ChatButton({ onClick }: Props) {

    return (

        <button

            onClick={onClick}

            className="chat-floating-btn"

            title="Open Akash M S Spark"

        >

            <span className="chat-icon">

                🤖

            </span>

            <span className="chat-pulse"></span>

        </button>

    );

}

export default ChatButton;