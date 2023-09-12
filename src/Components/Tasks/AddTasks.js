import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { URL } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";

const url = `${URL}/task`;

export default function AddTasks() {
  const { getAccessTokenSilently } = useAuth0();
  const [newTask, setNewTask] = useState({
    description: null,

    end_date: null,
    target_end_date: null,
    cycle_time: null,
    target_cycle_time: null,
    priority: null,
    task_comments: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const proj_id = searchParams.get("proj_id");

  async function sendPostRequest() {
    const {
      description,

      end_date,
      target_end_date,
      cycle_time,
      target_cycle_time,
      priority,
      task_comments,
    } = newTask;

    const requestData = {
      task_description: description,
      project_id: proj_id,
      status: "Backlog",
      start_date: new Date(),
      end_date: end_date,
      target_end_date: target_end_date,
      cycle_time: cycle_time,
      target_cycle_time: target_cycle_time,
      priority: priority,
      task_comments: task_comments,
    };

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_API_AUDIENCE
    })

    

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNewTask({
          description: null,
          end_date: null,
          target_end_date: null,
          cycle_time: null,
          target_cycle_time: null,
          priority: null,
          task_comments: null,
        });
        navigate(`/tasks?proj_id=${proj_id}`)
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPostRequest();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Please input task description:</h3>
        <input
          type="text"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Description Here"
        />

        <br />
        
        <h3>Target end date:</h3>
        <input
          type="text"
          value={newTask.target_end_date}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
              setNewTask({ ...newTask, target_end_date: inputValue });
            }
          }}
        />
        <br />
        
        <h3>Priority:</h3>
        <input
          type="text"
          value={newTask.priority}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
              setNewTask({ ...newTask, priority: inputValue });
            }
          }}
        />
        <br />

        <h3>Please add comments for the task:</h3>
        <textarea
          value={newTask.task_comments}
          onChange={(e) =>
            setNewTask({ ...newTask, task_comments: e.target.value })
          }
          placeholder="Project comments"
          rows={8} // You can adjust this value to fit the desired number of lines
          style={{ width: "90%", resize: "vertical" }} // Optional styling for width and vertical resizing
        />
        <br />

        <button type="submit">Submit</button>

      </form>
      <br />
      <button>
        <Link to={`/tasks?proj_id=${proj_id}`}>Back to tasks</Link>
      </button>
      <br />
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
