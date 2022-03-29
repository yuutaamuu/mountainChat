import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type MOUNTAIN = {
  id: number;
  name: string;
  nameKana: string;
  area: string;
  prefectures: string[];
  elevation: number;
  location: {
    latitude: number;
    longitude: number;
    gsiUrl: string;
  };
  tags: string[];
};

type MOUNTAINS = {
  mountain?: MOUNTAIN[];
};

const initialState: MOUNTAINS = {
  mountain: undefined,
};

export const mountainSlice = createSlice({
  name: "mountain",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.mountain = action.payload;
    },
  },
});

export const { getData } = mountainSlice.actions;

export const selectmountain = (state: RootState) => state.mountain.mountain;

export default mountainSlice.reducer;
