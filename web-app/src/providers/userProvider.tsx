import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface User {
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);

    sessionStorage.setItem("smartHealthUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("smartHealthUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
