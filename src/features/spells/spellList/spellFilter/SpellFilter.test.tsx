import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import SpellFilter from "./";

test("render spell filter with name and not active", async () => {
  const clickHandler = jest.fn();

  render(
    <SpellFilter
      filterKey="all"
      name="All"
      activeFilter="favourites"
      onClickHandler={clickHandler}
    />
  );

  // should render the filter name
  expect(screen.getByText("All")).toBeInTheDocument();

  // filter button shouldn't have the active class
  expect(screen.getByRole("button")).not.toHaveClass("active");

  // should call onClickHandler with the key
  fireEvent.click(screen.getByRole("button"));
  expect(clickHandler).toHaveBeenCalledWith("all");
});

test("render active spell filter with name and active", async () => {
  const clickHandler = jest.fn();

  render(
    <SpellFilter
      filterKey="all"
      name="All"
      activeFilter="all"
      onClickHandler={clickHandler}
    />
  );

  // should render the filter name
  expect(screen.getByText("All")).toBeInTheDocument();

  // filter button should have the active class
  expect(screen.getByRole("button")).toHaveClass("active");

  // should call onClickHandler with the key
  fireEvent.click(screen.getByRole("button"));
  expect(clickHandler).toHaveBeenCalledWith("all");
});
