import "./globals.css";
import { loginUser } from "./actions";
import { createUser } from "./actions";

export default function LoginPage() {
  return (
      <>
      <h2>Login to your account</h2>
      <form action={loginUser}>
          <p>Username:</p>
          <input name="username" />
          <p>Password:</p>
          <input name="password" />
          <button type="submit">Login</button>
      </form>
      <h2>Create an account</h2>
      <form action={createUser}>
        <p>Username:</p>
        <input name="username" />
        <p>Password:</p>
        <input name="password" />
        <button type="submit">Login</button>
      </form>
      </>
  );
}