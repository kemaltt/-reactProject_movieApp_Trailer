import React from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase-config";

export default function Navbar() {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthenticationContext);

  const handleLogOut = () => {
    signOut(auth);
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light  d-flex d-flex justify-content-between">
        <a className="navbar-brand text-white" href="/">
          React Movies
        </a>

        <div className="buttons">
          {currentUser ? (
            <div className="d-flex">
              <h3 className="text-capitalize text-light">
                {currentUser.displayName}
              </h3>
              <button
                onClick={handleLogOut}
                className="btn btn-outline-light mx-2"
              >
                Log Out
              </button>
            </div>
          ) : (
            <form className="form my-2 my-lg-0">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-outline-light my-2 mx-1"
                type="button"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-outline-light "
                type="button"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
}
