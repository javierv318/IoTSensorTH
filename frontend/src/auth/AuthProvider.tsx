import { useContext, createContext, useState, ReactNode } from "react";

interface AuthContextProps {
  user: any | null;
  isAuthenticated: boolean;
  login: (userData: any) => void;
  logout: () => void;
}

const defaultAuthContextValues: AuthContextProps = {
  user: null,
  isAuthenticated: false,
  login: (userData) => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContextValues);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);