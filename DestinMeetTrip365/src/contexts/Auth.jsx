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
      const response = await api(`/user?email=${email}&password=${password}&type_user=${type_user}`);

      const data = response.data;

      if (data.length === 0) {
        return false;
      }
      const usuario = data.find(
        (user) =>
          user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
          user.password === password
      );

      if (usuario) {
        setUser(usuario);
        localStorage.setItem("DestinMeetTrip365", JSON.stringify(usuario));
        return {user: usuario};
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
    localStorage.removeItem("DestinMeetTrip365");
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
