import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../../../helpers/test";
import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SpellDetails from "./SpellDetails";

const dummySpell = {
  index: "acid-arrow",
  name: "Acid Arrow",
  desc: [
    "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.",
  ],
  higher_level: [
    "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.",
  ],
  range: "90 feet",
  components: ["V", "S", "M"],
  material: "Powdered rhubarb leaf and an adder's stomach.",
  ritual: false,
  duration: "Instantaneous",
  concentration: false,
  casting_time: "1 action",
  level: 2,
  attack_type: "ranged",
  damage: {
    damage_type: {
      index: "acid",
      name: "Acid",
      url: "/api/damage-types/acid",
    },
  },
  school: {
    index: "evocation",
    name: "Evocation",
    url: "/api/magic-schools/evocation",
  },
};

// api handlers
export const handlers = [
  rest.get("https://www.dnd5eapi.co/api/spells/acid-arrow", (req, res, ctx) => {
    return res(ctx.json(dummySpell), ctx.delay(150));
  }),
  rest.get("https://www.dnd5eapi.co/api/spells/acid-arrow", (req, res, ctx) => {
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

test("fetches and display the details of a spell", async () => {
  // attach the API mock handler
  server.use(handlers[0]);

  renderWithProviders(
    <MemoryRouter>
      <SpellDetails spellIndex="acid-arrow" />
    </MemoryRouter>
  );

  // should initiall show the loading spinner
  expect(await screen.findByTitle(/Loading\.\.\./)).toBeInTheDocument();

  // should render heading with name
  expect(await screen.findByRole("heading")).toBeInTheDocument();
  expect(await (await screen.findByRole("heading")).textContent).toEqual(
    dummySpell.name
  );

  // should render description
  expect(await screen.findByText(dummySpell.desc.join())).toBeInTheDocument();

  // should render the higher levels
  expect(
    await screen.findByText(dummySpell.higher_level.join())
  ).toBeInTheDocument();

  // should render the range
  expect(await screen.findByText(dummySpell.range)).toBeInTheDocument();

  // should render the components
  expect(
    await screen.findByText(dummySpell.components.join(", "))
  ).toBeInTheDocument();

  // should render the materials
  expect(await screen.findByText(dummySpell.material)).toBeInTheDocument();

  // should render the duration
  expect(await screen.findByText(dummySpell.duration)).toBeInTheDocument();

  // should render the casting time
  expect(await screen.findByText(dummySpell.casting_time)).toBeInTheDocument();

  // should render the level
  expect(await screen.findByText(dummySpell.level)).toBeInTheDocument();

  // should render the damage
  expect(
    await screen.findByText(dummySpell.damage.damage_type.name)
  ).toBeInTheDocument();

  // should render the school
  expect(await screen.findByText(dummySpell.school.name)).toBeInTheDocument();

  expect(screen.queryByTitle(/Loading\.\.\./)).not.toBeInTheDocument();
});

test("when the fetch fails an error message should be displayed", async () => {
  // attach the API mock handler
  server.use(handlers[1]);

  renderWithProviders(
    <MemoryRouter>
      <SpellDetails spellIndex="acid-arrow" />
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
        .textContent?.includes("Failed to load spell")
    ).toEqual(true);
  });

  // loading shouldn't be rendered
  expect(screen.queryByTitle(/Loading\.\.\./)).not.toBeInTheDocument();
});
