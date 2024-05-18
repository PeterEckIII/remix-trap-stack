import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/ui/button";
import { createUserSession } from "~/utils/session.server";

// export const loader = async ({ request }: LoaderFunctionArgs) => {};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const remember = formData.get("remember") === "on";
  const redirectUrl = params.redirectTo ?? "/";

  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  return createUserSession({
    request,
    remember,
    redirectTo: redirectUrl,
    userId: "",
  });
};

export default function Login() {
  return (
    <div>
      <h1 className="text-2xl">Login</h1>
      <Form method="post">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <label>
          <input type="checkbox" name="remember" />
          Remember me
        </label>
        <Button variant="default" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
