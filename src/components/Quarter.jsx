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
  const [goalDeadline, setGoalDeadline] = useState("");
  const [tacticErrors, setTacticErrors] = useState({});
  const [addTacticErrorGoalId, setAddTacticErrorGoalId] = useState(null);
  const [titleError, setTitleError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");

  const handleAddGoal = () => {
    setTitleError("");
    setDeadlineError("");
    let hasError = false;

    if (!newGoalTitle.trim()) {
      setTitleError("⚠️ Goal title cannot be empty.");
      hasError = true;
    }

    if (!goalDeadline) {
      setDeadlineError("⚠️ Deadline is required.");
      hasError = true;
    } else {
      const deadlineDate = new Date(goalDeadline);
      const start = new Date(quarter.startDate);
      const end = new Date(quarter.endDate);
      if (deadlineDate < start || deadlineDate > end) {
        setDeadlineError(
          `⚠️ Deadline must be between ${quarter.startDate} and ${quarter.endDate}`
        );
        hasError = true;
      }
    }

    if (hasError) return;

    const newGoal = {
      id: uuidv4(),
      title: newGoalTitle,
      tactics: [],
      isCompleted: false,
      completedOn: null,
      deadline: goalDeadline,
    };

    dispatch(addGoal({ quarter: quarterId, goal: newGoal }));
    setNewGoalTitle("");
    setGoalDeadline("");
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
            isCompleted: false,
            completedOn: null,
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
    const updatedGoals = goals.map((g) => {
      if (g.id === goalId) {
        const updatedTactics = g.tactics.filter((t) => t.id !== tacticId);
        const allCompleted = updatedTactics.every((t) => t.isCompleted);
        return {
          ...g,
          tactics: updatedTactics,
          isCompleted: allCompleted,
          completedOn: allCompleted ? new Date().toLocaleDateString() : null,
        };
      }
      return g;
    });

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
    const updatedGoals = goals.map((g) => {
      if (g.id === goalId) {
        const updatedTactics = g.tactics.map((t) =>
          t.id === tacticId
            ? {
                ...t,
                isCompleted: !t.isCompleted,
                completedOn: !t.isCompleted
                  ? new Date().toLocaleDateString()
                  : null,
              }
            : t
        );

        const allCompleted = updatedTactics.every((t) => t.isCompleted);

        return {
          ...g,
          tactics: updatedTactics,
          isCompleted: allCompleted,
          completedOn: allCompleted ? new Date().toLocaleDateString() : null,
        };
      }
      return g;
    });

    dispatch(setGoals({ quarter: quarterId, goals: updatedGoals }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        {quarter?.label || "Quarter"}
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        {quarter?.startDate && quarter?.endDate
          ? `${quarter.startDate} to ${quarter.endDate}`
          : ""}
      </p>

      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex flex-col flex-grow">
          <input
            type="text"
            value={newGoalTitle}
            onChange={(e) => {
              setNewGoalTitle(e.target.value);
              setTitleError("");
            }}
            placeholder="Enter new goal title"
            className={`border px-3 py-2 rounded-md ${
              titleError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {titleError && (
            <p className="text-sm text-red-600 mt-1">{titleError}</p>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="date"
            value={goalDeadline}
            onChange={(e) => {
              setGoalDeadline(e.target.value);
              setDeadlineError("");
            }}
            className={`border px-3 py-2 rounded-md ${
              deadlineError ? "border-red-500" : "border-gray-300"
            }`}
            max={quarter?.endDate}
            min={quarter?.startDate}
          />
          {deadlineError && (
            <p className="text-sm text-red-600 mt-1">{deadlineError}</p>
          )}
        </div>

        <button
          onClick={handleAddGoal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Goal
        </button>
      </div>

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
