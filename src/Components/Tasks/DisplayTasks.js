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
        console.log(task_list);
        setTasks(task_list);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [proj_id]);

  return (
    <div>
      {tasks.length > 0 ? (
        <div>
          {tasks.map((task, index) => (
            <div key={index + 1}>
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
