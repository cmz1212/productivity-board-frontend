import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Display from "./Components/display";
import PostProj from "./Components/post_proj";
import EditProj from "./Components/edit_proj";

function App() {
  return (
    <>
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/display" element={<Display />} />
        <Route path="/projects/post_project" element={<PostProj />} />
        <Route path="/projects/edit_project" element={<EditProj />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
