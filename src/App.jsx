import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
