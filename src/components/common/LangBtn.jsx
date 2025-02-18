import { useEffect, useState } from "react";

export function LangBtn() {
  const [lang, setLang] = useState("ES");

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname.includes("/es")) {
      setLang("EN");
    }
  }, []);

  return (
    <a
      href={lang === "EN" ? "/" : "/es"}
      className="flex items-center gap-1 bg-amber-500 p-2 text-[--col-black] border-amber-500 border-2 rounded"
    >
      <img src="/icons/lang.svg" alt="languaje icon" />
      {lang}
    </a>
  );
}
