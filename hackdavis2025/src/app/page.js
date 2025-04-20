"use client"
import "./globals.css";
import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

import { loginUser } from "./actions";
import { createUser } from "./actions";
// import { createContext } from "react";
// import { useContext } from "react"; 
// import { createContext, useContext } from 'react';

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [username, setUsername] = useState(null);

//   return (
//     <UserContext.Provider value={{ username, setUsername }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   return useContext(UserContext);
// }

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsersUsername } = useUser();
  

  async function handleUserLogin(e) {
    e.preventDefault();
    console.log("username 1", username);
    try {
      console.log("username", username);
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("response", response); 
      if (response.ok) {
        // Login successful!
        console.log('Login successful:', data);
        setUsersUsername(username);
        // Redirect the user to a protected page
        router.push("/homePage");
      } else {
        // Login failed
        console.error('Login failed:', data);
      }
    } catch (error) {
      console.error('There was an error during login:', error);
    }
  }

  // return (
  //     <>
  //     <h2>Login to your account</h2>
  //     <form onSubmit={handleUserLogin}>
  //         <p>Username:</p>
  //         <input name="username" />
  //         <p>Password:</p>
  //         <input name="password" />
  //         <button type="submit">Login</button>
  //     </form>
  //     <h2>Create an account</h2>
  //     <form action={createUser}>
  //       <p>Username:</p>
  //       <input name="username" />
  //       <p>Password:</p>
  //       <input name="password" />
  //       <button type="submit">Login</button>
  //     </form>
  //     </>
      
  // );
  return (
    <>
    <form onSubmit={handleUserLogin}>
      <h2>Login</h2>
      {/* {error && <p className="error">{error}</p>} */}
      <div>
        <label htmlFor="username">Username:</label>
        <br></br>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <br></br>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
    <Link href="/createAccount">Create an account</Link>
    </>
  );
}