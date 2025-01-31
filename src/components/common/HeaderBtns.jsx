import { useEffect, useState } from "react";
import { fetchData } from "../../utils/utils";
import { feedbackMessage, hasMessage } from "../../utils/context";

export function HeaderBtns() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function getUser() {
      const user = await fetchData("/api/users/authUser", "GET");

      if (user.success) {
        setUsername(user.name);
      }
    }

    getUser();
  }, []);

  async function logoutUser() {
    const isLoggedOut = await fetchData("/api/users/logout", "POST");

    feedbackMessage.set({
      success: isLoggedOut.success,
      message: isLoggedOut.message,
    });

    hasMessage.set(true);

    if (isLoggedOut.success) {
      setUsername(null);
    }
  }

  return (
    <>
      {username ? (
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <img src="/icons/user.svg" alt="user icon" />
            <p>{username}</p>
          </div>
          <button
            onClick={logoutUser}
            className="bg-amber-500 p-2 text-[--col-black] border-amber-500 border-2 rounded hover:bg-transparent hover:text-[--col-white]"
          >
            Cerrar sesion
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <a
            href="/login"
            className="bg-amber-500 p-2 text-[--col-black] border-amber-500 border-2 rounded hover:bg-transparent hover:text-[--col-white]"
          >
            Iniciar Sesion
          </a>
          <a
            href="/register"
            className="bg-amber-500 p-2 text-[--col-black] border-amber-500 border-2 rounded hover:bg-transparent hover:text-[--col-white]"
          >
            Registrarse
          </a>
        </div>
      )}
    </>
  );
}
