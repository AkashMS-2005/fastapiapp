type Props = {
    onClick: () => void;
};

function ChatButton({ onClick }: Props) {

    return (

        <button

            onClick={onClick}

            className="chat-floating-btn"

            title="Open TalentSpark AI"

        >

            <span className="chat-icon">

                🤖

            </span>

            <span className="chat-pulse"></span>

        </button>

    );

}

export default ChatButton;