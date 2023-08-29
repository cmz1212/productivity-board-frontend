import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL;

export default function PostProj() {
  const [project, setProject] = useState({
    description: "",
    wip: null,
    cycle_time: null,
    comment: "",
  });
  const navigate = useNavigate();
  function sendPostRequest() {
    const url = `${URL}/project`;
    if (!project.description) {
      alert("Project description cannot be empty");
    } else {
      const requestData = {
        project_description: project.description,
        wip_limit: project.wip,
        cycle_time_limit: project.cycle_time,
        project_comments: project.comment,
      };
      fetch(url, {
        method: "POST",
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
            description: "",
            wip: null,
            cycle_time: null,
            comment: "",
          });

          //navigate(`/display/${data.id}`);
          navigate(`/display`);
        })

        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    sendPostRequest();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Please input project description:</h3>
        <input
          type="text"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          placeholder="Description Here"
        />
        <br />
        <h3>WIP limit:</h3>
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
        <h3>Cycle time limit:</h3>
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
        <h3>Please add comments for the project:</h3>
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
