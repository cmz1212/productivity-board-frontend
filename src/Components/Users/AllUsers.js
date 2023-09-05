import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/user`;

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  return (
    <div>
      <h2>Choose a user to assign the task to:</h2>
      {users.length > 0 ? (
        <div>
          {users.map((user, index) => (
            <div key={index + 1}>
              User name: {user.user_name}
              <br />
              User role: {user.user_role}
              <br />
              Given tasks:{" "}
              {user.tasks.map((task) => (
                <span key={task.id}>
                  {task.task_description},
                  <Link to={`/tasks?proj_id=${task.project_id}`}>
                    View task details
                  </Link>
                </span>
              ))}
              <br />
              Additional information: {user.additonal_info}
              <br />
            </div>
          ))}
        </div>
      ) : null}
      <h2>Or create a new member:</h2>
      <Link to="/users/add">Create new project member</Link>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
}
