import React, { useState, useEffect } from "react";
import { UserLite} from "./User";
import Modal from "react-modal";
import {customStyles3 } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import { URL } from "../../constants";

export default function ChooseUser(props) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { editingTask, isOpen, onClose } = props;
  const [users, setUsers] = useState([]);
  const taskID = editingTask.id;

 
  useEffect(() => {

    if (isAuthenticated) {

      const fetchData = async () => {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_AUDIENCE,
        });

        fetch(`${URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            proj_id: editingTask.project.id,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUsers(data);
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
        }

        fetchData();
      }
      
  }, [isAuthenticated, getAccessTokenSilently, editingTask.project.id]);

  const handleUserSelection = (selectedUser) => {
    
    const userID = selectedUser.id;
    const requestData = {
      task_id: taskID,
    };
    
    if (isAuthenticated) {
      
      const fetchData = async () => {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_AUDIENCE,
        });

        // Change the URL to the correct endpoint for linking user to the task
        fetch(`${URL}/user/linkUserToTask/${userID}`, {
          method: "POST", // Keep the method as POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
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
      }
      
      fetchData();
    }

    onClose();
    window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles3}>
      <div>
        
        <h1><strong>Choose a user to assign the task to:</strong></h1>
        <br/>
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
        <button className="back-buttons" onClick={onClose} style={{ position: 'absolute', left: '10px', bottom: '10px' }}>Close</button>
      </div>
    </Modal>
  );
}
