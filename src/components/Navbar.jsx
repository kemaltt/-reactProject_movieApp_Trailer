import React from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../contexts/AuthenticationContext";
import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase-config";

export default function Navbar() {
  const navigate = useNavigate();
  let navTheme = "nav-1";
  let brandColor;

  const { currentUser } = useContext(AuthenticationContext);

  const handleLogOut = () => {
    signOut(auth);
  };

  if (currentUser) {
    navTheme = "nav-2";
    brandColor = "navbar-brand text-danger";
  } else {
    navTheme = "nav-1";
    brandColor = "navbar-brand text-white";
  }

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light  d-flex d-flex justify-content-between"
        id={navTheme}
      >
        <a className={brandColor} href="/reactProject_movieApp_Trailer/">
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
                className="btn btn-outline-warning mx-2"
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
