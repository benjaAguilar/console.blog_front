import { useRef, useState, useEffect } from "react";
import { GetComments } from "./GetComments";
import { createComment, getPostComments } from "../../../utils/commentsApi";
import { fetchData } from "../../../utils/utils";

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
        return;
      }

      setComments(data.comments);
    }

    getComments();
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

    if (!commented.success) {
      return console.log(commented.message);
    }

    console.log(commented.message);

    inputRef.current.value = "";
    setReRender((prev) => prev + 1);
  }

  return (
    <>
      <form ref={formRef}>
        <input
          type="text"
          name="content"
          id="content"
          placeholder="Di algo!"
          ref={inputRef}
        />
        <input
          type="submit"
          value="Comentar"
          onClick={(e) => {
            fetchComment(e);
          }}
        />
      </form>
      <GetComments comments={comments} />
    </>
  );
}
