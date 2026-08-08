import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import Aside from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NewNote from "./pages/NewNote";
import ProtectedRoute from "./components/ProtectedRoute";
import Pinned from "./pages/Pinned";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-note" element={<NewNote />} />
          <Route path="/pinned" element={<Pinned />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
