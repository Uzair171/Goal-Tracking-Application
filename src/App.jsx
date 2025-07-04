import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import Quarter from "./components/Quarter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="/quarter/:quarterId" element={<Quarter />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
