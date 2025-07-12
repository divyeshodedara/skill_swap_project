import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import Screen5 from "./components/Screen5";
import Screen4 from "./components/Screen4";
import Screen6 from "./components/Screen6";
import Screen1 from "./components/Screen1";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Pages */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/screen1" element={<Screen1 />} />
        <Route path="/screen4" element={<Screen4 />} />
        <Route path="/screen5" element={<Screen5 />} />
        <Route path="/screen6" element={<Screen6 />} />
      </Routes>
    </BrowserRouter>
  );
}