import { useEffect, useRef, useState } from "react";
import { feedbackMessage, hasMessage } from "../../utils/context";
import { useStore } from "@nanostores/react";

export function FeedbackMessage() {
  const messageRef = useRef();
  const feedback = useStore(feedbackMessage);
  const showMessage = useStore(hasMessage);

  if (showMessage && messageRef.current) {
    messageRef.current.style.display = "flex";

    setTimeout(() => {
      if (messageRef.current) {
        messageRef.current.style.display = "none";
      }
    }, 5000);
  }

  function closeMessage() {
    if (messageRef.current) {
      messageRef.current.style.display = "none";
    }
  }

  return (
    <div
      ref={messageRef}
      style={{
        backgroundImage: "var(--noise)",
      }}
      className={`${
        feedback.success ? "bg-green-400" : "bg-red-400"
      } hidden gap-4 p-2 rounded-md fixed bottom-0 right-0 mb-4 mr-4 z-10`}
    >
      <div className="flex flex-col min-w-64">
        <button onClick={closeMessage} className="self-end">
          <img src="/icons/close.svg" alt="close icon" />
        </button>
        <p>{feedback.message}</p>
      </div>
    </div>
  );
}
