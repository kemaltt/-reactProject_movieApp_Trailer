import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext();

export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleCredentials = (firstName, lastName, email, password) => {
    setCredentials({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  };
  const [loginError, setLoginError] = useState(false);
  const [login, setLogin] = useState(false);

  const handleLogin = (email, password) => {
    if (credentials.email == email && credentials.password == password) {
      setLogin(true);
      setLoginError(false);
      navigate("/");
    } else {
      setLoginError(true);
    }
  };

  const handleLogOut = () => {
    setCredentials({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setLogin(false);
    // navigate("/login");
  };

  return (
    <AuthenticationContext.Provider
      value={{
        credentials: credentials,
        handleCredentials: handleCredentials,
        handleLogin: handleLogin,
        login: login,
        loginError: loginError,
        handleLogOut: handleLogOut,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
