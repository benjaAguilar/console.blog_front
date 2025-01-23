const server = import.meta.env.PUBLIC_SERVER;

export async function getAllPosts() {
  try {
    const response = await fetch(`${server}/api/posts`);
    const postsData = await response.json();

    return postsData;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchLikePost(postId: number) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${server}/api/posts/${postId}/like`, {
      method: "PUT",
      headers: {
        Authorization: token ? token : "",
      },
    });
    const liked = await response.json();

    return liked;
  } catch (error) {
    console.log(error);
    return error;
  }
}
