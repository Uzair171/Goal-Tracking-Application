import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { setGoals } from "../store/goalSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const quarters = useSelector((state) => state.ui?.quarters || []);
  const goalsByQuarter = useSelector(
    (state) => state.goals?.goalsByQuarter || {}
  );

  const getStats = (goals) => {
    const totalGoals = goals.length;
    let completedGoals = 0;
    let incompleteGoals = 0;

    goals.forEach((goal) => {
      const totalTactics = goal.tactics.length;
      const completedTactics = goal.tactics.filter((t) => t.isCompleted).length;

      if (totalTactics > 0 && completedTactics === totalTactics) {
        completedGoals += 1;
      } else {
        incompleteGoals += 1;
      }
    });

    const progress =
      totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    return {
      totalGoals,
      completedGoals,
      incompleteGoals,
      progress,
    };
  };

  const handleClearAll = () => {
    if (window.confirm("⚠️ Are you sure you want to delete all goals?")) {
      Object.keys(goalsByQuarter).forEach((quarter) => {
        dispatch(setGoals({ quarter, goals: [] }));
      });
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          📊 Dashboard Overview
        </h1>
        {quarters.length > 0 && (
          <button
            onClick={handleClearAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            🗑 Clear All Goals
          </button>
        )}
      </div>

      {quarters.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 p-8 rounded-lg text-center shadow-md max-w-2xl mx-auto mt-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            🎯 Welcome to Goal Tracker!
          </h2>
          <p className="text-gray-700 text-lg mb-2">
            Start your journey by creating your first quarter.
          </p>
          <p className="text-gray-500 mb-6">
            Quarters help you organize goals and tactics for each part of the
            year.
          </p>
          <p className="text-gray-600 italic mb-4">
            👉 Use the{" "}
            <span className="font-semibold text-blue-600">“+ Add Quarter”</span>{" "}
            button in the left sidebar to get started.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/446/446049.png"
            alt="Empty State"
            className="w-24 h-24 mx-auto opacity-70"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quarters.map(({ label, path, id, startDate, endDate }) => {
            const stats = getStats(goalsByQuarter[id] || []);

            return (
              <Link
                key={path}
                to={path}
                className="border rounded-lg shadow p-5 hover:shadow-md transition-all bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">{label}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {startDate} to {endDate}
                </p>
                <ProgressBar progress={stats.progress} />
                <ul className="mt-3 text-sm text-gray-700 space-y-1">
                  <li>🎯 Total Goals: {stats.totalGoals}</li>
                  <li>✅ Completed Goals: {stats.completedGoals}</li>
                  <li>❌ Incomplete Goals: {stats.incompleteGoals}</li>
                </ul>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
