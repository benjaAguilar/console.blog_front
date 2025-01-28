import { LikeCommentButton } from "./likeCommentBtn";

export function GetComments({ comments }) {
  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      {comments ? (
        comments.map((comment, i) => {
          const date = new Date(comment.createdAt).toDateString();

          return (
            <div key={i} className="w-full">
              <hr />
              <div className="p-4">
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-1">
                    <img
                      src="/icons/user.svg"
                      alt="user icon"
                      className="w-7"
                    />
                    <p>{comment.owner.username}</p>
                  </div>
                  <i>{date}</i>
                </div>
                <p>{comment.content}</p>
                <LikeCommentButton
                  usersLikes={comment.userLikes}
                  commentsId={comment.id}
                />
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
