export function CommentsLoading() {
  return (
    <div className="w-full animate-intermitentOpacity">
      <hr />
      <div className="grid grid-cols-[30px_4fr_1fr] items-center p-4 gap-x-1 gap-y-3">
        <div className="w-6 h-6 bg-[--col-black] opacity-30 rounded-full"></div>
        <div className="row-start-2 row-span-2"></div>
        <div className="w-20 h-3 bg-[--col-black] opacity-30 rounded-sm"></div>
        <div className="justify-self-end flex items-center gap-4">
          <div className="w-20 h-3 bg-[--col-black] opacity-30 rounded-sm"></div>
        </div>
        <div className="w-1/4 h-3 bg-[--col-black] opacity-30 rounded-sm"></div>
        <div className="row-start-3 col-start-2 flex items-center gap-1">
          <div className="w-3 h-3 bg-[--col-black] opacity-30 rounded-sm"></div>
          <div className="w-10 h-3 bg-[--col-black] opacity-30 rounded-sm"></div>
        </div>
      </div>
      <hr />
    </div>
  );
}
