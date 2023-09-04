import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL;

export default function EditProj(props) {
  const { proj_id } = props;
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
      .then((data) => {
        setProject({
          description: null,
          wip: null,
          cycle_time: null,
          comment: null,
        });

        //navigate(`/display/${data.id}`);
        navigate(`/project/display`);
      })

      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
  function handleSubmit(event) {
    event.preventDefault();

    sendPutRequest();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
