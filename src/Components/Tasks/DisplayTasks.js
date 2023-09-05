import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL } from "../Projects/display";

const url = `${URL}/task`;

export default function DisplayTask() {
  const [tasks, setTasks] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const proj_id = searchParams.get("proj_id");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let task_list = [];
        for (const task in data) {
          if (data[task].project_id === proj_id) {
            task_list.push(data[task]);
          }
        }

        setTasks(task_list);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [proj_id]);
  function deleteTask(task_id) {
    const confirmed = window.confirm(
      "TODO: make this authenticated account only \nWARNING: Deletion is irreversible! \n Are you sure you want to delete this task?"
    );

    if (confirmed) {
      const deleteUrl = `${URL}/task/${task_id}`;

      fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          // Task deleted successfully, update the state to re-render the component
          const updatedTasks = tasks.filter((task) => task.id !== task_id);
          setTasks(updatedTasks);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  return (
    <div>
      {tasks.length > 0 ? (
        <div>
          {tasks.map((task, index) => (
            <div key={index + 1} className="task-space">
              Description: {task.task_description}
              <br />
              Status: {task.status}
              <br />
              Start time: {task.start_date}
              <br />
              Target end time: {task.target_end_date}
              <br />
              Priority: {task.priority}
              <br />
              Comments: {task.task_comments}
              <br />
              <button className="edit-buttons">
                <Link to={`/tasks/edit/${task.id}`}>Edit task</Link>
              </button>
              {"  "}
              <button
                className="edit-buttons"
                onClick={() => deleteTask(task.id)}
              >
                Delete task
              </button>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <h3>No tasks created yet</h3>
      )}
      <br />
      <button>
        <Link to={`/tasks/add?proj_id=${proj_id}`}>Add tasks</Link>{" "}
      </button>
      <br />
      <button>
        <Link to="/projects/display">Choose another project</Link>
      </button>
      <br />
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
