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

export async function registerUser(data: any) {
  try {
    const response = await fetch(`${server}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    });

    const registerData = await response.json();

    return registerData;
  } catch (error) {
    return error;
  }
}

export async function loginUser(data: any) {
  try {
    const response = await fetch(`${server}/api/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    });

    const loginData = await response.json();

    return loginData;
  } catch (error) {
    return error;
  }
}
