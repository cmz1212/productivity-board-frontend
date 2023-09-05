import { Link, useLocation, useNavigate } from "react-router-dom";
import { URL } from "./display";
import "./ProjPage.css";
import React, { useState, useEffect } from "react";

const DisplayProject = () => {
  const [project, setProject] = useState([]);
  const navigate = useNavigate();
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

  function deleteProj() {
    const confirmed = window.confirm("TODO: make this authenticated account only \nWARNING: Deletion is irreversible! \n Are you sure you want to delete this project?");
    
    if (confirmed) {
      const url = `${URL}/project/${id}`;
  
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {
          // Trigger navigation only when the deletion is confirmed
          navigate(`/projects/display`);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <div className="background">
      {project ? (
        <div className="project-space">
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
            <button className="edit-buttons">
              <Link to={`/projects/edit_project/${project.id}`}>
                Edit project
              </Link>
            </button >
            {"  "}
            <button className="edit-buttons" onClick={deleteProj}>Delete project</button>
            <br />
      <button className="edit-buttons">
      <Link to={`/tasks?proj_id=${project.id}`}>View/Add/Edit tasks</Link></button>
          </div>
        </div>
      ) : null}
      
      <br />
      <button className="back-buttons">
      <Link to="/projects/display">Back to project list</Link></button>
      <br />
      <button className="home-buttons">
      <Link to="/">Home</Link></button>
    </div>
  );
};
export default DisplayProject;
