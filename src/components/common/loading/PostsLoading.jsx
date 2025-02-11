export function PostsLoading() {
  return (
    <div className="flex flex-wrap gap-4 animate-intermitentOpacity">
      <div className="flex flex-col gap-3 rounded-lg flex-grow basis-1/2 md:basis-1/3 lg:basis-1/4 pb-4">
        <div className="flex flex-col gap-2 overflow-hidden rounded-lg w-full">
          <img
            src="/defaultThumbnail.webp"
            className="w-full h-auto object-cover aspect-video grayscale opacity-80"
          />
          <div className="w-3/4 h-3 px-2 bg-[--col-black] opacity-30 mb-1 rounded-sm"></div>
        </div>
        <div className="w-3/4 h-2 px-2 bg-[--col-black] opacity-30 pb-4 rounded-sm"></div>
        <div className="w-1/2 h-2 px-2 bg-[--col-black] opacity-30 pb-4 rounded-sm"></div>
      </div>

      <div className="flex flex-col gap-3 rounded-lg flex-grow basis-1/2 md:basis-1/3 lg:basis-1/4 pb-4">
        <div className="flex flex-col gap-2 overflow-hidden rounded-lg w-full">
          <img
            src="/defaultThumbnail.webp"
            className="w-full h-auto object-cover aspect-video grayscale opacity-80"
          />
          <div className="w-3/4 h-3 px-2 bg-[--col-black] opacity-30 mb-1 rounded-sm"></div>
        </div>
        <div className="w-3/4 h-2 px-2 bg-[--col-black] opacity-30 pb-4 rounded-sm"></div>
        <div className="w-1/2 h-2 px-2 bg-[--col-black] opacity-30 pb-4 rounded-sm"></div>
      </div>

      <div className="flex flex-col gap-3 rounded-lg flex-grow basis-1/2 md:basis-1/3 lg:basis-1/4 pb-4">
        <div className="flex flex-col gap-2 overflow-hidden rounded-lg w-full">
          <img
            src="/defaultThumbnail.webp"
            className="w-full h-auto object-cover aspect-video grayscale opacity-80"
          />
          <div className="w-3/4 h-3 px-2 bg-[--col-black] opacity-30 mb-1 rounded-sm"></div>
        </div>
        <div className="w-3/4 h-2 px-2 bg-[--col-black] opacity-30 pb-4 rounded-sm"></div>
        <div className="w-1/2 h-2 px-2 bg-[--col-black] opacity-30 pb-4 rounded-sm"></div>
      </div>
    </div>
  );
}
