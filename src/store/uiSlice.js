import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quarters: [],
  visibleQuarters: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleQuarter: (state, action) => {
      const quarter = action.payload;
      if (state.visibleQuarters.includes(quarter)) {
        state.visibleQuarters = state.visibleQuarters.filter(
          (q) => q !== quarter
        );
      } else {
        state.visibleQuarters.push(quarter);
      }
    },
    addQuarter: (state, action) => {
      const newQuarter = action.payload;
      state.quarters.push(newQuarter);
      state.visibleQuarters.push(newQuarter.id);
    },
    deleteQuarter: (state, action) => {
      const quarterId = action.payload;
      state.quarters = state.quarters.filter((q) => q.id !== quarterId);
      state.visibleQuarters = state.visibleQuarters.filter(
        (id) => id !== quarterId
      );
    },
  },
});

export const { toggleQuarter, addQuarter, deleteQuarter } = uiSlice.actions;
export default uiSlice.reducer;
