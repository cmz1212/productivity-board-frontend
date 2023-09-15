import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { useAuth0 } from "@auth0/auth0-react";
const URL = process.env.REACT_APP_BACKEND_URL;

export default function User(prop) {
  const [user, setUser] = useState([]);
  //const { isAuthenticated, getAccessTokenSilently, loggedInUser } = useAuth0();
  const { user_id, onDelete } = prop;

  const url = `${URL}/user/${user_id}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [url]);
  return (
    <div>
      User name: {user.user_name}
      <br />
      User role: {user.user_role}
      <br />
      Current given tasks:
      {user.tasks ? (
        <div>
          {user.tasks.map((task) => (
            <span key={task.id}>
              {task.task_description}{" "}
              <button className="small-buttons">
                <Link to={`/tasks?proj_id=${task.project_id}`}>
                  View task details
                </Link>
              </button>
            </span>
          ))}
        </div>
      ) : (
        "No assigned tasks"
      )}
      <br />
      Additional information: {user.additional_info}
      <br />
      <button className="edit-buttons">
        <Link to="/users/add">Edit information</Link>
      </button>
      <button className="delete-buttons" onClick={() => onDelete(user_id)}>
        Remove member
      </button>
    </div>
  );
}
