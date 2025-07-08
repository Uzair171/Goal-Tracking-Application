import TacticRow from "./TacticRow";
import ProgressBar from "./ProgressBar";

const GoalCard = ({
  goal,
  onDeleteGoal,
  onAddTactic,
  onDeleteTactic,
  onFieldChange,
  onBlurSave,
  onToggleComplete,
  tacticErrors,
  addTacticErrorGoalId,
}) => {
  const completedCount = goal.tactics.filter((t) => t.isCompleted).length;
  const progress =
    goal.tactics.length > 0
      ? Math.round((completedCount / goal.tactics.length) * 100)
      : 0;

  const isDeadlineExceeded =
    goal.deadline && !goal.isCompleted && new Date(goal.deadline) < new Date();

  return (
    <div className="border rounded-lg shadow-md mb-6 p-5 bg-white">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-xl font-bold text-blue-700">{goal.title}</h2>

          {goal.deadline && !goal.isCompleted && (
            <p
              className={`text-sm mt-1 ${
                isDeadlineExceeded
                  ? "text-red-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              Deadline: {goal.deadline}
              {isDeadlineExceeded && (
                <span className="ml-2">⚠️ Deadline Exceeded</span>
              )}
            </p>
          )}

          {goal.isCompleted && goal.completedOn && goal.tactics.length > 0 && (
            <p className="text-green-600 font-semibold text-sm mt-1">
              ✅ Goal was completed on {goal.completedOn}
            </p>
          )}
        </div>

        <button
          onClick={() => onDeleteGoal(goal.id)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
        >
          🗑 Delete Goal
        </button>
      </div>

      {goal.tactics.length > 0 ? <ProgressBar progress={progress} /> : null}

      {goal.tactics.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-700">
            Tactics
          </h3>

          {/* Clean Table Header */}
          <div className="grid grid-cols-4 gap-4 font-medium text-gray-700 text-sm px-4 py-3 border-b-2 border-gray-200">
            <div className="text-left">Title</div>
            <div className="text-left">Notes</div>
            <div className="text-left">Status</div>
            <div className="text-left">Actions</div>
          </div>
        </>
      )}

      {/* Tactics list with clean styling */}
      <div className="border border-gray-200 rounded-b-md">
        {goal.tactics.map((tactic, index) => (
          <div
            key={tactic.id}
            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
              index === goal.tactics.length - 1
                ? ""
                : "border-b border-gray-100"
            }`}
          >
            <TacticRow
              goalId={goal.id}
              tactic={tactic}
              onDeleteTactic={() => onDeleteTactic(goal.id, tactic.id)}
              onFieldChange={onFieldChange}
              onBlurSave={onBlurSave}
              onToggleComplete={onToggleComplete}
              showError={tacticErrors[tactic.id]}
            />
          </div>
        ))}
      </div>

      {addTacticErrorGoalId === goal.id && (
        <p className="text-sm text-red-600 mt-2">
          Please complete the existing tactic before adding a new one.
        </p>
      )}

      <div className="mt-4">
        <button
          onClick={() => onAddTactic(goal.id)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Add Tactic
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
