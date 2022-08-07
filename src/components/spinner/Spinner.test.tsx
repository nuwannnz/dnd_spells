import { render, screen } from "@testing-library/react";
import React from "react";
import Spinner from "./Spinner";

test("should render spinner", async () => {
  render(<Spinner />);

  expect(screen.getByTitle(/Loading\.\.\./)).toBeInTheDocument();
});
