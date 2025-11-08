import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Scan from "./pages/Scan.jsx";
import Ops from "./pages/Ops.jsx";
import NewProduct from "./pages/NewProduct.jsx";
import Settings from "./pages/Setting.jsx";
import Login from "./pages/login.jsx";

function Private({ children }) {
  const token = localStorage.getItem("token");
  const loc = useLocation();
  if (!token) return <Navigate to="/login" state={{ from: loc }} replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />
        <Route
          path="/scan"
          element={
            <Private>
              <Scan />
            </Private>
          }
        />
        <Route
          path="/ops"
          element={
            <Private>
              <Ops />
            </Private>
          }
        />
        <Route
          path="/new"
          element={
            <Private>
              <NewProduct />
            </Private>
          }
        />
        <Route
          path="/settings"
          element={
            <Private>
              <Settings />
            </Private>
          }
        />
      </Routes>
    </>
  );
}
