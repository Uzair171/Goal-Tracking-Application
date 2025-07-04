import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setGoals } from "../store/goalSlice";
import { addQuarter, deleteQuarter } from "../store/uiSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const quarters = useSelector((state) => state.ui?.quarters || []);
  const visibleQuarters = useSelector(
    (state) => state.ui?.visibleQuarters || []
  );

  const [showModal, setShowModal] = useState(false);
  const [quarterName, setQuarterName] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedQuarter, setSelectedQuarter] = useState("1");

  const years = Array.from({ length: 50 }, (_, i) => 2025 + i);
  const quarterOptions = [
    { value: "1", label: "Q1 (Jan-Mar)" },
    { value: "2", label: "Q2 (Apr-Jun)" },
    { value: "3", label: "Q3 (Jul-Sep)" },
    { value: "4", label: "Q4 (Oct-Dec)" },
  ];

  const isActive = (path) => location.pathname === path;

  const getQuarterDates = (quarter, year) => {
    const quarterStartMonths = { 1: 1, 2: 4, 3: 7, 4: 10 };
    const quarterEndMonths = { 1: 3, 2: 6, 3: 9, 4: 12 };
    const startMonth = quarterStartMonths[quarter];
    const endMonth = quarterEndMonths[quarter];
    const startDate = `${year}-${startMonth.toString().padStart(2, "0")}-01`;
    const endDate = new Date(year, endMonth, 0).toISOString().split("T")[0];
    return { startDate, endDate };
  };

  const handleAddQuarter = () => {
    if (!quarterName.trim()) {
      alert("Quarter name cannot be empty");
      return;
    }
    if (quarters.some((q) => q.label === quarterName)) {
      alert("Quarter name already exists");
      return;
    }
    const id = `quarter${Date.now()}`;
    const path = `/quarter/${id}`;
    const { startDate, endDate } = getQuarterDates(
      selectedQuarter,
      selectedYear
    );
    dispatch(addQuarter({ label: quarterName, path, id, startDate, endDate }));
    dispatch(setGoals({ quarter: id, goals: [] }));
    setShowModal(false);
    setQuarterName("");
    setSelectedYear("2025");
    setSelectedQuarter("1");
  };

  const handleQuarterChange = (quarter) => {
    setSelectedQuarter(quarter);
    setQuarterName(`Q${quarter} ${selectedYear}`);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setQuarterName(`Q${selectedQuarter} ${year}`);
  };

  const handleDeleteQuarter = (id) => {
    if (confirm("Are you sure you want to delete this quarter?")) {
      dispatch(deleteQuarter(id));
    }
  };

  // ✅ Redirect to dashboard if all quarters are deleted
  useEffect(() => {
    if (quarters.length === 0) {
      navigate("/");
    }
  }, [quarters, navigate]);

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

      <button
        onClick={() => {
          setQuarterName(`Q${selectedQuarter} ${selectedYear}`);
          setShowModal(true);
        }}
        className="w-full mb-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm text-left"
      >
        + Add Quarter
      </button>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="text-blue-700 font-semibold text-lg">
            📅 Quarters
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <nav className="flex flex-col gap-3">
            {quarters
              .filter((q) => visibleQuarters.includes(q.id))
              .map((q) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between group"
                >
                  <Link
                    to={q.path}
                    className={`px-4 py-2 rounded-l-full font-medium transition-all flex-1 ${
                      isActive(q.path)
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                    }`}
                  >
                    {q.label}
                  </Link>
                  <button
                    onClick={() => handleDeleteQuarter(q.id)}
                    className="text-red-400 hover:text-red-600 ml-2 text-sm invisible group-hover:visible"
                  >
                    ✕
                  </button>
                </div>
              ))}
          </nav>
        </AccordionDetails>
      </Accordion>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Add New Quarter
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quarter Name
              </label>
              <input
                type="text"
                value={quarterName}
                onChange={(e) => setQuarterName(e.target.value)}
                placeholder="e.g., Q1 2025"
                className="w-full border border-gray-200 px-3 py-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quarter
              </label>
              <select
                value={selectedQuarter}
                onChange={(e) => handleQuarterChange(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {quarterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setQuarterName("");
                  setSelectedYear("2025");
                  setSelectedQuarter("1");
                }}
                className="px-4 py-1.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuarter}
                className="px-4 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Navbar;
