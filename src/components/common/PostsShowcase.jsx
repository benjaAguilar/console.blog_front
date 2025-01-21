import { useEffect, useState } from "react";
import PostCard from "./PostsCard";
import { getAllPosts } from "../../utils/postsApi";

export function PostsShowcase() {
  const [posts, setPosts] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    async function fetchData() {
      const postsData = await getAllPosts();

      if (!postsData.success) {
        setErrorMessage(postsData.message);
        return;
      }

      setPosts(postsData.posts);
    }

    fetchData();
  }, []);
  console.log(errorMessage);
  console.log(posts);
  return (
    <div className="p-4">
      <h2>Ultimos posts</h2>
      <div className="flex flex-wrap gap-4">
        {posts ? (
          posts.map((post, i) => {
            return (
              <PostCard
                id={post.id}
                title={post.title}
                thumbnail={post.thumbnailUrl}
                views={post.views}
                readtime={post.readtimeMin}
                categories={post.categories}
                comments={post.comments.length}
                likes={post.userLikes.length}
                key={post.id}
              />
            );
          })
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
