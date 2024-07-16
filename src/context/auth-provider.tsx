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
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const resJson = await Fetch.GET("/users/is-logged-in");
        setUser(resJson.data.user);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        setUser(null);
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
