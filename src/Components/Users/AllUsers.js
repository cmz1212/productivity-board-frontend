import React, { useState, useEffect } from "react";
import CreateUser from './CreateUser';
import { URL, customStyles4, customStyles5 } from "../../constants";
import DeleteUser from "./DeleteUser";
import User from "./User";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from 'react-modal';

export default function AllUsers(props) {
  const { isOpen, onClose, project_id2 } = props;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const openCreateUserModal = () => setIsCreateUserModalOpen(true);
  const closeCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
    window.location.reload();
  }

  const handleDeleteUser = async (userID) => {
    const result = await DeleteUser(userID, getAccessTokenSilently);
    if (result.success) {
      setIsUserDeleted(true);
    }
  };

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
            proj_id: project_id2,
          },
        })
          .then((response) => response.json())
          .then((data) => setUsers(data))
          .catch((error) => console.error("Error:", error.message));
      };
      fetchData();
    }
  }, [isAuthenticated, getAccessTokenSilently, isUserDeleted, project_id2]);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles4}>
        <h5><strong>All Users:</strong></h5>
        <br/>
        {users.length > 0 ? (
          <div className="user-container">
            {users.map((user, index) => (
              <div key={index + 1} className="user-space">
                <User user_id={user.id} onDelete={handleDeleteUser} isEdit={false} />
              </div>
            ))}
          </div>
        ) : null}

        {Array(2).fill(<br />)}
        <div className="button-group flex justify-left space-x-4">
          <button className="task-buttons2" onClick={openCreateUserModal}>
            Create New User
          </button>
          <button className="task-buttons2" onClick={onClose}>
            Close
          </button>
        </div>
      </Modal>

      {isCreateUserModalOpen && (
        <Modal isOpen={true} onRequestClose={closeCreateUserModal} style={customStyles5}>
          <CreateUser project_id={project_id2} onClose={closeCreateUserModal} />
        </Modal>
      )}
    </>
  );
}
