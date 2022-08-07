import { configureStore } from "@reduxjs/toolkit";
import spellReducer from "../features/spells/spell.slice";

export const store = configureStore({
  reducer: {
    spells: spellReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
