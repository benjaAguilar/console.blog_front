import { Stats } from "./Stats";

function PostCard({
  id,
  title,
  slug,
  thumbnail,
  views,
  readtime,
  categories,
  comments,
  likes,
}) {
  return (
    <a
      href={`/posts/${slug}`}
      className="flex flex-col gap-3 rounded-lg bg-amber-500 bg-opacity-30 flex-grow basis-1/2 md:basis-1/3 lg:basis-1/4"
    >
      <div className="flex flex-col gap-2 overflow-hidden rounded-lg w-full">
        <img
          src={thumbnail}
          alt={`thumbnail image of ${title}`}
          className="w-full h-auto object-cover aspect-video"
        />
        <p className="w-full px-2 font-[yellowhouse] text-2xl">{title}</p>
      </div>
      <div className="flex gap-3 w-full px-2">
        categories:
        {categories.map((category) => {
          return <p key={category.categoryId}>{category.categoryId}</p>;
        })}
      </div>
      <div className="flex flex-wrap gap-3 px-2">
        <Stats
          icon={"/icons/views.svg"}
          alt={"Views icon"}
          data={views}
          name={"visitas"}
        />
        <Stats
          icon={"/icons/like.svg"}
          alt={"Likes icon"}
          data={likes}
          name={"likes"}
        />
        <Stats
          icon={"/icons/comment.svg"}
          alt={"Comments icon"}
          data={comments}
          name={"comentarios"}
        />
        <Stats
          icon={"/icons/readtime.svg"}
          alt={"Readtime icon"}
          data={readtime}
          name={"min de lectura"}
        />
      </div>
    </a>
  );
}

export default PostCard;
