import { useRef, useState } from "react";
import { registerUser } from "../utils/userApi";

export function RegisterForm() {
  const [errorMessages, setErrorMessages] = useState(null);

  const formRef = useRef();

  async function fetchData(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = new URLSearchParams(formData);

    const registerData = await registerUser(data);

    if (!registerData.success) {
      return setErrorMessages(registerData.validationErrors);
    }

    window.location.href = "/login";
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

        <label htmlFor="r-password">Repeat Password</label>
        <input type="password" id="r-password" name="r-password" />

        <input
          type="submit"
          value="Sign Up"
          onClick={(e) => {
            fetchData(e);
          }}
        />
      </form>
    </>
  );
}
