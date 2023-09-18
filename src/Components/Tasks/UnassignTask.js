import React, { useState, useEffect } from "react";
import {UserLite} from "../Users/User";
//import DeleteUser from "../Users/DeleteUser";
import Modal from "react-modal";
import { customStyles3 } from "../../constants";

const URL = process.env.REACT_APP_BACKEND_URL;
const url = `${URL}/task`;

export default function UnassignTask(props) {
  const { editingTask,isOpen, onClose } = props;
  const [users, setUsers] = useState([]);
  //const [isUserDeleted, setIsUserDeleted] = useState(false);
  const taskID = editingTask.id;



  useEffect(() => {
    
    fetch(`${url}/${taskID}`)
      .then((response) => response.json())
      .then((data) => {
       
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [taskID]);

  const handleUserSelection = (selectedUser) => {
    const userID = selectedUser.id;
   
    const requestData = {
      task_id: taskID,
    };

    // Change the URL to the correct endpoint for linking user to the task
    fetch(`${URL}/user/unlinkUserFromTask/${userID}`, {
      method: "DELETE", // Keep the method as POST
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
        
        <h1>Task is currently assigned to:</h1>

        {users.length > 0 ? (
          <div className="user-container">
            {users.map((user, index) => (
              <div key={index + 1} className="user-space">
                <button onClick={() => handleUserSelection(user)}>
                  <UserLite
                    user_id={user.id}
                    
                  />
                </button>
              </div>
            ))}
          </div>
        ) : null}
        <h2>Click on the member to unassign task</h2>
        
      </div>
    </Modal>
  );
}
