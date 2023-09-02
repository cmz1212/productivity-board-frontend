import React from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Display from "./components/display";
import PostProj from "./components/post_proj";
import EditProj from "./components/edit_proj";

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

<<<<<<< HEAD
function NavigationLinks() {
  const location = useLocation();

  // Render the links only on the homepage ("/")
  if (location.pathname === "/") {
    return (
      <div>
        <Link to="/display">Project data display</Link>
        <br />
        <Link to="/post_project">Add new project</Link>
        <br />
        <Link to="/edit_project">Edit existing project</Link>
        <br /> <Link to="/tasks">Tasks </Link>
        <br /> <Link to="/users">Users</Link>
      </div>
    );
  }

  return null; // Render nothing on other pages
}

export default App;
=======
export default App;
>>>>>>> e43918c19a861d3ba9b2e1200fa1f7b51fa96e84
