import React, { useState } from "react";
import EditTasks from "./EditTasks";
import ChooseUser from "../Users/ChooseUser";
import UnassignTask from "./UnassignTask";
import { changeTimeZone }from "../../constants";

export default function DisplayTask(props) {
  const { task, onDelete, setisModalEdited2 } = props;

  // Function to delete the task
  const deleteTask = () => {
    onDelete(task.id);
  };

  // State variable to control the visibility of Modals
  // State variable to set state for Modals
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  const [isUnAssignTaskModalOpen, setIsUnAssignTaskModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [assignTask, setAssignTask] = useState(null);
  const [unassignTask, setUnassignTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Function to open Modals
  const openEditModal = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const openAssignTaskModal = (taskUser) => {
    setAssignTask(taskUser);
    setIsAssignTaskModalOpen(true);
  };

  const openUnAssignTaskModal = (taskUser) => {
    setUnassignTask(taskUser);
    setIsUnAssignTaskModalOpen(true);
  };
  
  // Function to close Modals
  const closeEditModal = () => {
    setEditingTask(null);
    setAssignTask(null);
    setUnassignTask(null);
    setIsEditModalOpen(false);
    setIsAssignTaskModalOpen(false);
    setIsUnAssignTaskModalOpen(false);
    setisModalEdited2(true);
  };

  return (
    <div style={{ fontSize: '0.93em' }}>
      <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}> {task.task_description}</div>
      
      <br />
      <strong>Status: </strong> {task.status}
      
      <br />
      <strong>Start Date: </strong> {changeTimeZone(task.start_date, 'Asia/Singapore')}
      
      <br />
      {task.status === "Completed" ? (
        <>
          <strong>End Date: </strong> {changeTimeZone(task.end_date, 'Asia/Singapore')}
          
          <br />
          <strong>Cycle Time: </strong> {task.cycle_time}
        </>
      ) : (
        <>
          <strong>Target End: </strong> {changeTimeZone(task.target_end_date, 'Asia/Singapore')}
          
          <br />
          <strong>Priority: </strong> {task.priority}
        </>
      )}

      <br /><strong>Comments: </strong>{task.task_comments}
      {Array(2).fill(<br />)}<strong>Assigned Users: </strong> {task.users.map(user => user.user_name).join(', ')}

      {Array(2).fill(<br />)}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <button className="edit-buttons3" onClick={() => openAssignTaskModal(task)}>
          Assign
        </button>

        <button className="edit-buttons3" onClick={() => openUnAssignTaskModal(task)}>
          UnAssign
        </button>

        <button className="edit-buttons3" onClick={() => openEditModal(task)}>
          Edit
        </button>

        <button className="delete-buttons3" onClick={deleteTask}>
          Delete
        </button>
      </div>
      
      {assignTask && (
        <ChooseUser
          editingTask={assignTask}
          isOpen={isAssignTaskModalOpen}
          onClose={closeEditModal}
        />
      )}

      {unassignTask && (
        <UnassignTask
          editingTask={unassignTask}
          isOpen={isUnAssignTaskModalOpen}
          onClose={closeEditModal}
        />
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