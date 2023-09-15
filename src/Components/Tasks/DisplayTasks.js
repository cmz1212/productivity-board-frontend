import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditTasks from "./EditTasks";

export default function DisplayTask(props) {
  const { task, onDelete, setisModalEdited2 } = props;

  // Function to delete the task
  const deleteTask = () => {
    onDelete(task.id);
  };

  // State variable to control the visibility of the EditTasks modal
  // State variable to set state for EditTasks Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Function to open the EditTask modal
  const openEditModal = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  // Function to close the EditTask modal
  const closeEditModal = () => {
    setEditingTask(null);
    setIsEditModalOpen(false);
    setisModalEdited2(true);
  };

  return (
    <div>
      <div
        style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}
      >
        {task.task_description}
      </div>
      <br />
      <strong>Status: </strong>
      {task.status}
      <br />
      <strong>Start Date: </strong>
      {task.start_date}
      <br />
      {task.status === "Completed" ? (
        <>
          <strong>End Date: </strong>
          {task.end_date}
          <br />
          <strong>Cycle Time: </strong>
          {task.cycle_time}
        </>
      ) : (
        <>
          <strong>Target End Date: </strong>
          {task.target_end_date}
          <br />
          <strong>Priority: </strong>
          {task.priority}
        </>
      )}

      <br />
      <strong>Comments: </strong>
      {task.task_comments}
      {Array(2).fill(<br />)}
      <button className="edit-buttons3">
        <Link to={`/users/select`}>Assign</Link>
      </button>
      <button className="edit-buttons3" onClick={() => openEditModal(task)}>
        {" "}
        Edit{" "}
      </button>
      {"    "}
      {"    "}
      <button className="delete-buttons3" onClick={deleteTask}>
        Delete
      </button>
      <br />

      {editingTask && (
        <EditTasks
          editingTask={editingTask}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
}
