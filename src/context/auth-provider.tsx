"use client";
import { Fetch } from "@/lib/fetch";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  authUser: User | null;
  setAuthUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState(null as User | null);

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const resJson = await Fetch.GET("/users/is-logged-in");
        setAuthUser(resJson.data.user);
      } catch (error: any) {
        setAuthUser(null);
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
