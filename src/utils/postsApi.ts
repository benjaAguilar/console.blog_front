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
