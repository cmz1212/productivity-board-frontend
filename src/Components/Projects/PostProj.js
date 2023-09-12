import React, { useState } from "react";
import "../../Pages/ProjPage.css";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";

export default function PostProj(props) {
  const { auth_id, isOpen, onClose } = props;

  const { getAccessTokenSilently } = useAuth0();

  const [project, setProject] = useState({
    description: null,
    wip: null,
    cycle_time: null,
    comment: null,
    auth_id: null,
  });

  const navigate = useNavigate();

  async function sendPostRequest() {
    const url = `${URL}/project`;
    
    try {
      if (!project.description) {
        alert("Project description cannot be empty");
        return;
      }
      
      const requestData = {
        project_description: project.description,
        wip_limit: project.wip,
        cycle_time_limit: project.cycle_time,
        project_comments: project.comment,
        auth_id: auth_id
      };
  
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
        scope: "write:project",
      });
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      setProject({
        description: null,
        wip: null,
        cycle_time: null,
        comment: null,
        auth_id: null,
      });
  
      navigate(`/projects`);

    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
    onClose();
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPostRequest();
  }

  const customStyles = {
    content: {
      width: "500px",
      height: "auto",
      margin: "auto",
      display: "block",
      backgroundColor: "#b9e6fd", // Background color
      border: "2px solid #072f49", // Border color and thickness
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="background">
        <form onSubmit={handleSubmit} >
          <h3 className="form-labels">Please input project description:</h3>
          <input
            type="text"
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            placeholder="Description Here"
          />
          <br />
          <h3 className="form-labels">WIP limit:</h3>
          <input
            type="text"
            value={project.wip}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*$/.test(inputValue)) {
                setProject({ ...project, wip: inputValue });
              }
            }}
            
          />
          <br />
          <h3 className="form-labels">Cycle time limit:</h3>
          <input
            type="text"
            value={project.cycle_time}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*$/.test(inputValue)) {
                setProject({ ...project, cycle_time: inputValue });
              }
            }}
            
          />
          <br />
          <h3 className="form-labels">Please add comments for the project:</h3>
          <textarea
            value={project.comment}
            onChange={(e) => setProject({ ...project, comment: e.target.value })}
            placeholder="Project comments"
            rows={8}
            style={{ width: "90%" }}
          />
          {Array(2).fill(<br />)}

          <button type="submit" className="submit-buttons">
            Submit
          </button>

          <button className="back-buttons" onClick={onClose}>
            Close
          </button>

        </form> 
      </div>
    </Modal>
  );
}
