import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import SpellDetailsPage from "./pages/spellDetails/SpellDetailsPage";

/**
 * This HOC defines the routes and highlevel layout
 */
const Layout: React.FC = () => {
  return (
    <div className="layout">
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/spell/:spellIndex" element={<SpellDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
