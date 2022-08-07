import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSpellByIndex, fetchSpells } from "../../api/spell";
import { mapSpellDtoToSpell } from "../../helpers/spell";
import { AppDispatch, RootState } from "../../store";
import { Spell, SpellListItemData } from "./types";

interface SpellState {
  spellList: {
    loading: boolean;
    error: string | null;
    data: SpellListItemData[] | null;
  };
  spellByIndex: {
    loading: boolean;
    error: string | null;
    data: Spell | null;
  };
  favouriteSpellIndexes: string[];
}

const initialState: SpellState = {
  spellList: {
    loading: false,
    error: null,
    data: null,
  },
  spellByIndex: {
    loading: false,
    error: null,
    data: null,
  },
  favouriteSpellIndexes: [],
};

/**
 * Thunk to fetch all spells
 */
export const fetchAllSpellsAsync = createAsyncThunk<
  SpellListItemData[],
  void,
  { rejectValue: string }
>("spells/fetchAll", async (_params, thunkApi) => {
  try {
    const data = await fetchSpells();
    return data.results;
  } catch (error: any) {
    return thunkApi.rejectWithValue(`Failed to load spells. ${error?.message}`);
  }
});

/**
 * Thunk to fetch a spell by spell index
 */
export const fetchSpellByIndexAsync = createAsyncThunk<
  Spell,
  string,
  { rejectValue: string }
>("spells/fetchByIndex", async (spellIndex, thunkApi) => {
  try {
    const data = await fetchSpellByIndex(spellIndex);
    const spellObj = mapSpellDtoToSpell(data);
    return spellObj;
  } catch (error: any) {
    return thunkApi.rejectWithValue(`Failed to load spell. ${error?.message}`);
  }
});

/**
 * Loads spell favourites from the localstorage and set them
 * in the redux store
 */
export function loadSpellFavourites() {
  return (dispatch: AppDispatch) => {
    const favourites = localStorage.getItem("spell_favourites");
    if (favourites) {
      dispatch(spellSlice.actions.setFavourites(JSON.parse(favourites)));
    }
  };
}

/**
 * Mark a spell as favourite and save all the favourites from the redux state to the localstorage
 */
export function addFavouriteAndSave(spellIndex: string) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      spells: { favouriteSpellIndexes },
    } = getState();
    const updatedFavourtes = [...favouriteSpellIndexes, spellIndex];

    console.log("ss", favouriteSpellIndexes);
    localStorage.setItem("spell_favourites", JSON.stringify(updatedFavourtes));
    dispatch(spellActions.setFavourites(updatedFavourtes));
  };
}

/**
 * Mark a spell as non-favourite and save all the favourites from the redux state to the localstorage
 */
export function removeFavouriteAndSave(spellIndex: string) {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      spells: { favouriteSpellIndexes },
    } = getState();
    const updatedFavourtes = favouriteSpellIndexes.filter(
      (index) => index !== spellIndex
    );

    console.log("ss", favouriteSpellIndexes);
    localStorage.setItem("spell_favourites", JSON.stringify(updatedFavourtes));
    dispatch(spellActions.setFavourites(updatedFavourtes));
  };
}

export const spellSlice = createSlice({
  name: "spells",
  initialState,
  reducers: {
    resetSpellByIndex: (state) => {
      state.spellByIndex = initialState.spellByIndex;
    },
    setFavourites: (state, action: PayloadAction<string[]>) => {
      state.favouriteSpellIndexes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllSpellsAsync.pending, (state) => {
      state.spellList.loading = true;
    });

    builder.addCase(
      fetchAllSpellsAsync.fulfilled,
      (state, action: PayloadAction<SpellListItemData[]>) => {
        state.spellList = { ...initialState.spellList, data: action.payload };
      }
    );

    builder.addCase(
      fetchAllSpellsAsync.rejected,
      (state, action: PayloadAction<unknown, string>) => {
        state.spellList = {
          ...initialState.spellList,
          error: action.payload as string,
        };
      }
    );

    builder.addCase(fetchSpellByIndexAsync.pending, (state) => {
      state.spellByIndex.loading = true;
    });

    builder.addCase(
      fetchSpellByIndexAsync.fulfilled,
      (state, action: PayloadAction<Spell>) => {
        state.spellByIndex = {
          ...initialState.spellList,
          data: action.payload,
        };
      }
    );

    builder.addCase(
      fetchSpellByIndexAsync.rejected,
      (state, action: PayloadAction<unknown, string>) => {
        state.spellByIndex = {
          ...initialState.spellByIndex,
          error: action.payload as string,
        };
      }
    );
  },
});

export const spellActions = spellSlice.actions;

export default spellSlice.reducer;
