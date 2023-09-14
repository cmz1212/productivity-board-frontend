import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import ProjPage from "./Pages/ProjPage";
import PostProj from "./Components/Projects/PostProj";
import EditProj from "./Components/Projects/EditProj";

import Board from "./Pages/Board";
import AddTasks from "./Components/Tasks/AddTasks";
import EditTask from "./Components/Tasks/EditTasks";

import AllUsers from "./Components/Users/AllUsers";
import ChooseUser from "./Components/Users/ChooseUser";
import CreateUser from "./Components/Users/CreateUser";

import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";

const projectIndexes = Array.from(Array(100).keys());

function App() {
  return (
    <>
      <Routes>
        {/* Projects */}
        <Route path="/projects" element={<ProjPage />} />
        <Route path="/projects/post_project" element={<PostProj />} />
        {projectIndexes.map((index) => (
          <Route
            key={index}
            path={`/projects/edit_project/${index}`}
            element={<EditProj proj_id={index} />}
          />
        ))}

        {/* Tasks */}
        <Route path="/tasks" element={<Board />} />
        <Route path={`/tasks/add`} element={<AddTasks />} />
        {projectIndexes.map((index) => (
          <Route
            key={index}
            path={`/tasks/edit/${index}`}
            element={<EditTask task_id={index} />}
          />
        ))}

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

export default App;
