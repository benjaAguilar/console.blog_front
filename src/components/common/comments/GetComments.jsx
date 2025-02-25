import { useEffect, useState } from "react";
import { LikeCommentButton } from "./likeCommentBtn";
import { fetchData } from "../../../utils/utils";
import { feedbackMessage, hasMessage } from "../../../utils/context";
import { CommentsLoading } from "../loading/CommentsLoading";

export function GetComments({ comments, setReRender }) {
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dateLang, setDateLang] = useState("en-EN");

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname.includes("/es")) {
      setDateLang("es-ES");
    }

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
          const date = new Date(comment.createdAt).toLocaleDateString(
            dateLang,
            {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          );

          return (
            <div key={i} className="w-full">
              <hr />
              <div className="grid grid-cols-[30px_4fr_1fr] items-center p-4 gap-x-1 gap-y-3">
                <img src="/icons/user.svg" alt="user icon" className="w-8" />
                <div className="row-start-2 row-span-2"></div>
                <p className="text-lg">{comment.owner.username}</p>
                <div className="justify-self-end flex items-center gap-4">
                  <i className="text-xs md:text-base">{date}</i>
                  {userId === comment.owner.id || isAdmin ? (
                    <button
                      className="flex items-center gap-1 bg-amber-500 p-1 text-[--col-black] border-amber-500 border-2 rounded"
                      onClick={() => {
                        deleteComment(comment.id);
                      }}
                    >
                      <img
                        src="/icons/delete.svg"
                        alt="delete icon"
                        className="w-5"
                      />
                    </button>
                  ) : null}
                </div>
                <p>{comment.content}</p>
                <div className="row-start-3 col-start-2 flex items-center gap-4">
                  <LikeCommentButton
                    usersLikes={comment.userLikes}
                    commentsId={comment.id}
                  />
                </div>
              </div>
              <hr />
            </div>
          );
        })
      ) : (
        <CommentsLoading />
      )}
    </div>
  );
}
