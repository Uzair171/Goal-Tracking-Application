import React from "react";
import { Link, useLocation } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-1/4 bg-blue-50 border-r border-gray-200 p-6">
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
            {[
              { label: "📘 Quarter 1", path: "/quarter1" },
              { label: "📙 Quarter 2", path: "/quarter2" },
              { label: "📗 Quarter 3", path: "/quarter3" },
              { label: "📕 Quarter 4", path: "/quarter4" },
            ].map((q) => (
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
    </aside>
  );
};

export default Navbar;
