import { createContext, useContext } from 'react';

const AuthContext = createContext({});

function AuthProvider({ children }) { // o children recebe o primeiro(s) filho(s) da função (no caso, as rotas <Routes /> no main.jsx)

  return(
    <AuthContext.Provider value={{ name: "Gabriel Loures", email: "gabriel@gmail.com" }}>
      {children}
    </AuthContext.Provider>
  )

}

function useAuth() {

  const context = useContext(AuthContext);

  return context

}

export { AuthProvider, useAuth };