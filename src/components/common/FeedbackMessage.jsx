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
      className={`${
        feedback.success ? "bg-green-500" : "bg-red-500"
      } hidden gap-4 p-2 rounded-md fixed bottom-0 right-0 mb-4 mr-4 z-10`}
    >
      <div className="flex flex-col min-w-80">
        <button onClick={closeMessage} className="self-end">
          close
        </button>
        <p>{feedback.message}</p>
      </div>
    </div>
  );
}
