import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const AuthenticationContext = createContext();

export const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ currentUser }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
