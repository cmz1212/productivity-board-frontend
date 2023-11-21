import React, { useState, useEffect } from "react";
import CreateUser from './CreateUser';
import { URL, modalStyles4, modalStyles5 } from "../../constants";
import DeleteUser from "./DeleteUser";
import User from "./User";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from 'react-modal';

export default function AllUsers(props) {
  const { isOpen, onClose, project_id2 } = props;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const openCreateUserModal = () => {
    setIsCreateUserModalOpen(true);
  }

  const closeCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
    fetchAllUsers();
  }

  const handleDeleteUser = async (userID) => {
    await DeleteUser(userID, getAccessTokenSilently);
    fetchAllUsers();
  };

  // eslint-disable-next-line
  const fetchAllUsers = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });

      const response = await fetch(`${URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          proj_id: project_id2,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllUsers();
    }
  }, [isAuthenticated, fetchAllUsers]);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles4}>
        <h5><strong>All Users:</strong></h5>
        <br/>
        {users.length > 0 ? (
          <div className="flex flex-row flex-wrap">
            {users.map((user, index) => (
              <div key={index + 1} className="bg-white rounded-md w-250 h-250 m-1 border border-black p-2 m-2 space-x-4" style={{ position: 'relative' }}>
                <User user={user} fetchAllUsers={fetchAllUsers} onDelete={handleDeleteUser} />
              </div>
            ))}
          </div>
        ) : null}

        {Array(2).fill(<br />)}
        <div className="button-group flex justify-left space-x-4" style={{ position: 'absolute', left: '22px', bottom: '15px' }}>
          <button className="border-2 border-black rounded-md bg-gray-100 m-2 font-bold h-35 w-180 flex items-center justify-center font-semibold" onClick={openCreateUserModal}>
            Create New User
          </button>
          <button className="border-2 border-black rounded-md bg-gray-100 m-2 font-bold h-35 w-180 flex items-center justify-center font-semibold" onClick={onClose}>
            Close
          </button>
        </div>
      </Modal>

      {isCreateUserModalOpen && (
        <Modal isOpen={true} onRequestClose={closeCreateUserModal} style={modalStyles5}>
          <CreateUser project_id={project_id2} fetchAllUsers={fetchAllUsers} onClose={closeCreateUserModal} />
        </Modal>
      )}
    </>
  );
}