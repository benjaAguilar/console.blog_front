interface User {
  id: number | null;
  name: string | null;
  role: string | null;
}
const server = import.meta.env.PUBLIC_SERVER;

export async function getAuthUser(): Promise<User> {
  try {
    const token = localStorage.getItem("token");

    const userResponse = await fetch(`${server}/api/users/authUser`, {
      headers: {
        Authorization: token ? token : "",
      },
    });

    const user = await userResponse.json();
    return user;
  } catch (e) {
    console.log(e);
    return {
      id: null,
      name: null,
      role: null,
    };
  }
}
