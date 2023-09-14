import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "./User";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/user`;

export default function ChooseUser() {
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
            <div key={index + 1} className="user-space">
              <button>
                <User user_id={user.id} />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <h2>Or create a new member:</h2>
      <button className="edit-buttons">
        <Link to="/users/add">Create new project member</Link>
      </button>
      <br />
      <button className="home-buttons">
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
