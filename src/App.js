import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import ProjPage from "./Pages/ProjPage";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

import PostProj from "./Components/Projects/PostProj";
import EditProj from "./Components/Projects/EditProj";

import User from "./Components/Users/AllUsers";
import CreateUser from "./Components/Users/CreateUser";

import DisplayTask from "./Components/Tasks/DisplayTasks";
import AddTasks from "./Components/Tasks/AddTasks";
import EditTask from "./Components/Tasks/EditTasks";

const projectIndexes = Array.from(Array(100).keys());

function App() {
  return (
    <>
      <Routes>

        <Route path="/projects" element={<ProjPage />} />
        <Route path="/projects/post_project" element={<PostProj />} />
        {projectIndexes.map((index) => (
          <Route
            key={index}
            path={`/projects/edit_project/${index}`}
            element={<EditProj proj_id={index} />}
          />
        ))}

        <Route path="/tasks" element={<DisplayTask />} />
        <Route path={`/tasks/add`} element={<AddTasks />} />
        {projectIndexes.map((index) => (
          <Route
            key={index}
            path={`/tasks/edit/${index}`}
            element={<EditTask task_id={index} />}
          />
        ))}

        <Route path="/users" element={<User />} />
        <Route path="/users/add" element={<CreateUser />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </>
  );
}

export default App;
