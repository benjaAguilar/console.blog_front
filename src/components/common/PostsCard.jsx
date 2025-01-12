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
    <a
      href={`/posts/${id}`}
      className="flex flex-col gap-3 rounded-lg border-cyan-500 border-2 flex-grow bg-white basis-1/2 md:basis-1/3 lg:basis-1/4"
    >
      <div className="flex flex-col gap-2 overflow-hidden rounded-lg w-full">
        <img
          src={thumbnail}
          alt={`thumbnail image of ${title}`}
          className="w-full h-auto object-cover"
        />
        <p className="w-full px-2">{title}</p>
      </div>
      <div className="flex gap-3 w-full px-2">
        categories:
        {categories.map((category) => {
          return <p key={category.categoryId}>{category.categoryId}</p>;
        })}
      </div>
      <div className="flex gap-3 px-2">
        <p>{views}</p>
        <p>{likes}</p>
        <p>{comments}</p>
        <p>{readtime} mins</p>
      </div>
    </a>
  );
}

export default PostCard;
