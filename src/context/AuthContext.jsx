import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error('useAuth must be used within AuthProvider');
  return c;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se há token ao carregar o app
  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('accessToken');
      const funcionarioStr = localStorage.getItem('funcionario');
      
      if (token && funcionarioStr) {
        const funcionario = JSON.parse(funcionarioStr);
        setIsAuthenticated(true);
        setUser(funcionario);
      }
    } catch (err) {
      console.error('Erro ao verificar autenticação:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (funcionario) => {
    setIsAuthenticated(true);
    setUser(funcionario);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('funcionario');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};