import TacticRow from "./TacticRow";
import ProgressBar from "./ProgressBar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const totalCount = goal.tactics.length;
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const isGoalCompleted = totalCount > 0 && completedCount === totalCount;

  return (
    <Accordion className="mb-4">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className="flex justify-between items-center w-full">
          <h3 className="text-lg font-semibold text-blue-600">
            📌 {goal.title}
          </h3>
          {isGoalCompleted && (
            <span className="text-sm text-green-600 font-medium">
              ✅ Completed
            </span>
          )}
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div className=" bg-white p-4 rounded shadow">
          <button
            onClick={() => onDeleteGoal(goal.id)}
            className="  text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 "
          >
            🗑 Delete Goal
          </button>

          {totalCount > 0 && <ProgressBar progress={progress} />}

          <table className="w-full table-auto border border-gray-300 rounded overflow-hidden shadow-sm mb-4 mt-2">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="p-2 text-left">Tactic</th>
                <th className="p-2 text-left">Notes</th>
                <th className="p-2 text-left">Status Time</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goal.tactics.map((tactic) => (
                <TacticRow
                  key={tactic.id}
                  tactic={tactic}
                  goalId={goal.id}
                  onFieldChange={onFieldChange}
                  onBlurSave={onBlurSave}
                  onToggleComplete={onToggleComplete}
                  onDeleteTactic={onDeleteTactic}
                  showError={tacticErrors[tactic.id]}
                />
              ))}
            </tbody>
          </table>

          <button
            onClick={() => onAddTactic(goal.id)}
            className="mt-2 px-4 py-2 rounded transition-all text-white bg-blue-500 hover:bg-blue-600"
          >
            ➕ Add Tactic
          </button>

          {addTacticErrorGoalId === goal.id && (
            <p className="text-sm text-red-500 mt-2">
              ⚠️ Please Enter the previous tactic before adding a new one.
            </p>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default GoalCard;
