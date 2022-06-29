import React, { createContext, useState } from "react";
import { User, UserRole } from "common"

export interface UserContextData { 
  user: User
  loggedIn: boolean
}

const initialUser: UserContextData = {
  loggedIn: process.env.NODE_ENV.toUpperCase() === "DEVELOPMENT",
  user: {
    email: "null",
    role: UserRole.GENERIC
  }
};
interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<any>(initialUser);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(initialUser);
  const value = React.useMemo(() => [user, setUser], [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
