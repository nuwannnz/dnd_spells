import { configureStore } from "@reduxjs/toolkit";
import spellListReducer from "../features/spells/spellList/spellList.slice";

export const store = configureStore({
  reducer: {
    spells: spellListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
