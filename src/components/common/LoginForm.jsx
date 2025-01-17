import { useRef, useState } from "react";

export function LoginForm() {
  const [errorMessages, setErrorMessages] = useState(null);

  const formRef = useRef();
  const server = import.meta.env.PUBLIC_SERVER;

  function fetchData(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = new URLSearchParams(formData);

    fetch(`${server}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          return setErrorMessages(data.validationErrors);
        }

        localStorage.setItem("token", data.token);

        window.location.href = "/";
      });
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
            fetchData(e);
          }}
        />
      </form>
    </>
  );
}
