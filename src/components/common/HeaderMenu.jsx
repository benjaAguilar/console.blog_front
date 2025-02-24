import { useRef } from "react";
import { HeaderBtns } from "./HeaderBtns";

export function HeaderMenu({ translations }) {
  const menuRef = useRef();

  function showMenu() {
    if (menuRef.current) {
      if (menuRef.current.style.display !== "flex") {
        menuRef.current.style.display = "flex";
      } else {
        menuRef.current.style.display = "none";
      }
    }
  }

  return (
    <>
      <button
        className="bg-amber-500 p-2 text-[--col-black] border-amber-500 border-2 rounded"
        onClick={showMenu}
      >
        <img src="/icons/menu.svg" alt="menu icon" />
      </button>
      <div
        className="items-center hidden absolute w-full h-auto left-[0] z-10 p-4"
        style={{
          backgroundColor: "var(--col-black)",
          backgroundImage: "var(--noise)",
        }}
        ref={menuRef}
      >
        <div className="w-40">
          <HeaderBtns translations={translations} />
        </div>
      </div>
    </>
  );
}
