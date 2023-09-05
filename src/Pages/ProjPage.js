import "./ProjPage.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../constants";
import deleteProj from "../Components/Projects/delete_proj";


const Display = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const url = `${URL}/project`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="background">
      <button className="home-buttons">
        <Link to="/">Home</Link>
      </button>
      <button className="edit-buttons">
        <Link to="/projects/post_project">Add new project</Link>
      </button>
      <br />
      {projects ? (
        <div>
          {projects.map((project, index) => (
            <div key={index + 1} className="project-space">
              Project: {project.project_description}
              <br />
              <div>
                Project ID: {project.id}
                <br />
                WIP limit: {project.wip_limit}
                <br />
                Cycle time: {project.cycle_time_limit}
                <br />
                Comments: {project.project_comments}
                <br />
                <button className="edit-buttons">
                  <Link to={`/projects/edit_project/${project.id}`}>
                    Edit Project Details
                  </Link>
                </button>
                {"  "}
                <button
                  className="edit-buttons"
                  onClick={() => deleteProj(project.id)}
                >
                  Delete Project
                </button>
                <br />
                <button className="edit-buttons">
                  <Link to={`/tasks?proj_id=${project.id}`}>View Tasks</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <br />
    </div>
  );
};

export default Display;