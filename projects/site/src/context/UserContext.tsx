/* eslint react/jsx-no-constructed-context-values: 0 */

import React, { createContext, useState } from "react";

interface User {
    loggedIn: boolean
    id: string,
    email: string,
    password: string
}

const initalUser: User = {
    loggedIn: false,
    id: "null",
    email: "null",
    password: "null"
} 
interface UserProviderProps {
  children: React.ReactNode
};

export const UserContext = createContext<any>(initalUser);

export const UserProvider = ({ children }:UserProviderProps) => {
  const [user, setUser] = useState(initalUser);
  const value = {user, setUser}
  return (
  <UserContext.Provider value={value}>
    {children}
    </UserContext.Provider>
    );
};
