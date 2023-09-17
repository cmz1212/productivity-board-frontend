import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "./User";
import DeleteUser from "./DeleteUser";
import Modal from "react-modal";
import { customStyles2 } from "../../constants";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/user`;

export default function ChooseUser(props) {
  const { editingTask, isOpen, onClose } = props;
  const [users, setUsers] = useState([]);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const taskID = editingTask.id;

  const handleDeleteUser = async (userID) => {
    const result = await DeleteUser(userID);
    if (result.success) {
      setIsUserDeleted(true);
    }
  };

  useEffect(() => {
    const header = {
      proj_id: editingTask.project.id,
    };
    fetch(url, { headers: header })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [isUserDeleted, editingTask.project.id]);

  const handleUserSelection = (selectedUser) => {
    const userID = selectedUser.id;
    const requestData = {
      task_id: taskID,
    };

    // Change the URL to the correct endpoint for linking user to the task
    fetch(`${URL}/linkUserToTask/${userID}`, {
      method: "POST", // Keep the method as POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success if needed
        } else {
          // Handle errors if needed
          throw new Error("Request failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles2}>
      <div>
        <h2>Choose a user to assign the task to:</h2>

        {users.length > 0 ? (
          <div>
            {users.map((user, index) => (
              <div key={index + 1} className="user-space">
                <button onClick={() => handleUserSelection(user)}>
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
          <Link to={`/users/add`}>Create new project member</Link>
        </button>
      </div>
    </Modal>
  );
}
