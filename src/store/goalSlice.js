import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goalsByQuarter: {},
};

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGoals: (state, action) => {
      const { quarter, goals } = action.payload;
      state.goalsByQuarter[quarter] = [...goals];
    },
    addGoal: (state, action) => {
      const { quarter, goal } = action.payload;
      if (!state.goalsByQuarter[quarter]) {
        state.goalsByQuarter[quarter] = [];
      }
      state.goalsByQuarter[quarter].push(goal);
    },
    deleteGoal: (state, action) => {
      const { quarter, goalId } = action.payload;
      if (state.goalsByQuarter[quarter]) {
        state.goalsByQuarter[quarter] = state.goalsByQuarter[quarter].filter(
          (g) => g.id !== goalId
        );
      }
    },
    clearGoalsForQuarter: (state, action) => {
      const quarterId = action.payload;
      delete state.goalsByQuarter[quarterId];
    },
  },
});

export const { setGoals, addGoal, deleteGoal, clearGoalsForQuarter } =
  goalSlice.actions;
export default goalSlice.reducer;
