import { useRef, useState, useEffect } from "react";
import { GetComments } from "./GetComments";

export function CommentSection({ postId }) {
  const [reRender, setReRender] = useState(0);
  const formRef = useRef();
  const inputRef = useRef();
  const [comments, setComments] = useState(null);

  useEffect(() => {
    function getComments() {
      fetch(`${server}/api/posts/${postId}/comments`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            return console.log(data.message);
          }

          setComments(data.comments);
        });
    }

    getComments();
  }, [reRender]);

  const server = import.meta.env.PUBLIC_SERVER;

  function fetchComment(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = new URLSearchParams(formData);

    const token = localStorage.getItem("token");

    fetch(`${server}/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.success) {
          return console.log(data.message);
        }

        console.log("commented!");
        inputRef.current.value = "";
        setReRender((prev) => prev + 1);
      });
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
