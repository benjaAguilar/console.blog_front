import { useRef, useState, useEffect } from "react";
import { GetComments } from "./GetComments";
import { fetchData } from "../../../utils/utils";
import { feedbackMessage, hasMessage } from "../../../utils/context";

export function CommentSection({ postId }) {
  const [reRender, setReRender] = useState(0);
  const formRef = useRef();
  const inputRef = useRef();
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function getComments() {
      const data = await fetchData(`/api/posts/${postId}/comments`, "GET");

      if (!data.success) {
        console.log(data.message);

        feedbackMessage.set({
          success: data.success,
          message: data.message,
        });

        hasMessage.set(true);

        return;
      }

      setComments(data.comments);
    }

    setTimeout(getComments, 5000);
  }, [reRender]);

  async function fetchComment(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = new URLSearchParams(formData);

    const commented = await fetchData(
      `/api/posts/${postId}/comments`,
      "POST",
      { "Content-Type": "application/x-www-form-urlencoded" },
      data
    );

    feedbackMessage.set({
      success: commented.success,
      message: commented.message,
    });

    hasMessage.set(true);

    if (!commented.success) {
      return console.log(commented.message);
    }

    console.log(commented.message);

    inputRef.current.value = "";
    setReRender((prev) => prev + 1);
  }

  return (
    <>
      <form
        ref={formRef}
        className="grid grid-cols-[4fr_1fr] gap-4 items-center mt-4"
      >
        <input
          type="text"
          name="content"
          id="content"
          placeholder="Di algo!"
          ref={inputRef}
          className="bg-transparent border-2 border-[--col-black] rounded-md p-1 focus-visible:outline-none"
        />
        <input
          type="submit"
          value="Comentar"
          onClick={(e) => {
            fetchComment(e);
          }}
          className="bg-amber-500 p-1 text-[--col-black] border-amber-500 border-2 rounded"
        />
      </form>
      <GetComments comments={comments} setReRender={setReRender} />
    </>
  );
}
