import { useEffect, useRef, useState } from "react";
import { fetchData } from "../utils/utils";
import { feedbackMessage, hasMessage } from "../utils/context";

export function LoginForm() {
  const [errorMessages, setErrorMessages] = useState(null);

  const formRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const successOnRegister = localStorage.getItem("successOnRegister");

    if (successOnRegister) {
      feedbackMessage.set({
        success: true,
        message: "successfully registered user!",
      });

      hasMessage.set(true);

      localStorage.removeItem("successOnRegister");
    }
  }, []);

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

    e.target.style.borderColor = "green";
  }

  async function loginUser(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = new URLSearchParams(formData);

    const loginData = await fetchData(
      "/api/users/login",
      "POST",
      { "Content-Type": "application/x-www-form-urlencoded" },
      data
    );

    feedbackMessage.set({
      success: loginData.success,
      message: loginData.message,
    });

    hasMessage.set(true);

    if (!loginData.success) {
      loginData.validationErrors.forEach((err) => {
        if (err.path === "username") {
          usernameRef.current.style.borderColor = "red";
        } else if (err.path === "password") {
          passwordRef.current.style.borderColor = "red";
        }
      });

      return setErrorMessages(loginData.validationErrors);
    }

    localStorage.setItem("successOnLogin", true);
    window.location.href = "/";
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            ref={usernameRef}
            onChange={(e) => {
              inputChange(e, 4);
            }}
            className="bg-transparent border-2 rounded-md p-1 focus-visible:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            onChange={(e) => {
              inputChange(e, 8);
            }}
            className="bg-transparent border-2 rounded-md p-1 focus-visible:outline-none"
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="bg-amber-500 p-2 text-[--col-black] border-amber-500 border-2 rounded"
          onClick={(e) => {
            loginUser(e);
          }}
        />
      </form>
    </>
  );
}
