import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Client from "./frontend/client/Client.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Client />} />
      </Routes>
    </Router>
  );
}

export default App;
