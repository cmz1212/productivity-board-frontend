import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProjPage from "./Pages/ProjPage";
import Board from "./Pages/Board";
import AllUsers from "./Components/Users/AllUsers";
import ChooseUser from "./Components/Users/ChooseUser";
import CreateUser from "./Components/Users/CreateUser";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";

export default function App() {
  return (
    <>
      <Routes>
        {/* Projects */}
        <Route path="/projects" element={<ProjPage />} />
        
        {/* Tasks */}
        <Route path="/tasks" element={<Board />} />

        {/* Users */}
        <Route path="/users" element={<AllUsers />} />
        <Route path="/users/select" element={<ChooseUser />} />
        <Route path="/users/add" element={<CreateUser />} />

        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
