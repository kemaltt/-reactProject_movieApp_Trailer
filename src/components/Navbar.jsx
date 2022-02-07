import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light  d-flex d-flex justify-content-between">
        <a className="navbar-brand text-white" href="/">
          React Movie App
        </a>

        <div className="buttons">
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
        </div>
      </nav>
    </React.Fragment>
  );
}
