import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/task`;

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    description: null,

    end_date: null,
    target_end_date: null,
    cycle_time: null,
    target_cycle_time: null,
    priority: null,
    task_comments: null,
  });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  function sendPostRequest() {
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
      project_id: "1",
      status: "Backlog",
      start_date: new Date(),
      end_date: end_date,
      target_end_date: target_end_date,
      cycle_time: cycle_time,
      target_cycle_time: target_cycle_time,
      priority: priority,
      task_comments: task_comments,
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
        setNewTask({
          description: null,
          end_date: null,
          target_end_date: null,
          cycle_time: null,
          target_cycle_time: null,
          priority: null,
          task_comments: null,
        });
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
      {tasks.length > 0 ? (
        <div>
          {tasks.map((task, index) => (
            <div key={index + 1}>
              Task ID: {task.id}
              <br />
              Project ID: {task.project_id}
              <br />
              Description: {task.task_description}
              <br />
              Status: {task.status}
              <br />
              Target end time: {task.target_end_date}
              <br />
              Priority: {task.priority}
              <br />
              Comments: {task.task_comments}
              <br />
            </div>
          ))}
        </div>
      ) : null}
      <br />

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
      <Link to="/">Home</Link>
    </div>
  );
}
