import { useEffect, useState } from "react";

export function PostsShowcase() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/posts");
      const postsData = await response.json();

      setPosts(postsData.posts);
    }
    fetchData();
  }, []);

  console.log(posts);
  return (
    <div>
      <h2>Latest Posts</h2>
      {posts ? (
        posts.map((post) => {
          return <p>{post.title}</p>;
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
