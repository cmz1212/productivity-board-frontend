import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../constants";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";
import DeleteProj from "../Components/Projects/DeleteProj";
import EditProj from "../Components/Projects/EditProj";
import PostProj from "../Components/Projects/PostProj";

export default function ProjPage() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [projects, setProjects] = useState([]);
  const userName = isAuthenticated ? user.name : null;
  const  userEmail = isAuthenticated ? user.email : null;
  const navigate = useNavigate();
  
  const navigateToViewTasks = (projectId) => {
      navigate(`/tasks?proj_id=${projectId}`);
    };

  const handleDeleteProject = async (projectId) => {
    await DeleteProj(projectId, getAccessTokenSilently); 
    fetchData();
  };

  // State variable to control the visibility of modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // State variable to store the currently edited project
  const [editingProject, setEditingProject] = useState(null);
  const [auth_id, setAuthID] = useState(null);

  const openEditModal = (project) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingProject(null);
    setIsEditModalOpen(false);
    if (isAuthenticated) {
      fetchData();
    }
  };

  const openPostModal = (auth_id) => {
    setAuthID(auth_id);
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setAuthID(null);
    setIsPostModalOpen(false);
    if (isAuthenticated) {
      fetchData();
    }
  };
  
  // eslint-disable-next-line
  const fetchData = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });

      const response = await fetch(`${URL}/project`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          userEmail: userEmail,
        },
      });

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  return (
    <div className="grid justify-items-center bg-white w-full overflow-y-auto">
      <Navbar isAuthenticated={isAuthenticated} userName={userName} />
      {isAuthenticated ? (
        <>
          <br />
          {projects.length > 0 ? (
            <div className="grid grid-cols-4 gap-3 h-620 mt-3 justify-items-start">
              {projects.map((project, index) => (
                <div key={index + 1} className="bg-sky-50 relative p-3 mr-2 w-290 h-290 border-2 border-sky-950 rounded-md text-md justify-items-start" style={{ cursor: 'pointer'}}>
                  <div onClick={() => navigateToViewTasks(project.id)}>
                      <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold"}}>
                        {project.project_description}
                      </div>
                      <br /><strong>Project ID:</strong> {project.id}
                      <br /><strong>WIP limit:</strong> {project.wip_limit} task{'('}s{')'}
                      <br /><strong>Cycle time:</strong> {project.cycle_time_limit} day{'('}s{')'}
                      <br /><div class="overflow-y-cust"><strong>Comments:</strong> {project.project_comments}</div>
                  </div>
                  <div className="absolute inset-x-2 bottom-3 text-center">
                    <button className="bg-gray-100 text-sm text-black font-bold p-1 border border-sky-950 rounded-md mr-1" onClick={() => openEditModal(project)}>Edit Project Details</button>
                    {"    "}
                    <button className="bg-fuchsia-100 text-sm text-black font-bold p-1 border border-sky-950 rounded-md" onClick={() => handleDeleteProject(project.id)}>Delete Project</button>
                    <br />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {Array(3).fill(<br />)}
          <button
            className="w-full max-w-7xl px-3 mt-2 mb-2 py-15 h-50 bg-sky-50 rounded-md text-xl font-bold text-center border-2 border-sky-950 hover:bg-sky-800"
            onClick={() => openPostModal(userEmail)}>
            Add New Project
          </button>

          {editingProject && (<EditProj editingProject={editingProject} fetchData={fetchData} isOpen={isEditModalOpen} onClose={closeEditModal}/>)}

          <PostProj auth_id={auth_id ? auth_id : null} fetchData={fetchData} isOpen={isPostModalOpen} onClose={closePostModal}/>

        </>
      ) : null}
      <Footer />
    </div>
  );
}