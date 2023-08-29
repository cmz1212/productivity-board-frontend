import React from "react";
import { Routes, Route } from "react-router-dom";
import PostProj from "./Components/post_proj";
import Display from "./Components/display";
import EditProj from "./Components/edit_proj";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" key="home"  />
      <Route path="/display" element={<Display />} />
      <Route path="/post_project" element={<PostProj />} />
      <Route path="/edit_project" element={<EditProj />} />
    </Routes>
  );
}
