import axios from "axios";
import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse( localStorage.getItem("user")) || null
)

  const login = async ( inputs ) => {
      const res = await axios.post("http://localhost:2000/api/authenticate/login", inputs, {
        withCredentials: true
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
