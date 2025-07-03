import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quarterOneGoals: [],
  quarterTwoGoals: [],
  quarterThreeGoals: [],
  quarterFourGoals: [],
};

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    setGoals: (state, action) => {
      const { quarter, goals } = action.payload;
      state[`${quarter}Goals`] = goals;
    },
    addGoal: (state, action) => {
      const { quarter, goal } = action.payload;
      const key = `${quarter}Goals`;

      if (!state[key]) {
        state[key] = [];
      }

      state[key].push(goal);
    },
    deleteGoal: (state, action) => {
      const { quarter, goalId } = action.payload;
      state[`${quarter}Goals`] = state[`${quarter}Goals`].filter(
        (g) => g.id !== goalId
      );
    },
    updateGoal: (state, action) => {
      const { quarter, goalId, updatedGoal } = action.payload;
      const index = state[`${quarter}Goals`].findIndex((g) => g.id === goalId);
      if (index !== -1) {
        state[`${quarter}Goals`][index] = updatedGoal;
      }
    },
  },
});

export const { setGoals, addGoal, deleteGoal, updateGoal } = goalSlice.actions;
export default goalSlice.reducer;
