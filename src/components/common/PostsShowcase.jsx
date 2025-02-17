import { useEffect, useState } from "react";
import PostCard from "./PostsCard";
import { fetchData } from "../../utils/utils";
import { feedbackMessage, hasMessage } from "../../utils/context";
import { PostsLoading } from "./loading/PostsLoading";

export function PostsShowcase({ lang, translations, param }) {
  const [posts, setPosts] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const successOnLogin = localStorage.getItem("successOnLogin");

    if (successOnLogin) {
      feedbackMessage.set({
        success: true,
        message: "Successfully logged in!",
      });

      hasMessage.set(true);
      localStorage.removeItem("successOnLogin");
    }

    async function getAllPosts() {
      const postsData = await fetchData(
        `/api/posts${param ? `?category=${param}` : ""}`,
        "GET"
      );

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
      <h2 className="text-2xl mb-2">{translations.PostsShowcase.title}</h2>
      <div className="flex flex-wrap gap-4">
        {posts ? (
          posts.map((post, i) => {
            return (
              <PostCard
                id={post.id}
                title={post.title}
                slug={post.slug}
                thumbnail={post.thumbnailUrl}
                views={post.views}
                readtime={post.readtimeMin}
                categories={post.categories}
                comments={post.comments.length}
                likes={post.userLikes.length}
                translations={translations.PostCard}
                lang={lang}
                key={post.id}
              />
            );
          })
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <PostsLoading />
        )}
      </div>
    </div>
  );
}
