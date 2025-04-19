import "./globals.css";
import { loginUser } from "./actions";

export default function LoginPage() {
  return (
      <>
      <form action={loginUser}>
          <p>Username:</p>
          <input name="username" />
          <p>Password:</p>
          <input name="password" />
          <button type="submit">Login</button>
      </form>
      <p>testing</p>
      <p>hello</p>
      <p>hi</p>
      </>
  );
}