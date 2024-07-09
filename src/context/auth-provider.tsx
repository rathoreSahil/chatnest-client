"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UserType = {
  _id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null as UserType | null);

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const res = await fetch(
          "http://localhost:3182/api/v1/users/is-logged-in",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const resJson = await res.json();

        if (res.ok) {
          setUser(resJson.data.user);
        }
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
