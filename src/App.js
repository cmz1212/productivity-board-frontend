import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProjPage from "./Pages/ProjPage";
import Board from "./Pages/Board";
import NotFound from "./Pages/NotFound";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjPage />} />
        <Route path="/tasks" element={<Board />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}