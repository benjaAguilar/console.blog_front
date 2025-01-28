import { useEffect, useState } from "react";
import PostCard from "./PostsCard";
import { fetchData } from "../../utils/utils";
import { feedbackMessage, hasMessage } from "../../utils/context";

export function PostsShowcase() {
  const [posts, setPosts] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    async function getAllPosts() {
      const postsData = await fetchData("/api/posts", "GET");

      if (!postsData.success) {
        setErrorMessage(postsData.message);

        feedbackMessage.set({
          success: false,
          message: postsData.message,
        });

        hasMessage.set(true);
        return;
      }

      setPosts(postsData.posts);
    }

    getAllPosts();
  }, []);

  return (
    <div>
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
