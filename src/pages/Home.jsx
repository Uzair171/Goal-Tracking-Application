import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-50 border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          🎯 Goal Tracker
        </h1>
        <nav className="flex flex-col gap-4">
          <Link to="/quarter1" className="text-gray-700 hover:text-blue-600">
            📘 Quarter 1
          </Link>
          <Link to="/quarter2" className="text-gray-700 hover:text-blue-600">
            📙 Quarter 2
          </Link>
          <Link to="/quarter3" className="text-gray-700 hover:text-blue-600">
            📗 Quarter 3
          </Link>
          <Link to="/quarter4" className="text-gray-700 hover:text-blue-600">
            📕 Quarter 4
          </Link>
        </nav>
      </aside>

      <main className="w-3/4 p-10 bg-white overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
