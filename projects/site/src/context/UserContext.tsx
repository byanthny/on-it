/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from "react";
import { Tag, User, UserRole } from "common";
import { toast } from "react-toastify";
import OnItApi from "../services/OnItApi";

export interface UserContextData {
  user: User;
  loggedIn: boolean;
  tags?: Array<Tag>;
}

const initialUser: UserContextData = {
  loggedIn: process.env.NODE_ENV.toUpperCase() === "DEVELOPMENT",
  user: {
    email: "null",
    role: UserRole.GENERIC,
  },
};
interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<any>(initialUser);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  // TODO Memoize

  const [user, setUser] = useState(initialUser);

  const logout = async () => {
    try {
      const response = await OnItApi.logout();

      if (response.error)
        throw response.error.message;

      setUser({ ...initialUser, loggedIn: false });
    } catch (error) {
      toast(error as string);
    }
  };

  const updateTags = async () => {
    if (user.loggedIn) {
      try {
        const response = await OnItApi.tag.search({});

        if (response.error) throw response.error.message;

        user.tags = response.payload;
      } catch (error) {
        toast("Error Updating Tags");
      }
    }
  };

  const value = { user, setUser, logout, updateTags };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
