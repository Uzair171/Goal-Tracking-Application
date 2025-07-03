import React, { useState } from "react";

const GoalInput = ({ value, onChange, onSubmit }) => {
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!value.trim()) {
      setShowError(true);
    } else {
      setShowError(false);
      onSubmit();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          required
          type="text"
          value={value}
          onChange={(e) => {
            setShowError(false);
            onChange(e);
          }}
          placeholder="Enter new goal title"
          className={`flex-grow border px-3 py-2 rounded ${
            showError ? "border-red-500" : ""
          }`}
        />
        <button
          onClick={() => handleSubmit()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 whitespace-nowrap"
        >
          ➕ Add Goal
        </button>
      </div>
      {showError && (
        <p className="text-red-500 text-sm mt-1">
          ⚠️ Goal title cannot be empty.
        </p>
      )}
    </div>
  );
};

export default GoalInput;
