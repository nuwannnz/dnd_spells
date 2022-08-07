import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSpellByIndex, fetchSpells } from "../../api/spell";
import { mapSpellDtoToSpell } from "../../helpers/spell";
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

export const spellSlice = createSlice({
  name: "spells",
  initialState,
  reducers: {
    resetSpellByIndex: (state) => {
      state.spellByIndex = initialState.spellByIndex;
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
