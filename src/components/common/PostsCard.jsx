import { useEffect, useState } from "react";

function PostCard({
  id,
  title,
  thumbnail,
  views,
  readtime,
  categories,
  comments,
  likes,
}) {
  return (
    <div>
      <img src={thumbnail} alt={`thumbnail image of ${title}`} />
      <p>{title}</p>
      <div>
        <p>views: {views}</p>
        <p>likes: {likes}</p>
        <p>comments: {comments}</p>
        <p>readtime: {readtime} mins</p>
      </div>
      <div>
        categories:
        {categories.map((category) => {
          return <p key={category.categoryId}>{category.categoryId}</p>;
        })}
      </div>
    </div>
  );
}

export default PostCard;
