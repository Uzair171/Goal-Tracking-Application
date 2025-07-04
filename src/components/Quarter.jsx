import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import GoalInput from "./GoalInput";
import GoalCard from "./GoalCard";
import { setGoals, addGoal, deleteGoal } from "../store/goalSlice";

const Quarter = () => {
  const { quarterId } = useParams();
  const dispatch = useDispatch();
  const goals = useSelector(
    (state) => state.goals?.goalsByQuarter[quarterId] || []
  );
  const quarter = useSelector((state) =>
    state.ui?.quarters?.find((q) => q.id === quarterId)
  );

  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [tacticErrors, setTacticErrors] = useState({});
  const [addTacticErrorGoalId, setAddTacticErrorGoalId] = useState(null);

  const totalTactics = goals.reduce(
    (acc, goal) => acc + goal.tactics.length,
    0
  );
  const completedTactics = goals.reduce(
    (acc, goal) => acc + goal.tactics.filter((t) => t.isCompleted).length,
    0
  );
  const progress =
    totalTactics === 0
      ? 0
      : Math.round((completedTactics / totalTactics) * 100);

  const handleAddGoal = () => {
    if (!newGoalTitle.trim()) {
      alert("Goal title cannot be empty");
      return;
    }
    const newGoal = {
      id: uuidv4(),
      title: newGoalTitle,
      tactics: [],
    };
    dispatch(addGoal({ quarter: quarterId, goal: newGoal }));
    setNewGoalTitle("");
  };

  const handleAddTactic = (goalId) => {
    const goal = goals.find((g) => g.id === goalId);
    const hasUnsavedTactic = goal.tactics.some((t) => !t.tactic.trim());
    if (hasUnsavedTactic) {
      setAddTacticErrorGoalId(goalId);
      return;
    }
    setAddTacticErrorGoalId(null);
    const updatedGoals = goals.map((g) =>
      g.id === goalId
        ? {
            ...g,
            tactics: [
              ...g.tactics,
              {
                id: uuidv4(),
                tactic: "",
                notes: "",
                obstacles: [],
                isCompleted: false,
                addedOn: new Date().toLocaleDateString(),
              },
            ],
          }
        : g
    );
    dispatch(setGoals({ quarter: quarterId, goals: updatedGoals }));
  };

  const handleDeleteGoal = (goalId) => {
    dispatch(deleteGoal({ quarter: quarterId, goalId }));
  };

  const handleDeleteTactic = (goalId, tacticId) => {
    const updatedGoals = goals.map((g) =>
      g.id === goalId
        ? { ...g, tactics: g.tactics.filter((t) => t.id !== tacticId) }
        : g
    );
    dispatch(setGoals({ quarter: quarterId, goals: updatedGoals }));
    setTacticErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[tacticId];
      return newErrors;
    });
  };

  const handleFieldChange = (goalId, tacticId, field, value) => {
    const updatedGoals = goals.map((g) =>
      g.id === goalId
        ? {
            ...g,
            tactics: g.tactics.map((t) =>
              t.id === tacticId ? { ...t, [field]: value } : t
            ),
          }
        : g
    );
    dispatch(setGoals({ quarter: quarterId, goals: updatedGoals }));
  };

  const handleBlurSave = (goalId, tacticId) => {
    const goal = goals.find((g) => g.id === goalId);
    const tactic = goal.tactics.find((t) => t.id === tacticId);
    if (!tactic.tactic.trim()) {
      setTacticErrors((prev) => ({ ...prev, [tacticId]: true }));
      return;
    }
    setTacticErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[tacticId];
      return newErrors;
    });
    const updatedGoals = goals.map((g) =>
      g.id === goalId
        ? {
            ...g,
            tactics: g.tactics.map((t) =>
              t.id === tacticId
                ? { ...t, updatedOn: new Date().toLocaleDateString() }
                : t
            ),
          }
        : g
    );
    dispatch(setGoals({ quarter: quarterId, goals: updatedGoals }));
  };

  const handleToggleComplete = (goalId, tacticId) => {
    const updatedGoals = goals.map((g) =>
      g.id === goalId
        ? {
            ...g,
            tactics: g.tactics.map((t) =>
              t.id === tacticId
                ? {
                    ...t,
                    isCompleted: !t.isCompleted,
                    completedOn: !t.isCompleted
                      ? new Date().toLocaleDateString()
                      : null,
                  }
                : t
            ),
          }
        : g
    );
    dispatch(setGoals({ quarter: quarterId, goals: updatedGoals }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        {quarter?.label || "Quarter"}
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        {quarter?.startDate && quarter?.endDate
          ? `${quarter.startDate} to ${quarter.endDate}`
          : ""}
      </p>

      {totalTactics > 0 && (
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-blue-700">
              Overall Progress (Tactics Based)
            </span>
            <span className="text-sm font-medium text-blue-700">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <GoalInput
        value={newGoalTitle}
        onChange={(e) => setNewGoalTitle(e.target.value)}
        onSubmit={handleAddGoal}
      />
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDeleteGoal={handleDeleteGoal}
          onAddTactic={handleAddTactic}
          onDeleteTactic={handleDeleteTactic}
          onFieldChange={handleFieldChange}
          onBlurSave={handleBlurSave}
          onToggleComplete={handleToggleComplete}
          tacticErrors={tacticErrors}
          addTacticErrorGoalId={addTacticErrorGoalId}
        />
      ))}
    </div>
  );
};

export default Quarter;
