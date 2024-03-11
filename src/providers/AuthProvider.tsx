import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { firebaseClient } from "@/lib/firebase/client";

type NullableUser = User | null | undefined;

type AuthContextProps = {
  user: NullableUser;
};

type AuthProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextProps>({ user: undefined });

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProps): JSX.Element => {
  const [user, setUser] = useState<NullableUser>(undefined);

  const value = {
    user,
  };

  useEffect(() => {
    const func = onAuthStateChanged(firebaseClient, (user) => {
      setUser(user);
    });

    return () => func();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
