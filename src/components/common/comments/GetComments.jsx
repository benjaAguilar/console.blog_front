import { useEffect, useState } from "react";
import { LikeCommentButton } from "./likeCommentBtn";
import { fetchData } from "../../../utils/utils";
import { feedbackMessage, hasMessage } from "../../../utils/context";

export function GetComments({ comments, setReRender }) {
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const user = await fetchData("/api/users/authUser", "GET");

      if (user.success) {
        setUserId(user.id);
        if (user.role === "ADMIN") {
          setIsAdmin(true);
        }
      }
    }

    checkUser();
  }, []);

  async function deleteComment(id) {
    const delComment = await fetchData(`/api/posts/comments/${id}`, "DELETE");

    feedbackMessage.set({
      success: delComment.success,
      message: delComment.message,
    });

    hasMessage.set(true);
    setReRender((prev) => prev + 1);
  }

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      {comments ? (
        comments.map((comment, i) => {
          const date = new Date(comment.createdAt).toDateString();

          return (
            <div key={i} className="w-full">
              <hr />
              <div className="grid grid-cols-[30px_4fr_1fr] items-center p-4 gap-x-1 gap-y-3">
                <img src="/icons/user.svg" alt="user icon" className="w-8" />
                <div className="row-start-2 row-span-2"></div>
                <p className="text-lg">{comment.owner.username}</p>
                <i className="justify-self-end">{date}</i>
                <p>{comment.content}</p>
                <div className="row-start-3 col-start-2">
                  <LikeCommentButton
                    usersLikes={comment.userLikes}
                    commentsId={comment.id}
                  />
                  {userId === comment.owner.id || isAdmin ? (
                    <button
                      className="bg-amber-500 p-1 text-[--col-black] border-amber-500 border-2 rounded"
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    >
                      delete
                    </button>
                  ) : null}
                </div>
              </div>
              <hr />
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
