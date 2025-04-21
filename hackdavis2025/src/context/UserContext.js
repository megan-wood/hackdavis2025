"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [username, setUsersUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsersUsername(storedUsername); 
    }
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username); 
    } else {
      localStorage.removeItem("username"); 
    }
  }, [username])

  return (
    <UserContext.Provider value={{ username, setUsersUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}