const server = import.meta.env.PUBLIC_SERVER;

export async function getPostComments(postId: number) {
  try {
    const response = await fetch(`${server}/api/posts/${postId}/comments`);
    const comments = await response.json();

    return comments;
  } catch (error) {
    return error;
  }
}

export async function createComment(postId: number, data: any) {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${server}/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token ? token : "",
      },
      body: data,
    });
    const commented = await response.json();

    return commented;
  } catch (error) {
    return error;
  }
}
