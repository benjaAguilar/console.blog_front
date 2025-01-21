import { useEffect, useState } from "react";
import { getAuthUser } from "../../utils/userApi";

export function LikeButton({ usersLikes, postId }) {
  const [likeAmount, setLikeAmount] = useState(usersLikes.length);
  const [fill, setFill] = useState("none");

  const server = import.meta.env.PUBLIC_SERVER;

  useEffect(() => {
    async function checkUserLike() {
      const user = await getAuthUser();

      const isLiked = usersLikes.filter(
        (userLike) => userLike.userId === user.id
      );

      if (isLiked.length) {
        return setFill("red");
      }
    }

    checkUserLike();
  }, []);

  async function likePost() {
    if (fill === "none") {
      setLikeAmount((prev) => prev + 1);
      setFill("red");
    } else {
      setLikeAmount((prev) => prev - 1);
      setFill("none");
    }

    const token = localStorage.getItem("token");

    fetch(`${server}/api/posts/${postId}/like`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
    });
  }

  return (
    <div className="flex items-center gap-1" role="button" onClick={likePost}>
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
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      <p>{likeAmount} likes</p>
    </div>
  );
}
