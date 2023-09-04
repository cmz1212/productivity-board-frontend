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
      {users.length > 0 ? (
        <div>
          {users.map((user, index) => (
            <div key={index + 1}>
              user ID: {user.id}
              <br />
              User name: {user.user_name}
              <br />
              User role: {user.user_role}
              <br />
              Given task id:{" "}
              {user.tasks.map((task) => (
                <span key={task.id}>{task.id}, </span>
              ))}
              <br />
              Additional information: {user.additonal_info}
              <br />
            </div>
          ))}
        </div>
      ) : null}
      <br />
      <Link to="/">Home</Link>
    </div>
  );
}
