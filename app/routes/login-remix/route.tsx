import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form, useLoaderData } from "@remix-run/react";

let status = "waiting";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const username = body.get("username") || "INVALID";
  const password = body.get("password") || "INVALID";

  if (username === password && username === "INVALID") {
    status = "invalid login";
    return null;
  }

  if (username === "foo" && password === "bar") {
    status = "successfully logged in as foo";
    return null;
  }

  status = "failed to login";
  return null;
}

export async function loader() {
  return json({ msg: status });
}

export default function LoginRemix() {
  const data = useLoaderData<typeof loader>();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "250px" }}
    >
      <h2>Login Remix</h2>
      <p>{data.msg}</p>
      <Form method="post" style={{ display: "flex", flexDirection: "column" }}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button type="submit">Login </button>
      </Form>
    </div>
  );
}
