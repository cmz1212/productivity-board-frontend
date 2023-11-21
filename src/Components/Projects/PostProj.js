import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL, modalStyles1} from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";

export default function PostProj(props) {
  const { auth_id, fetchData, isOpen, onClose } = props;

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
        audience: process.env.REACT_APP_API_AUDIENCE
      })
  
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestData),
      });
  
      setProject({
        description: null,
        wip: null,
        cycle_time: null,
        comment: null,
        auth_id: null,
      });
  
      navigate(`/projects`);

    } catch (error) {
      console.error("Error: ", error.message);
    }
    
    onClose();
    fetchData();
  }

  function handleSubmit(event) {
    // Check if all fields are filled up
    if (!project.description || !project.wip || !project.cycle_time || !project.comment) {
      alert("Please fill in all fields");
      return;
    }

    event.preventDefault();
    sendPostRequest();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles1}>
      <div className="background">
        <form onSubmit={handleSubmit} >
          <h3 className="text-sky-950">Project Description:</h3>
          <input
            type="text"
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            placeholder="Description Here"
          />
          {Array(2).fill(<br />)}
          <h3 className="text-sky-950">WIP Limit:</h3>
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
          {Array(2).fill(<br />)}
          <h3 className="text-sky-950">Cycle Time Timit:</h3>
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
          {Array(2).fill(<br />)}
          <h3 className="text-sky-950">Please add comments for the project:</h3>
          <textarea
            value={project.comment}
            onChange={(e) => setProject({ ...project, comment: e.target.value })}
            placeholder="Project Comments"
            rows={8}
            style={{ width: "90%" }}
          />

          {Array(2).fill(<br />)}
          <button type="submit" className="bg-gray-100 text-black w-120 h-25 border border-black rounded-md m-1 font-semibold">Submit</button>
          {"        "}
          <button className="bg-gray-100 text-black w-120 h-25 border border-black rounded-md m-1 font-semibold" onClick={onClose}>Close</button>

        </form> 
      </div>
    </Modal>
  );
}