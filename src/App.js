import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Overview from "./pages/Overview";
import { AuthContextProvider } from "./contexts/AuthenticationContext";
import React from "react";

export default function App() {
  return (
    <React.Fragment>
      <Router>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />{" "}
            <Route path="/reactProject_movieApp_Trailer/" element={<Main />} />{" "}
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/register" element={<Register />} />{" "}
            <Route path="/overview" element={<Overview />} />{" "}
          </Routes>{" "}
        </AuthContextProvider>{" "}
      </Router>{" "}
    </React.Fragment>
  );
}
