import { render, screen } from "@testing-library/react";
import React from "react";
import ErrorMessage from "./ErrorMessage";

test("should render error message", async () => {
  const message = "Something went wrong";

  render(<ErrorMessage message={message} />);

  expect(screen.getByTestId("error-message").textContent).toEqual(message);
});
