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
  translations,
}) {
  return (
    <a
      href={`/posts/${slug}`}
      className="flex flex-col gap-3 rounded-lg bg-amber-500 bg-opacity-30 flex-grow basis-1/2 md:basis-1/3 lg:basis-1/4 pb-4"
    >
      <div className="flex flex-col gap-2 overflow-hidden rounded-lg w-full">
        <img
          src={thumbnail}
          alt={`thumbnail image of ${title}`}
          className="w-full h-auto object-cover aspect-video"
        />
        <p className="w-full px-2 text-xl font-medium">{title}</p>
      </div>
      <div className="flex gap-2 w-full px-2">
        {categories.map((category) => {
          return (
            <p
              key={category.categoryId}
              className=" text-xs rounded-2xl pl-2 pr-2 border border-[--col-black]"
            >
              {category.category.name}
            </p>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 px-2">
        <Stats
          icon={"/icons/views.svg"}
          alt={"Views icon"}
          data={views}
          name={translations.StatsTitles.views}
        />
        <Stats
          icon={"/icons/like.svg"}
          alt={"Likes icon"}
          data={likes}
          name={likes === 1 ? "like" : "likes"}
        />
        <Stats
          icon={"/icons/comment.svg"}
          alt={"Comments icon"}
          data={comments}
          name={translations.StatsTitles.comments}
        />
        <Stats
          icon={"/icons/readtime.svg"}
          alt={"Readtime icon"}
          data={readtime}
          name={translations.StatsTitles.readtime}
        />
      </div>
    </a>
  );
}

export default PostCard;
