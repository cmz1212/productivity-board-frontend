import React, { useState, useEffect } from "react";
import { UserLite } from "../Users/User";
import Modal from "react-modal";
import { URL, customStyles3 } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";

export default function UnassignTask(props) {
  const { getAccessTokenSilently } = useAuth0();
  const { editingTask, isOpen, onClose } = props;
  const [users, setUsers] = useState([]);
  const taskID = editingTask.id;

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_AUDIENCE
        });

        const response = await fetch(`${URL}/task/${taskID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          console.error("Request failed");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    fetchData();
  }, [getAccessTokenSilently, taskID]);

  const handleUserSelection = async (selectedUser) => {
    const userID = selectedUser.id;

    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE
      });

      const requestData = {
        task_id: taskID,
      };

      const response = await fetch(`${URL}/user/unlinkUserFromTask/${userID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Handle success if needed
      } else {
        console.error("Request failed");
      }

      onClose();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles3}>
      <div>
        <h1><strong>Click On User to Unassign Task:</strong></h1>
        <br/>
        {users.length > 0 ? (
          <div className="user-container">
            {users.map((user, index) => (
              <div key={index + 1} className="user-space">
                <button onClick={() => handleUserSelection(user)}>
                  <UserLite user_id={user.id} />
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
