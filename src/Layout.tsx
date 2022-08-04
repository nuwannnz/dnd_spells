import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
