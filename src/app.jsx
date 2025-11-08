import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Scan from "./pages/scan.jsx";
import Ops from "./pages/ops.jsx";
import NewProduct from "./pages/newProduct.jsx";
import Settings from "./pages/setting.jsx";

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
