import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL;

export default function EditProj() {
  const [project, setProject] = useState({
    id:null,
    description: null,
    wip: null,
    cycle_time: null,
    comment: null,
  });
  const navigate = useNavigate();
  function sendPutRequest() {
    const url = `${URL}/project/${project.id}`;
    
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
        .then((data) => {
          setProject({
            id: null,
            description: null,
            wip: null,
            cycle_time: null,
            comment: null,
          });

          //navigate(`/display/${data.id}`);
          navigate(`/display`);
        })

        .catch((error) => {
          console.error("Error:", error.message);
        });
    
  }
  function handleSubmit(event) {
    event.preventDefault();

    // Check if project.id is valid before sending the request
    if (project.id !== null && project.id !== "") {
      sendPutRequest();
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Select the id of the project:</h3>
        <input
          type="text"
          value={project.id}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
              setProject({ ...project, id: inputValue });
            }
          }}
          
        />
        <h3>Input new project description(if any):</h3>
        <input
          type="text"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          placeholder="Description Here"
        />
        <br />
        <h3>New WIP limit(if any):</h3>
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
        <h3>New cycle time limit(if any):</h3>
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
        <h3>New comments for the project(if any):</h3>
        <textarea
          value={project.comment}
          onChange={(e) => setProject({ ...project, comment: e.target.value })}
          placeholder="Project comments"
          rows={8} // You can adjust this value to fit the desired number of lines
          style={{ width: "90%", resize: "vertical" }} // Optional styling for width and vertical resizing
        />
        <br />

        <button type="submit">Submit</button>
      </form>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
}
