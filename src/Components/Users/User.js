import React, { useState } from "react";
import EditUser from "./EditUser";

export default function User(props) {
  const { user, fetchAllUsers, onDelete} = props;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const openEditModal = (editUser) => {
    setEditingUser(editUser);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setIsEditModalOpen(false);
    fetchAllUsers();
  };

  return (
    <div className="text-sm text-left">
      {user && (
        <div>
          <strong>User Name: </strong>{user.user_name}<br />
          <strong>User Role: </strong>{user.user_role}<br />
          <strong>Info: </strong>{user.additional_info}{Array(2).fill(<br />)}
          <strong>Given Tasks: </strong><br />
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
          
          <div className="button-group flex justify-left space-x-4" style={{ position: 'absolute', left: '8px', bottom: '10px' }}>
            <button className="bg-gray-100 text-black w-60 h-22 border border-black rounded-md font-semibold" onClick={() => openEditModal(user)}>Edit</button>
            <button className="bg-fuchsia-100 text-black w-80 h-22 border border-black rounded-md font-semibold" onClick={() => onDelete(user.id)}>Remove</button>
          </div>
        </div>
      )}

      { editingUser && (
        <EditUser
          editingUser={editingUser}
          fetchAllUsers={fetchAllUsers}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        />
      )}
 
    </div>
  );
}

export function UserLite({user}) {
  return (
    <>
      { user && (
        <div className="text-sm text-left">
          User Name: {user.user_name} <br />
          User Role: {user.user_role} <br />
          {user.tasks && (
            <span>
              Current Given Tasks: {user.tasks.length || 0}
            </span>
          )}
        </div>
      )}
    </>
  );
}