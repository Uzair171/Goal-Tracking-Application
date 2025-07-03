import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleQuarter } from "../store/uiSlice";
import { Link, useLocation } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const allQuarters = [
  { label: "📘 Quarter 1", path: "/quarter1", id: "quarter1" },
  { label: "📙 Quarter 2", path: "/quarter2", id: "quarter2" },
  { label: "📗 Quarter 3", path: "/quarter3", id: "quarter3" },
  { label: "📕 Quarter 4", path: "/quarter4", id: "quarter4" },
];

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const visibleQuarters = useSelector((state) => state.ui.visibleQuarters);
  const [showModal, setShowModal] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleToggleQuarter = (id) => {
    dispatch(toggleQuarter(id));
  };

  return (
    <aside className="w-1/4 bg-blue-50 border-r border-gray-200 p-6 relative">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">🎯 Goal Tracker</h1>

      <Link
        to="/"
        className={`block mb-4 px-4 py-2 rounded-l-full font-medium transition-all ${
          isActive("/") || isActive("/dashboard")
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
        }`}
      >
        📊 Dashboard
      </Link>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="text-blue-700 font-semibold text-lg">
            📅 Quarters
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <nav className="flex flex-col gap-3">
            {allQuarters
              .filter((q) => visibleQuarters.includes(q.id))
              .map((q) => (
                <Link
                  key={q.path}
                  to={q.path}
                  className={`px-4 py-2 rounded-l-full font-medium transition-all ${
                    isActive(q.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  {q.label}
                </Link>
              ))}
          </nav>
        </AccordionDetails>
      </Accordion>

      <button
        onClick={() => setShowModal(true)}
        className="mt-6 text-sm text-blue-600 underline"
      >
        ⚙️ Configure Quarters
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-blue-600">
              Select Visible Quarters
            </h3>
            <div className="space-y-3">
              {allQuarters.map((q) => (
                <label key={q.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={visibleQuarters.includes(q.id)}
                    onChange={() => handleToggleQuarter(q.id)}
                  />
                  <span>{q.label}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Navbar;
