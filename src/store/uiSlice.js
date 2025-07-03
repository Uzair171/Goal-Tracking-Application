import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleQuarters: ["quarter1", "quarter2", "quarter3", "quarter4"],
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
  },
});

export const { toggleQuarter } = uiSlice.actions;
export default uiSlice.reducer;
