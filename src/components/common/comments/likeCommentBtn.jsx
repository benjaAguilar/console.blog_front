import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/utils";
import { feedbackMessage, hasMessage } from "../../../utils/context";

export function LikeCommentButton({ usersLikes, commentsId }) {
  const [likeAmount, setLikeAmount] = useState(usersLikes.length);
  const [fill, setFill] = useState("none");

  useEffect(() => {
    async function checkUserLike() {
      const user = await fetchData("/api/users/authUser", "GET");

      const isLiked = usersLikes.filter(
        (userLike) => userLike.userId === user.id
      );

      if (isLiked.length) {
        return setFill("red");
      }
    }

    checkUserLike();
  }, []);

  async function likeComment() {
    let state;
    if (fill === "none") {
      setLikeAmount((prev) => prev + 1);
      setFill("red");
      state = "red";
    } else {
      setLikeAmount((prev) => prev - 1);
      setFill("none");
      state = "none";
    }

    const like = await fetchData(
      `/api/posts/comments/${commentsId}/like`,
      "PUT"
    );

    feedbackMessage.set({
      success: like.success,
      message: like.message,
    });

    hasMessage.set(true);

    if (!like.success) {
      console.log(like.message);

      if (state === "none") {
        setLikeAmount((prev) => prev + 1);
        setFill("red");
      } else {
        setLikeAmount((prev) => prev - 1);
        setFill("none");
      }
    }
  }

  return (
    <div
      className="flex items-center gap-1"
      role="button"
      onClick={likeComment}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        color="#000000"
        fill={fill}
      >
        <path
          d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <p>
        {likeAmount} {likeAmount === 1 ? "like" : "likes"}
      </p>
    </div>
  );
}
