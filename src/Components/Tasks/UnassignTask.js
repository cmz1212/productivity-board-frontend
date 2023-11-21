import React, { useState, useEffect } from "react";
import { UserLite } from "../Users/User";
import Modal from "react-modal";
import { URL, modalStyles3 } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";

export default function UnassignTask(props) {
  const { editingTask, fetchAllTasks, isOpen, onClose } = props;
  const { getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(editingTask.users);
  }, [editingTask.users]);

  const handleUserSelection = async (selectedUser) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE
      });

      const requestData = { task_id: editingTask.id };

      await fetch(`${URL}/user/unlinkUserFromTask/${selectedUser.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestData),
      });

      onClose();
      fetchAllTasks();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles3}>
      <div>
        <h1><strong>Click On User to Unassign Task:</strong></h1>
        <br/>
        {users.length > 0 ? (
          <div className="flex flex-row flex-wrap">
            {users.map((user, index) => (
              <div key={index + 1} className="flex-none w-180 h-150 p-2 m-2 border border-black bg-gray-50">
                <button onClick={() => handleUserSelection(user)}>
                  <UserLite user={user} />
                </button>
              </div>
            ))}
          </div>
        ) : null}
        <button className="bg-gray-100 text-black w-120 h-25 border border-black rounded-md m-1 font-semibold" onClick={onClose} style={{ position: 'absolute', left: '22px', bottom: '15px' }}>Close</button>
      </div>
    </Modal>
  );
}