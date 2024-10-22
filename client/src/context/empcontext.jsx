import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

export const EmpContext = createContext();

export const useEmpAuth = () => {
  return useContext(EmpContext);
}

export const EmpContextProvider = ({ children }) => {
  const [currentEmp, setCurrentEmp] = useState(null);

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:2000/api/authenticate/emplogin", inputs, { withCredentials: true });
      setCurrentEmp(res.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
  }, [currentEmp]);

  return (
    <EmpContext.Provider value={{ currentEmp, login }}>
      {children}
    </EmpContext.Provider>
  );
};
