import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSpells } from "../../../api/spell";
import { SpellListItemData } from "../types";

interface SpellState {
  spellList: {
    loading: boolean;
    error: string | null;
    data: SpellListItemData[] | null;
  };
}

const initialState: SpellState = {
  spellList: {
    loading: false,
    error: null,
    data: null,
  },
};

/**
 * Fetch all spells
 */
export const fetchAllSpells = createAsyncThunk<
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

export const spellListSlice = createSlice({
  name: "spellList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSpells.pending, (state) => {
      state.spellList.loading = true;
    });

    builder.addCase(
      fetchAllSpells.fulfilled,
      (state, action: PayloadAction<SpellListItemData[]>) => {
        state.spellList = { ...initialState.spellList, data: action.payload };
      }
    );

    builder.addCase(
      fetchAllSpells.rejected,
      (state, action: PayloadAction<unknown, string>) => {
        state.spellList = {
          ...initialState.spellList,
          error: action.payload as string,
        };
      }
    );
  },
});

export default spellListSlice.reducer;
