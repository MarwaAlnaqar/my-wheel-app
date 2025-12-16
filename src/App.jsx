import wheelImg from "./assets/wheel.png";
import wheelbg from "./assets/bg.jpg";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from "./Pages/SignUp";
import PrizeWheel from "./Pages/PrizeWheel";
import Winners from "./Pages/Winners";


const NAMES = ["Marwa", "Omar", "Sara", "Lina", "Rami", "Nour"];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrizeWheel />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/winners" element={<Winners />} />
        {/* Other routes can be added here */}
      </Routes>
    </Router>
  );
}
