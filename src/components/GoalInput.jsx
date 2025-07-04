import React, { useState, useEffect } from "react";

const GoalInput = ({
  value,
  onChange,
  onSubmit,
  quarterStartDate,
  quarterEndDate,
}) => {
  const [showError, setShowError] = useState(false);
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    // Reset deadline if quarter changes
    setDeadline("");
  }, [quarterStartDate, quarterEndDate]);

  const handleSubmit = () => {
    if (!value.trim()) {
      setShowError(true);
    } else if (!deadline) {
      alert("Please set a deadline for the goal.");
    } else {
      setShowError(false);
      onSubmit(deadline);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-3 mb-2">
        <input
          required
          type="text"
          value={value}
          onChange={(e) => {
            setShowError(false);
            onChange(e);
          }}
          placeholder="Enter new goal title"
          className={`flex-grow border border-gray-200 px-4 py-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            showError ? "border-red-500" : ""
          }`}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          min={quarterStartDate}
          max={quarterEndDate}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 whitespace-nowrap"
        >
          Add Goal
        </button>
      </div>
      {showError && (
        <p className="text-red-600 text-sm mt-2">Goal title cannot be empty</p>
      )}
    </div>
  );
};

export default GoalInput;
