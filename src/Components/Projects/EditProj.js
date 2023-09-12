import React, { useState } from "react";
import "../../Pages/ProjPage.css";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constants";
import Modal from "react-modal";

export default function EditProj(props) {
  const { proj_id, isOpen, onClose } = props;

  const [project, setProject] = useState({
    description: null,
    wip: null,
    cycle_time: null,
    comment: null,
  });

  const navigate = useNavigate();

  function sendPutRequest() {
    const url = `${URL}/project/${proj_id}`;

    const requestData = {
      project_description: project.description,
      wip_limit: project.wip,
      cycle_time_limit: project.cycle_time,
      project_comments: project.comment,
    };
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setProject({
          description: null,
          wip: null,
          cycle_time: null,
          comment: null,
        });

        navigate(`/projects`);
      })

      .catch((error) => {
        console.error("Error:", error.message);
      });
      window.location.reload();
      onClose();
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPutRequest();
  }

  const customStyles = {
    content: {
      width: "500px",
      height: "auto",
      margin: "auto",
      display: "block",
      backgroundColor: "#b9e6fd",
      border: "2px solid #072f49",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="background">
        <form onSubmit={handleSubmit} className="forms">
          <h3 className="form-labels">Input new project description(if any):</h3>
          <input
            type="text"
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            placeholder="Description Here"
          />
          <br />
          <h3 className="form-labels">New WIP limit(if any):</h3>
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
          <h3 className="form-labels">New cycle time limit(if any):</h3>
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
          <h3 className="form-labels">New comments for the project(if any):</h3>
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
