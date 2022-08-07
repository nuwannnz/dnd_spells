import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { renderWithProviders } from "../../../../helpers/test";
import SpellListItem from "./";

test("Display spell list item and navigates to the correct route on click", async () => {
  const spell = {
    index: "acid-arrow",
    name: "Acid Arrow",
  };

  renderWithProviders(
    <MemoryRouter>
      <Routes>
        <Route index element={<SpellListItem spell={spell} />} />
        <Route path="/spell/acid-arrow" element={<h1>Acid Arrow</h1>} />
      </Routes>
    </MemoryRouter>
  );

  // spell list item should be rendered
  expect(screen.getByText("Acid Arrow")).toBeInTheDocument();

  // when click on the spell list item it should navigate to the correct route
  fireEvent.click(screen.getByRole("link"));
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: "Acid Arrow" })
    ).toBeInTheDocument();
  });
});
