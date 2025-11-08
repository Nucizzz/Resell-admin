import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Scan from "./pages/Scan.jsx";
import Ops from "./pages/Ops.jsx";
import NewProduct from "./pages/NewProduct.jsx";
import Settings from "./pages/Setting.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/ops" element={<Ops />} />
        <Route path="/new" element={<NewProduct />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}
