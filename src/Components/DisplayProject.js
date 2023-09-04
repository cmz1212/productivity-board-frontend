import { Link, useLocation } from "react-router-dom";
import { URL } from "./display";

import React, { useState, useEffect } from "react";

const DisplayProject = () => {
  const [project, setProject] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/project/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setProject(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [id]); // Include 'id' in the dependency array

  return (
    <div>
      {project ? (
        <div>
          <div>
            Project ID: {project.id}
            <br />
            Description: {project.project_description}
            <br />
            WIP limit: {project.wip_limit}
            <br />
            Cycle time: {project.cycle_time_limit}
            <br />
            Comments: {project.project_comments}
            <br />
            <button>
              <Link to={`/projects/edit_project/${project.id}`}>
                Edit project
              </Link>
              {"  "}
              <Link>Delete project</Link>
            </button>
          </div>
        </div>
      ) : null}
      <br />
      <Link>View/Add/Edit tasks</Link>
      <br />
      <Link to="/projects/display">Back to project list</Link>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
};
export default DisplayProject;
