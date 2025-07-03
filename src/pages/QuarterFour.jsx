import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGoal, deleteGoal, setGoals } from "../store/goalSlice";

import GoalInput from "../components/GoalInput";
import GoalCard from "../components/GoalCard";
import ProgressBar from "../components/ProgressBar";

const QuarterFour = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals?.quarterFourGoals || []);

  const [newGoalName, setNewGoalName] = useState("");
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
  const overallProgress = totalTactics
    ? Math.round((completedTactics / totalTactics) * 100)
    : 0;

  const handleAddGoal = () => {
    if (newGoalName.trim() === "") return;
    const newGoal = {
      id: Date.now(),
      title: newGoalName,
      createdOn: new Date().toLocaleString(),
      tactics: [],
    };
    dispatch(addGoal({ quarter: "quarterFour", goal: newGoal }));
    setNewGoalName("");
  };

  const handleDeleteGoal = (goalId) => {
    dispatch(deleteGoal({ quarter: "quarterFour", goalId }));
  };

  const handleAddTactic = (goalId) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const last = goal.tactics[goal.tactics.length - 1];
        if (last && last.tactic.trim() === "") {
          setAddTacticErrorGoalId(goalId);
          return goal;
        }
        setAddTacticErrorGoalId(null);
        const newTactic = {
          id: Date.now(),
          tactic: "",
          notes: "",
          isCompleted: false,
          isEditing: true,
          addedOn: new Date().toLocaleString(),
          updatedOn: "",
          completedOn: "",
        };
        return { ...goal, tactics: [...goal.tactics, newTactic] };
      }
      return goal;
    });
    dispatch(setGoals({ quarter: "quarterFour", goals: updatedGoals }));
  };

  const handleDeleteTactic = (goalId, tacticId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId
        ? {
            ...goal,
            tactics: goal.tactics.filter((t) => t.id !== tacticId),
          }
        : goal
    );
    dispatch(setGoals({ quarter: "quarterFour", goals: updatedGoals }));
  };

  const handleFieldChange = (goalId, tacticId, field, value) => {
    if (field === "tactic" && tacticErrors[tacticId]) {
      setTacticErrors((prev) => {
        const updated = { ...prev };
        delete updated[tacticId];
        return updated;
      });
    }
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId
        ? {
            ...goal,
            tactics: goal.tactics.map((t) =>
              t.id === tacticId ? { ...t, [field]: value } : t
            ),
          }
        : goal
    );
    dispatch(setGoals({ quarter: "quarterFour", goals: updatedGoals }));
  };

  const handleBlurSave = (goalId, tacticId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId
        ? {
            ...goal,
            tactics: goal.tactics.map((t) =>
              t.id === tacticId
                ? {
                    ...t,
                    isEditing: false,
                    updatedOn:
                      !t.isCompleted && t.tactic.trim()
                        ? new Date().toLocaleString()
                        : t.updatedOn,
                  }
                : t
            ),
          }
        : goal
    );
    dispatch(setGoals({ quarter: "quarterFour", goals: updatedGoals }));

    const goal = goals.find((g) => g.id === goalId);
    const tactic = goal?.tactics.find((t) => t.id === tacticId);
    if (tactic?.tactic.trim() === "") {
      setTacticErrors((prev) => ({ ...prev, [tacticId]: true }));
    }
  };

  const toggleComplete = (goalId, tacticId) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === goalId
        ? {
            ...goal,
            tactics: goal.tactics.map((t) =>
              t.id === tacticId
                ? {
                    ...t,
                    isCompleted: !t.isCompleted,
                    completedOn: !t.isCompleted
                      ? new Date().toLocaleString()
                      : "",
                  }
                : t
            ),
          }
        : goal
    );
    dispatch(setGoals({ quarter: "quarterFour", goals: updatedGoals }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">
        📘 Quarter 2 Goals
      </h2>
      <p className="text-gray-600 text-base mb-4">
        Manage multiple goals with tactics, notes, and status tracking.
      </p>

      {totalTactics > 0 && (
        <div className="mb-6">
          <ProgressBar progress={overallProgress} />
        </div>
      )}

      <GoalInput
        value={newGoalName}
        onChange={(e) => setNewGoalName(e.target.value)}
        onSubmit={handleAddGoal}
      />
      {goals.length === 0 ? (
        <p className="text-center text-gray-500 text-sm mt-10 italic">
          ⚠️ No goals added yet.
        </p>
      ) : (
        goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onDeleteGoal={handleDeleteGoal}
            onAddTactic={handleAddTactic}
            onDeleteTactic={handleDeleteTactic}
            onFieldChange={handleFieldChange}
            onBlurSave={handleBlurSave}
            onToggleComplete={toggleComplete}
            tacticErrors={tacticErrors}
            addTacticErrorGoalId={addTacticErrorGoalId}
          />
        ))
      )}
    </div>
  );
};

export default QuarterFour;
