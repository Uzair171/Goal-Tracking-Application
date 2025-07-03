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
  const [showObstacleModal, setShowObstacleModal] = useState(false);
  const [newObstacle, setNewObstacle] = useState("");
  const [editObstacle, setEditObstacle] = useState(null);

  const handleEditClick = () => {
    if (!tactic.isCompleted) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    if (!tactic.tactic.trim()) {
      onDeleteTactic(goalId, tactic.id);
    }
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

  const handleAddObstacle = () => {
    if (!newObstacle.trim()) return;

    const updatedObstacles = [
      ...(tactic.obstacles || []),
      { id: Date.now(), text: newObstacle, isDone: false },
    ];

    onFieldChange(goalId, tactic.id, "obstacles", updatedObstacles);
    setNewObstacle("");
    setShowObstacleModal(false);
  };

  const handleEditObstacle = (obstacle, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!tactic.isCompleted) {
      setEditObstacle(obstacle);
      setNewObstacle(obstacle.text);
      setShowObstacleModal(true);
    }
  };

  const handleSaveObstacleEdit = () => {
    if (!newObstacle.trim()) return;

    const updatedObstacles = tactic.obstacles.map((obs) =>
      obs.id === editObstacle.id ? { ...obs, text: newObstacle } : obs
    );

    onFieldChange(goalId, tactic.id, "obstacles", updatedObstacles);
    setNewObstacle("");
    setEditObstacle(null);
    setShowObstacleModal(false);
  };

  const handleDeleteObstacle = (obstacleId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedObstacles = tactic.obstacles.filter(
      (obs) => obs.id !== obstacleId
    );
    onFieldChange(goalId, tactic.id, "obstacles", updatedObstacles);
  };

  const handleToggleObstacle = (obstacleId) => {
    const updatedObstacles = tactic.obstacles.map((obs) =>
      obs.id === obstacleId ? { ...obs, isDone: !obs.isDone } : obs
    );
    onFieldChange(goalId, tactic.id, "obstacles", updatedObstacles);
  };

  return (
    <>
      <tr
        className={`border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 ${
          tactic.isCompleted ? "bg-green-50" : "bg-white"
        }`}
      >
        <td className="py-2 px-4">
          <span
            onClick={handleEditClick}
            className={`cursor-pointer text-base font-medium ${
              tactic.isCompleted
                ? "line-through text-gray-500"
                : "text-gray-900"
            } hover:text-blue-600`}
          >
            {tactic.tactic || "Untitled"}
          </span>
        </td>

        <td className="py-2 px-4">
          <span
            onClick={handleEditClick}
            className="cursor-pointer text-base text-gray-600 hover:text-blue-600"
          >
            {tactic.notes || "Empty note"}
          </span>
        </td>

        <td className="py-2 px-4 text-sm text-gray-500">
          {tactic.isCompleted
            ? `Completed: ${tactic.completedOn}`
            : tactic.updatedOn
            ? `Updated: ${tactic.updatedOn}`
            : `Added: ${tactic.addedOn}`}
        </td>

        <td className="py-2 px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleComplete(goalId, tactic.id)}
              aria-label="Toggle Complete"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tactic.isCompleted
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {tactic.isCompleted ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => onDeleteTactic(goalId, tactic.id)}
              aria-label="Delete Tactic"
              className="px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {(tactic.obstacles || []).map((obs) => (
        <tr key={obs.id}>
          <td colSpan="4" className="pl-10 py-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={obs.isDone}
                disabled={tactic.isCompleted}
                onChange={() => handleToggleObstacle(obs.id)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <div className="flex items-center gap-2">
                <span
                  className={`text-base ${
                    obs.isDone
                      ? "line-through text-green-600"
                      : "text-gray-700 cursor-pointer"
                  }`}
                  onClick={(e) => handleEditObstacle(obs, e)}
                >
                  {obs.text}
                </span>
                {!tactic.isCompleted && (
                  <button
                    onClick={(e) => handleDeleteObstacle(obs.id, e)}
                    aria-label="Delete Obstacle"
                    className="px-1 py-0.5 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
                  >
                    🗑
                  </button>
                )}
              </div>
            </div>
          </td>
        </tr>
      ))}

      {/* Add Obstacle Option */}
      <tr>
        <td colSpan="4" className="pl-10 py-2 text-base">
          {tactic.isCompleted ? (
            <span className="text-gray-500 italic">Tactic completed</span>
          ) : (
            <span
              onClick={() => {
                setEditObstacle(null);
                setNewObstacle("");
                setShowObstacleModal(true);
              }}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              + Add Obstacle
            </span>
          )}
        </td>
      </tr>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              {tactic.tactic ? "Edit Tactic" : "New Tactic"}
            </h3>
            <input
              type="text"
              value={tactic.tactic}
              onChange={(e) => handleModalChange("tactic", e.target.value)}
              placeholder="Tactic title"
              className="w-full border border-gray-200 px-3 py-2 rounded-md text-base mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              required
            />
            {(showError || localError) && (
              <p className="text-sm text-red-600 mb-3">
                Tactic cannot be empty
              </p>
            )}
            <input
              type="text"
              value={tactic.notes}
              onChange={(e) => handleModalChange("notes", e.target.value)}
              placeholder="Optional notes"
              className="w-full border border-gray-200 px-3 py-2 rounded-md text-base mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-1.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="px-4 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showObstacleModal && (
        <div className="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              {editObstacle ? "Edit Obstacle" : "Add Obstacle"}
            </h3>
            <input
              type="text"
              value={newObstacle}
              onChange={(e) => setNewObstacle(e.target.value)}
              placeholder="Enter obstacle"
              className="w-full border border-gray-200 px-3 py-2 rounded-md text-base mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setNewObstacle("");
                  setEditObstacle(null);
                  setShowObstacleModal(false);
                }}
                className="px-4 py-1.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={
                  editObstacle ? handleSaveObstacleEdit : handleAddObstacle
                }
                className="px-4 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm"
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
