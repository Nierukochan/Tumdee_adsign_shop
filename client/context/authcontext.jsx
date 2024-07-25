import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse( localStorage.getItem("user")) || null
)

  const login = async ( inputs ) => {
      const res = await axios.post("http://localhost:2000/api/authenticate/login", inputs, {

      })

      setCurrentUser(res.data)
  }
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify( currentUser ))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      { children }
    </AuthContext.Provider>
  )
}
