import { useRef, useState } from "react";
import { fetchData } from "../utils/utils";
import { feedbackMessage, hasMessage } from "../utils/context";

export function RegisterForm({ translations }) {
  const [errorMessages, setErrorMessages] = useState(null);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const rPasswordRef = useRef();
  const spanMessage = useRef();

  const formRef = useRef();

  function inputChange(e, min) {
    console.log(e.target.value);
    const regex = /^[A-Za-z0-9]+$/;

    if (
      e.target.value.length < min ||
      e.target.value.length > 20 ||
      !regex.test(e.target.value)
    ) {
      e.target.style.borderColor = "red";
      return;
    }

    if (e.target.name === "r-password") {
      if (passwordRef.current.value === e.target.value) {
        e.target.style.borderColor = "green";
        spanMessage.current.style.display = "none";
        return;
      }

      e.target.style.borderColor = "red";
      spanMessage.current.style.display = "block";
      return;
    }

    e.target.style.borderColor = "green";
  }

  async function registerUser(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = new URLSearchParams(formData);

    const registerData = await fetchData(
      "/api/users/register",
      "POST",
      { "Content-Type": "application/x-www-form-urlencoded" },
      data
    );

    feedbackMessage.set({
      success: registerData.success,
      message: registerData.message,
    });

    hasMessage.set(true);

    if (!registerData.success) {
      registerData.validationErrors.forEach((err) => {
        if (err.path === "username") {
          usernameRef.current.style.borderColor = "red";
        } else if (err.path === "password") {
          passwordRef.current.style.borderColor = "red";
        } else {
          rPasswordRef.current.style.borderColor = "red";
        }
      });
      return setErrorMessages(registerData.validationErrors);
    }

    localStorage.setItem("successOnRegister", true);
    localStorage.setItem("message", registerData.message);

    const pathname = window.location.pathname;
    if (pathname.includes("/es")) {
      window.location.href = "/es/login";
      return;
    }

    window.location.href = "/login";
  }

  return (
    <>
      {errorMessages && errorMessages.length > 0 && (
        <div
          className="p-4 mb-4 rounded-md bg-red"
          style={{
            backgroundColor: "#f87171",
            backgroundImage: "var(--noise)",
          }}
        >
          {errorMessages.map((message, i) => (
            <p key={i} className="font-medium">
              * {message.msg}
            </p>
          ))}
        </div>
      )}
      <form
        id="formu"
        ref={formRef}
        style={{
          backgroundColor: "var(--col-black)",
          backgroundImage: "var(--noise)",
        }}
        className="flex flex-col gap-4 p-4 text-[--col-white] rounded-xl"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username">{translations.username}</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => {
              inputChange(e, 4);
            }}
            ref={usernameRef}
            className="bg-transparent border-2 rounded-md p-1 focus-visible:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">{translations.password}</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              inputChange(e, 8);
            }}
            ref={passwordRef}
            className="bg-transparent border-2 rounded-md p-1 focus-visible:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label htmlFor="r-password">{translations.rPassword}</label>
            <span className="text-red-500 italic hidden" ref={spanMessage}>
              * {translations.span} *
            </span>
          </div>
          <input
            type="password"
            id="r-password"
            name="r-password"
            onChange={(e) => {
              inputChange(e, 8);
            }}
            ref={rPasswordRef}
            className="bg-transparent border-2 rounded-md p-1 focus-visible:outline-none"
          />
        </div>

        <input
          type="submit"
          value="Registrarse"
          className="bg-amber-500 p-2 text-[--col-black] border-amber-500 border-2 rounded"
          onClick={(e) => {
            registerUser(e);
          }}
        />
      </form>
    </>
  );
}
