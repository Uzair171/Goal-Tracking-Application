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
    <Accordion className="mb-4 border border-gray-200 rounded-lg shadow-sm">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="text-gray-600 h-5 w-5" />}
        className="hover:bg-gray-50 transition-colors duration-200 py-2"
      >
        <div className="flex justify-between items-center w-full">
          <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
          {isGoalCompleted && (
            <span className="text-sm text-green-600 font-medium">
              Completed
            </span>
          )}
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div className="bg-white p-4">
          <button
            onClick={() => onDeleteGoal(goal.id)}
            className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm mb-4"
          >
            Delete Goal
          </button>

          {totalCount > 0 && <ProgressBar progress={progress} />}

          <table className="w-full table-auto border border-gray-200 rounded-md mb-4 mt-3">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold">
                  Tactic
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold">
                  Notes
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="py-2 px-4 text-left text-sm font-semibold">
                  Actions
                </th>
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
            className="px-4 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm"
          >
            + Add Tactic
          </button>

          {addTacticErrorGoalId === goal.id && (
            <p className="text-sm text-red-600 mt-3">
              Please save the previous tactic before adding a new one.
            </p>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default GoalCard;
