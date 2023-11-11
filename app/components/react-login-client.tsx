import { ChangeEvent, useState } from "react";

const ClientForm = () => {
  const [form, updateForm] = useState({
    username: "",
    password: "",
  });

  const [status, updateStatus] = useState("waiting");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    const body = JSON.stringify({
      form: {
        username: form.username,
        password: form.password,
      },
    });

    console.log("sending to server", body);

    try {
      const res = await fetch("http://localhost:51000/api/test", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parsedRes = await res.json();

      console.log("res", parsedRes);

      updateStatus(parsedRes?.msg);
    } catch (err) {
      console.error("Something went wrong!", err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <p>{status}</p>
      <div
        style={{ display: "flex", flexDirection: "column", maxWidth: "250px" }}
      >
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={onChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password"
        />
        <button onClick={onSubmit}>Login</button>
      </div>
    </div>
  );
};

export default ClientForm;
