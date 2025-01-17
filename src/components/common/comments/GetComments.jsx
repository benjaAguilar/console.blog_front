export function GetComments({ comments }) {
  return (
    <>
      {comments ? (
        comments.map((comment, i) => {
          return (
            <div key={i}>
              <p>{comment.content}</p>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
