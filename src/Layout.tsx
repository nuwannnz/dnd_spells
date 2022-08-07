import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { loadSpellFavourites } from "./features/spells/spell.slice";
import Homepage from "./pages/homepage/Homepage";
import SpellDetailsPage from "./pages/spellDetails/SpellDetailsPage";
import { AppDispatch } from "./store";

/**
 * This HOC defines the routes, highlevel layouts and load initial data
 */
const Layout: React.FC = () => {
  const appDispatch: AppDispatch = useDispatch();

  useEffect(() => {
    appDispatch(loadSpellFavourites());
  }, []);

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
