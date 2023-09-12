import React, { useState, useEffect } from "react";
import "./ProjPage.css";
import { useNavigate } from "react-router-dom";
import { URL } from "../constants";
import Navbar from './Navbar';
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteProj from "../Components/Projects/DeleteProj";
import EditProj from "../Components/Projects/EditProj"; 
import PostProj from "../Components/Projects/PostProj";


function ProjPage () {
  const { isAuthenticated, getAccessTokenSilently, user} = useAuth0();
  const [projects, setProjects] = useState([]);
  const userName = isAuthenticated ? user.name : null;
  const userEmail = isAuthenticated ? user.email : null;

  // State variable to control the visibility of the EditProj modal
  // State variable to control the visibility of the PostProj modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // State variable to store the currently edited project
  const [editingProject, setEditingProject] = useState(null);
  const [auth_id, setAuthID] = useState(null);

  // Function to open the EditProj modal
  const openEditModal = (project) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  // Function to close the EditProj modal
  const closeEditModal = () => {
    setEditingProject(null);
    setIsEditModalOpen(false);

  }

  // Function to open the PostProj modal
  const openPostModal = (auth_id) => {
    setAuthID(auth_id);
    setIsPostModalOpen(true);
  };

  // Function to close the PostProj modal
  const closePostModal = () => {
    setAuthID(null);
    setIsPostModalOpen(false);
  };

  // Use the useNavigate hook to programmatically navigate
  const navigate = useNavigate();

  // Function to navigate to the "View Tasks" page for a specific project
  const navigateToViewTasks = (projectId) => {
    navigate(`/tasks?proj_id=${projectId}`);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const url = `${URL}/project`;
        
        try {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_API_AUDIENCE,
            scope: "write:project",
          })

          const response = await fetch(url,
            {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
            
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
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div className="grid justify-items-center bg-sky-950 w-full ">
      <Navbar isAuthenticated={isAuthenticated} userName={userName} />
      {isAuthenticated ? (
        <>
          <br />
          { projects ? (
            <div>
              {projects.map((project, index) => (
                <div
                  key={index + 1}
                  className="project-space"
                  style={{ cursor: "pointer" }}
                >
                  <div onClick={() => navigateToViewTasks(project.id)}>
                    <div>
                      Project: {project.project_description}
                      <br />
                      Project ID: {project.id}
                      <br />
                      WIP limit: {project.wip_limit}
                      <br />
                      Cycle time: {project.cycle_time_limit}
                      <br />
                      Comments: {project.project_comments}
                      <br />
                    </div>
                  </div>
                  {Array(2).fill(<br />)}
                  <div>
                    <button className="edit-buttons" onClick={() => openEditModal(project)}>
                      Edit Project Details
                    </button>
                    {"  "}
                    <button
                      className="edit-buttons"
                      onClick={() => DeleteProj(project.id)}
                    >
                      Delete Project
                    </button>
                    <br />
                  </div>

                </div>
              ))}
              
            </div>
          ) : null}
          <br />
           <button className="py-2 px-4 bg-sky-200 hover:bg-white focus:bg-white rounded-lg font-bold" onClick={() => openPostModal(userEmail)}>
            Add New Project
          </button>

          <EditProj
            proj_id={editingProject ? editingProject.id : null}
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
          />
          <PostProj
            auth_id={auth_id ? auth_id : null}
            isOpen={isPostModalOpen}
            onClose={closePostModal}
          />
        </>
      ) : null }
      <Footer />
    </div>
  );
};

export default ProjPage;