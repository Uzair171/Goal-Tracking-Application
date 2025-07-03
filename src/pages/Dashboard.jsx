import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { setGoals } from "../store/goalSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    quarterOneGoals,
    quarterTwoGoals,
    quarterThreeGoals,
    quarterFourGoals,
  } = useSelector((state) => state.goals);

  const quarterData = [
    {
      title: "📘 Quarter 1",
      goals: quarterOneGoals,
      path: "/quarter1",
    },
    {
      title: "📙 Quarter 2",
      goals: quarterTwoGoals,
      path: "/quarter2",
    },
    {
      title: "📗 Quarter 3",
      goals: quarterThreeGoals,
      path: "/quarter3",
    },
    {
      title: "📕 Quarter 4",
      goals: quarterFourGoals,
      path: "/quarter4",
    },
  ];

  const getStats = (goals) => {
    const totalGoals = goals.length;
    const totalTactics = goals.reduce(
      (sum, goal) => sum + goal.tactics.length,
      0
    );
    const completedTactics = goals.reduce(
      (sum, goal) => sum + goal.tactics.filter((t) => t.isCompleted).length,
      0
    );
    const progress =
      totalTactics > 0
        ? Math.round((completedTactics / totalTactics) * 100)
        : 0;

    return {
      totalGoals,
      totalTactics,
      completedTactics,
      incompleteTactics: totalTactics - completedTactics,
      progress,
    };
  };

  const handleClearAll = () => {
    if (window.confirm("⚠️ Are you sure you want to delete all goals?")) {
      ["quarterOne", "quarterTwo", "quarterThree", "quarterFour"].forEach(
        (q) => {
          dispatch(setGoals({ quarter: q, goals: [] }));
        }
      );
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          📊 Dashboard Overview
        </h1>
        <button
          onClick={handleClearAll}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
        >
          🗑 Clear All Goals
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quarterData.map(({ title, goals, path }) => {
          const stats = getStats(goals);

          return (
            <Link
              key={path}
              to={path}
              className="border rounded-lg shadow p-5 hover:shadow-md transition-all bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <ProgressBar progress={stats.progress} />
              <ul className="mt-3 text-sm text-gray-700 space-y-1">
                <li>🎯 Goals: {stats.totalGoals}</li>
                <li>✅ Completed Tactics: {stats.completedTactics}</li>
                <li>❌ Incomplete Tactics: {stats.incompleteTactics}</li>
              </ul>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
