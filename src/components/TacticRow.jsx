// src/components/Goal/TacticRow.jsx
import React, { useState } from "react";

const TacticRow = ({
  tactic,
  goalId,
  onFieldChange,
  onBlurSave,
  onToggleComplete,
  onDeleteTactic,
  showError,
}) => {
  const [showModal, setShowModal] = useState(!tactic.tactic);
  const [localError, setLocalError] = useState(false);

  const handleEditClick = () => {
    if (!tactic.isCompleted) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLocalError(false);
  };

  const handleModalChange = (field, value) => {
    onFieldChange(goalId, tactic.id, field, value);
  };

  const handleModalSave = () => {
    if (!tactic.tactic.trim()) {
      setLocalError(true);
      return;
    }
    setLocalError(false);
    onBlurSave(goalId, tactic.id);
    setShowModal(false);
  };

  return (
    <>
      <tr
        className={`transition-all duration-300 ${
          tactic.isCompleted ? "bg-green-100" : "bg-white"
        }`}
      >
        <td className="p-2">
          <span
            onClick={handleEditClick}
            className={`cursor-pointer ${
              tactic.isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {tactic.tactic || "Untitled"}
          </span>
        </td>

        <td className="p-2">
          <span
            onClick={handleEditClick}
            className="cursor-pointer text-sm text-gray-700"
          >
            {tactic.notes || ""}
          </span>
        </td>

        <td className="p-2 text-sm text-gray-500">
          {tactic.isCompleted
            ? `Completed On: ${tactic.completedOn}`
            : tactic.updatedOn
            ? `Updated On: ${tactic.updatedOn}`
            : `Added On: ${tactic.addedOn}`}
        </td>

        <td className="p-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <button
              onClick={() => onToggleComplete(goalId, tactic.id)}
              aria-label="Toggle Complete"
              className={`px-3 py-1 rounded font-medium transition-all text-sm ${
                tactic.isCompleted
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {tactic.isCompleted ? "Undo" : "Complete"}
            </button>

            <button
              onClick={() => onDeleteTactic(goalId, tactic.id)}
              aria-label="Delete Tactic"
              className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white text-sm"
            >
              🗑 Delete
            </button>
          </div>
        </td>
      </tr>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">
              ✏️ {tactic.tactic ? "Edit Tactic" : "New Tactic"}
            </h3>
            <input
              type="text"
              value={tactic.tactic}
              onChange={(e) => handleModalChange("tactic", e.target.value)}
              placeholder="Enter tactic title"
              className="w-full border px-3 py-2 rounded mb-3"
              autoFocus
              required
            />
            {(showError || localError) && (
              <p className="text-sm text-red-500 mb-2">
                ⚠️ Tactic cannot be empty.
              </p>
            )}
            <input
              type="text"
              value={tactic.notes}
              onChange={(e) => handleModalChange("notes", e.target.value)}
              placeholder="Enter optional notes"
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TacticRow;
