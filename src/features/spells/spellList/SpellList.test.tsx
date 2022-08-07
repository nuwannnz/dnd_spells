import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../../../helpers/test";
import { screen, waitFor } from "@testing-library/react";
import SpellList from "./SpellList";
import { MemoryRouter } from "react-router-dom";

// api handlers
export const handlers = [
  rest.get("https://www.dnd5eapi.co/api/spells", (req, res, ctx) => {
    return res(
      ctx.json({
        count: 2,
        results: [
          {
            index: "acid-arrow",
            name: "Acid Arrow",
            url: "/api/spells/acid-arrow",
          },
          {
            index: "acid-splash",
            name: "Acid Splash",
            url: "/api/spells/acid-splash",
          },
        ],
      }),
      ctx.delay(150)
    );
  }),
  rest.get("https://www.dnd5eapi.co/api/spells", (req, res, ctx) => {
    return res(ctx.status(500), ctx.delay(150));
  }),
];

const server = setupServer();

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.s
afterAll(() => server.close());

test("fetches and display the list of spells", async () => {
  server.use(handlers[0]);
  renderWithProviders(
    <MemoryRouter>
      <SpellList />
    </MemoryRouter>
  );

  // should initiall show the loading spinner
  expect(await screen.findByTitle(/Loading\.\.\./)).toBeInTheDocument();

  // find the spell rows
  const spellRows = await waitFor(() =>
    screen.getAllByTestId("spell-row").map((row) => row.textContent)
  );

  // spell row contents should have the correct names
  expect(spellRows).toEqual(["Acid Arrow", "Acid Splash"]);

  // spinner shouldn't be rendered
  expect(screen.queryByTitle(/Loading\.\.\./)).not.toBeInTheDocument();
});

test("when the fetch request is failed an error message should be displayed", async () => {
  server.use(handlers[1]);
  renderWithProviders(
    <MemoryRouter>
      <SpellList />
    </MemoryRouter>
  );

  // should initiall show the loading spinner
  expect(await screen.findByTitle(/Loading\.\.\./)).toBeInTheDocument();

  // should render the error message
  await waitFor(() => {
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(
      screen
        .getByTestId("error-message")
        .textContent?.includes("Failed to load spells")
    ).toEqual(true);
  });

  // spinner shouldn't be rendered
  expect(screen.queryByTitle(/Loading\.\.\./)).not.toBeInTheDocument();
});
