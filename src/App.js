import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./frontend/admin/Admin.js";
import Client from "./frontend/client/Client.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admindashboard" element={<Admin />} />
        <Route path="/*" element={<Client />} />
      </Routes>
    </Router>
  );
}

export default App;
