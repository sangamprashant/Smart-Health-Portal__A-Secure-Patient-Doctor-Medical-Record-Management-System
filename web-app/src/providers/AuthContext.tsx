import { createContext, useContext, useEffect, useState } from "react";
// import _env from "../utils/_env";

type User = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  role: "admin" | "doctor" | "patient";
  profile_image?: string;
  gender?: "male" | "female" | "other" | string;
  dateOfBirth?: Date;
  age?: number | string | undefined;
  phone?: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
  patientId?: string;
  notifications: boolean;
}

type AuthContextType = {
  user: User | null;
  token: string | null;
  updateUserData: (user: User) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   const initAuth = async () => {
  //     const storedToken = sessionStorage.getItem("token");

  //     if (!storedToken) {
  //       logout();
  //       return;
  //     }

  //     try {
  //       const res = await fetch(`${_env.SERVER_URL}/user/me`, {
  //         headers: {
  //           Authorization: `Bearer ${storedToken}`,
  //         },
  //       });

  //       if (!res.ok) {
  //         throw new Error("Invalid token");
  //       }

  //       const data = await res.json();

  //       setToken(storedToken);
  //       setUser(data);

  //       sessionStorage.setItem("user", JSON.stringify(data));

  //     } catch (_:unknown) {
  //       console.log("Auto logout: invalid session");
  //       logout();
  //     }
  //   };

  //   initAuth();
  // }, []);

    useEffect(() => {
    // 🔥 DUMMY DATA (replace later when backend is ready)
    const dummyUser: User = {
      _id: "p1",
      fullName: "Prashant Srivastav",
      email: "prashant@example.com",
      password: "hashed_password",
      role: "patient",
      profile_image: "",
      gender: "male",
      age: 24,
      phone: "9876543210",
      address: {
        city: "Noida",
        state: "Uttar Pradesh",
        country: "India",
      },
      patientId: "PAT001",
      notifications: true,
    };

    const dummyToken = "dummy-jwt-token";

    // Simulate login
    setUser(dummyUser);
    setToken(dummyToken);

    sessionStorage.setItem("token", dummyToken);
    sessionStorage.setItem("user", JSON.stringify(dummyUser));
  }, []);


  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const updateUserData = (user: User) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};