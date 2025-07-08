import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Quarter from "./components/Quarter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="/quarter/:quarterId" element={<Quarter />} />
        </Route>
        route
      </Routes>
    </Router>
  );
};

export default App;
