import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { renderWithProviders } from "../../../helpers/test";
import FavouriteButton from "./FavouriteButton";

test("favourite button should be rendered when not in favourite mode", async () => {
  renderWithProviders(<FavouriteButton spellIndex="acid-arrows" />);

  expect(screen.getByTitle("Add to favourites")).toBeInTheDocument();

  // heart icon should be rendered and it should be the regular fontawesome icon
  expect(screen.getByTestId("favourite-icon")).toHaveClass("fa-heart");
  expect(
    screen.getByTestId("favourite-icon").getAttribute("data-prefix")
  ).toEqual("far");
});

test("favourite button should be rendered when in favourite mode", async () => {
  renderWithProviders(<FavouriteButton spellIndex="acid-arrows" />, {
    preloadedState: {
      spells: {
        favouriteSpellIndexes: ["acid-arrows"],
        spellByIndex: {
          loading: false,
          data: null,
          error: null,
        },
        spellList: {
          loading: false,
          data: null,
          error: null,
        },
      },
    },
  });

  expect(screen.getByTitle("Remove from favourites")).toBeInTheDocument();

  // heart icon should be rendered and it should be the solid fontawesome icon
  expect(screen.getByTestId("favourite-icon")).toHaveClass("fa-heart");
  expect(
    screen.getByTestId("favourite-icon").getAttribute("data-prefix")
  ).toEqual("fas");
});
