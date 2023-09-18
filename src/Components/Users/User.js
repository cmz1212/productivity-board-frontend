import React, { useState, useEffect } from "react";
import EditUser from "./EditUser";
import { useAuth0 } from "@auth0/auth0-react";
import { URL } from "../../constants";

export default function User(props) {
  const { user_id, onDelete, isEdit } = props;
  const [user, setUser] = useState([]);
  const { isAuthenticated, getAccessTokenSilently} = useAuth0();
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

    if (isAuthenticated) {
      
      const fetchData = async () => {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_AUDIENCE,
        });

        fetch(`${URL}/user/${user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      }

      fetchData();
    }  
  }, [getAccessTokenSilently, isAuthenticated, user_id]);

  return (
    <div className="parent-div">
      <strong>User Name: </strong>{user.user_name}
      <strong>User Role: </strong>{user.user_role}
      <strong>Given Tasks:</strong>
      {user.tasks ? (
        <div>
          {user.tasks.map((task) => (
            <span key={task.id}>
              {task.task_description}{" "}
              <br />
            </span>
          ))}
        </div>
      ) : (
        "No assigned tasks"
      )}
      <br />
      <strong>Info: </strong>{user.additional_info}

      <div className="user-buttons">
        <button className="edit-buttons3" onClick={() => openEditModal(user)}>Edit</button>
        <button className="delete-buttons" onClick={() => onDelete(user_id)}>Remove User</button>
      </div>

      {editingUser && (
        <EditUser
          editingUser={editingUser}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          isEdit={isEdit}
        />
      )}
 
    </div>
  );
}

export function UserLite(props) {
  const [user, setUser] = useState([]);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { user_id } = props
 
  useEffect(() => {

    if (isAuthenticated) {

      const fetchData = async () => {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_AUDIENCE,
        });

        fetch(`${URL}/user/${user_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data);
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      }

      fetchData();
    }
  }, [getAccessTokenSilently, isAuthenticated, user_id]);

  const taskCount = () => {
    let i = 0;
    for (const task in user.tasks) {
      console.log(task)
      i++;
    }
    return i;
  };

  return (
    <div style={{ textAlign: 'left' }}>
      User Name: {user.user_name}
      <br />User Role: {user.user_role}
      <br />Current Given Tasks:{taskCount()}
    </div>
  );
}

