import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import User from "./User";

import DeleteUser from "./DeleteUser";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/user`;

export default function ChooseUser(props) {
  const [users, setUsers] = useState([]);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const taskID = searchParams.get("task_id");

  const handleDeleteUser = async (userID) => {
    //const result = await DeleteUser(projectId, getAccessTokenSilently);
    const result = await DeleteUser(userID);
    if (result.success) {
      setIsUserDeleted(true);
    }
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [isUserDeleted]);

  return (
    <div>
      <h2>Choose a user to assign the task to:</h2>
      {users.length > 0 ? (
        <div>
          {users.map((user, index) => (
            <div key={index + 1} className="user-space">
              <button>
                <User
                  user_id={user.id}
                  onDelete={handleDeleteUser}
                  isEdit={true}
                />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <h2>Or create a new member:</h2>
      <button className="edit-buttons">
        <Link to={`/users/add?task_id=${taskID}&create=${true}`}>
          Create new project member
        </Link>
      </button>
      <br />
      <button className="home-buttons">
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
