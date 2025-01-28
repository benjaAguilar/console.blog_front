import { useEffect, useRef, useState } from "react";
import { fetchData } from "../utils/utils";
import { feedbackMessage, hasMessage } from "../utils/context";

export function LoginForm() {
  const [errorMessages, setErrorMessages] = useState(null);

  const formRef = useRef();

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
      return setErrorMessages(loginData.validationErrors);
    }

    localStorage.setItem("successOnLogin", true);
    window.location.href = "/";
  }

  return (
    <>
      {errorMessages
        ? errorMessages.map((message, i) => {
            return <p key={i}>{message.msg}</p>;
          })
        : null}
      <form id="formu" ref={formRef} className="flex flex-col gap-4">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />

        <input
          type="submit"
          value="Login"
          onClick={(e) => {
            loginUser(e);
          }}
        />
      </form>
    </>
  );
}
