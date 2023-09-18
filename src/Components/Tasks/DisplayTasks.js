import React, { useState } from "react";
import EditTasks from "./EditTasks";
import ChooseUser from "../Users/ChooseUser";
import UnassignTask from "./UnassignTask";

export default function DisplayTask(props) {
  const { task, onDelete, setisModalEdited2 } = props;

  // Function to delete the task
  const deleteTask = () => {
    onDelete(task.id);
  };

  // State variable to control the visibility of the EditTasks modal
  // State variable to set state for EditTasks Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditModalOpen2, setIsEditModalOpen2] = useState(false);
  const [isEditModalOpen3, setIsEditModalOpen3] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [assignTask, setAssignTask] = useState(null);
  const [unassignTask, setUnassignTask] = useState(null);

  // Function to open the EditTask modal
  const openEditModal = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };
  const openEditModal2 = (taskUser) => {
    setAssignTask(taskUser);
    setIsEditModalOpen2(true); // Open the modal
  };
  const openEditModal3 = (taskUser) => {
    setUnassignTask(taskUser);
    setIsEditModalOpen3(true); // Open the modal
  };
  // Function to close the EditTask modal
  const closeEditModal = () => {
    setEditingTask(null);
    setAssignTask(null);
    setUnassignTask(null);
    setIsEditModalOpen(false);
    setIsEditModalOpen2(false);
    setIsEditModalOpen3(false);
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
      <button className="edit-buttons3" onClick={() => openEditModal2(task)}>
        Assign
      </button>
      <button className="edit-buttons3" onClick={() => openEditModal3(task)}>
        Unassign
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
      {assignTask && (
        <div>
          
        <ChooseUser
          editingTask={assignTask}
          
          isOpen={isEditModalOpen2}
          onClose={closeEditModal}
        />
        </div>
      )}
      {unassignTask && (
        <div>
          
        <UnassignTask
          editingTask={unassignTask}
          
          isOpen={isEditModalOpen3}
          onClose={closeEditModal}
        />
        </div>
      )}
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
