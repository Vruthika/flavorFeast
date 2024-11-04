import React, { useState } from "react";
import "./feedback.css";

function Feedback() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleSendClick = () => {
    if (selectedEmoji) {
      setConfirmationMessage(`Thank you for your feedback: ${selectedEmoji}`);
      setIsSent(true);

      setTimeout(() => {
        setIsSent(false);
        setConfirmationMessage("");
        setSelectedEmoji(null);
      }, 3000);
    } else {
      setConfirmationMessage("Please select an emoji!");
      setTimeout(() => {
        setConfirmationMessage("");
      }, 2000);
    }
  };

  return (
    <div className="outer">
      <div className="card">
        <h1>Feedback Form</h1>
        <p>Please provide your feedback</p>
        <div className="emoji-container">
          {["😞", "😐", "🙂", "😊", "😁"].map((emoji, index) => (
            <button
              key={index}
              className={`emoji-button ${
                selectedEmoji === emoji ? "selected" : ""
              }`}
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
        <button
          className="review-button"
          onClick={handleSendClick}
          disabled={isSent}
        >
          {isSent ? "Sent!" : "Send"}
        </button>
        {confirmationMessage && (
          <p
            id="confirmationMessage"
            style={{ color: selectedEmoji ? "green" : "red" }}
          >
            {confirmationMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default Feedback;
