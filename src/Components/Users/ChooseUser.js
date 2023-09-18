import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserLite} from "./User";
//import DeleteUser from "./DeleteUser";
import Modal from "react-modal";
import {customStyles3 } from "../../constants";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/user`;

export default function ChooseUser(props) {
  const { editingTask,isOpen, onClose } = props;
  const [users, setUsers] = useState([]);
  //const [isUserDeleted, setIsUserDeleted] = useState(false);
  const taskID = editingTask.id;

 

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
  }, [ editingTask.project.id]);

  const handleUserSelection = (selectedUser) => {
    const userID = selectedUser.id;
   
    const requestData = {
      task_id: taskID,
    };

    // Change the URL to the correct endpoint for linking user to the task
    fetch(`${url}/linkUserToTask/${userID}`, {
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
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles3}>
      <div>
        
        <h1>Choose a user to assign the task to:</h1>

        {users.length > 0 ? (
          <div className="user-container">
            {users.map((user, index) => (
              <div key={index + 1} className="user-space-small">
                <button onClick={() => handleUserSelection(user)}>
                  <UserLite
                    user_id={user.id}
                    
                  />
                </button>
              </div>
            ))}
          </div>
        ) : null}
        <h1>Or create a new member:</h1>
        <button className="edit-buttons">
          <Link to={`/users/add`}>Create new project member</Link>
        </button>
      </div>
    </Modal>
  );
}
