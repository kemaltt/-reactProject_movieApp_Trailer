import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alertClass, setAlertClass] = useState("alert alert-danger d-none");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password) {
      navigate("/");
    } else {
      setAlertClass("alert alert-danger");
    }
  };

  return (
    <React.Fragment>
      <div className="register">
        <div className="form-image">
          <img
            src={"https://picsum.photos/800/800"}
            className="img-fluid"
            alt="photo"
          />
        </div>
        <div className="register-form">
          <div className={alertClass} role="alert">
            Please fill in the blanks!!!
          </div>
          <h1 className="form-title display-3">Register</h1>
          <form onSubmit={handleSubmit} id="register">
            <div className="mb-3">
              <label for="first-name" className="form-label display-4">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                placeholder="Enter your first name..."
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="last-name" className="form-label display-4">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                placeholder="Enter your last name..."
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="email" className="form-label display-4">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="password" className="form-label display-4">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary form-control"
              value="Register"
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
