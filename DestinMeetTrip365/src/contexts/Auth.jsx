import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("DestinMeetTrip365");
    return user ? JSON.parse(user) : null;
  });

  async function signIn({ email, password, type_user }) {
    try {
      const response = await api("/Login", {
        method: "POST",
        data: {
          email,
          password,
          type_user,
        },
      });
      if (response && response.data) {
        const { token } = response.data;
        localStorage.setItem("token", token);
      }
      const responseData = await api(
        `/user?email=${email}&password=${password}&type_user=${type_user}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (responseData.length === 0) {
        return false;
      }
      const usuario = responseData.data.find(
        (user) => user.email.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (usuario) {
        setUser(usuario);
        localStorage.setItem("DestinMeetTrip365", JSON.stringify(usuario));
        return { user: usuario };
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      return false;
    }
  }
  function signOut() {
    setUser(null);
    localStorage.removeItem("DestinMeetTrip365", JSON.stringify(user));
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
