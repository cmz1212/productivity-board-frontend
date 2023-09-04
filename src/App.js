import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Projects from "./Pages/Projects";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn";

import Display from "./Components/display";
import PostProj from "./Components/post_proj";
import EditProj from "./Components/edit_proj";
import User from "./Components/users";
import Task from "./Components/tasks"; 

const projectIndexes = Array.from(Array(100).keys());

function App() {
  return (
    <>
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/display" element={<Display />} />
        <Route path="/projects/post_project" element={<PostProj />} />
        {projectIndexes.map((index) => (
          <Route
            path={`/projects/edit_project/${index}`}
            element={<EditProj proj_id={index} />}
          />
        ))}

        <Route path="/tasks" element={<Task />} />
        <Route path="/users" element={<User />} />
        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </>
  );
}

export default App;