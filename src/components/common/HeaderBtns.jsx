import { useEffect, useState } from "react";
import { fetchData } from "../../utils/utils";
import { feedbackMessage, hasMessage } from "../../utils/context";

export function HeaderBtns({ translations }) {
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
          <div className="flex gap-2 items-center text-[--col-white]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#F7F7F7"
            >
              <path d="M247.85-260.62q51-36.69 108.23-58.03Q413.31-340 480-340t123.92 21.35q57.23 21.34 108.23 58.03 39.62-41 63.73-96.84Q800-413.31 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 66.69 24.12 122.54 24.11 55.84 63.73 96.84ZM480.02-460q-50.56 0-85.29-34.71Q360-529.42 360-579.98q0-50.56 34.71-85.29Q429.42-700 479.98-700q50.56 0 85.29 34.71Q600-630.58 600-580.02q0 50.56-34.71 85.29Q530.58-460 480.02-460ZM480-120q-75.31 0-141-28.04t-114.31-76.65Q176.08-273.31 148.04-339 120-404.69 120-480t28.04-141q28.04-65.69 76.65-114.31 48.62-48.61 114.31-76.65Q404.69-840 480-840t141 28.04q65.69 28.04 114.31 76.65 48.61 48.62 76.65 114.31Q840-555.31 840-480t-28.04 141q-28.04 65.69-76.65 114.31-48.62 48.61-114.31 76.65Q555.31-120 480-120Zm0-40q55.31 0 108.85-19.35 53.53-19.34 92.53-52.96-39-31.31-90.23-49.5Q539.92-300 480-300q-59.92 0-111.54 17.81-51.61 17.81-89.84 49.88 39 33.62 92.53 52.96Q424.69-160 480-160Zm0-340q33.69 0 56.85-23.15Q560-546.31 560-580t-23.15-56.85Q513.69-660 480-660t-56.85 23.15Q400-613.69 400-580t23.15 56.85Q446.31-500 480-500Zm0-80Zm0 350Z" />
            </svg>
            <p>{username}</p>
          </div>
          <button
            onClick={logoutUser}
            className="bg-amber-500 p-2 text-[--col-black] border-amber-500 border-2 rounded hover:bg-transparent hover:text-[--col-white]"
          >
            {translations.logout}
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <a
            href="/login"
            className="bg-amber-500 p-2 text-[--col-black] border-amber-500 border-2 rounded hover:bg-transparent hover:text-[--col-white]"
          >
            {translations.login}
          </a>
          <a
            href="/register"
            className="bg-amber-500 p-2 text-[--col-black] border-amber-500 border-2 rounded hover:bg-transparent hover:text-[--col-white]"
          >
            {translations.register}
          </a>
        </div>
      )}
    </>
  );
}
