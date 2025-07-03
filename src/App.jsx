import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import QuarterOne from "./pages/QuarterOne";
import QuarterTwo from "./pages/QuarterTwo";
import QuarterThree from "./pages/QuarterThree";
import QuarterFour from "./pages/QuarterFour";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="quarter1" element={<QuarterOne />} />
          <Route path="quarter2" element={<QuarterTwo />} />
          <Route path="quarter3" element={<QuarterThree />} />
          <Route path="quarter4" element={<QuarterFour />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
