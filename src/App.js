import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import ProcessPage from "./pages/ProcessPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/process" element={<ProcessPage />} />
      </Routes>
    </Router>
  );
}

export default App;