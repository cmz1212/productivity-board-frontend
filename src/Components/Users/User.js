import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditUser from "./EditUser";
//import { useAuth0 } from "@auth0/auth0-react";
const URL = process.env.REACT_APP_BACKEND_URL;

export default function User(props) {
  const [user, setUser] = useState([]);
  //const { isAuthenticated, getAccessTokenSilently, loggedInUser } = useAuth0();
  const { user_id, onDelete, isEdit } = props;

  const url = `${URL}/user/${user_id}`;
  // State variable to control the visibility of the EditTasks modal
  // State variable to set state for EditTasks Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Function to open the EditUser modal
  const openEditModal = (User) => {
    setEditingUser(User);
    setIsEditModalOpen(true);
  };

  // Function to close the EditUser modal
  const closeEditModal = () => {
    setEditingUser(null);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [url]);
  return (
    <div>
      User name: {user.user_name}
      <br />
      User role: {user.user_role}
      <br />
      Current given tasks:
      {user.tasks ? (
        <div>
          {user.tasks.map((task) => (
            <span key={task.id}>
              {task.task_description}{" "}
              <button className="small-buttons">
                <Link to={`/tasks?proj_id=${task.project_id}`}>
                  View task details
                </Link>
              </button>
            </span>
          ))}
        </div>
      ) : (
        "No assigned tasks"
      )}
      <br />
      Additional information: {user.additional_info}
      <br />
      <button className="edit-buttons3" onClick={() => openEditModal(user)}>
        {" "}
        Edit{" "}
      </button>
      {editingUser && (
        <EditUser
          editingUser={editingUser}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          isEdit={isEdit}
        />
      )}
      <button className="delete-buttons" onClick={() => onDelete(user_id)}>
        Remove member
      </button>
    </div>
  );
}
