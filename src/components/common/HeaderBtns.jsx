import { useEffect, useState } from "react";
import { fetchData } from "../../utils/utils";

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

  return (
    <>
      {username ? (
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <img src="/icons/user.svg" alt="user icon" />
            <p>{username}</p>
          </div>
          <a href="/logout" className="bg-cyan-500 p-2 rounded">
            Cerrar sesion
          </a>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <a href="/login" className="bg-cyan-500 p-2 rounded">
            Iniciar Sesion
          </a>
          <a href="/register" className="bg-cyan-500 p-2 rounded">
            Registrarse
          </a>
        </div>
      )}
    </>
  );
}
