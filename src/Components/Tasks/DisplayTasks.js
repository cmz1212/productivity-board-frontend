import React, { useState } from "react";
import EditTasks from "./EditTasks";
import ChooseUser from "../Users/ChooseUser";
import UnassignTask from "./UnassignTask";
import { changeTimeZone }from "../../constants";

export default function DisplayTask(props) {
  const { task, fetchAllTasks, onDelete } = props;

  const deleteTask = () => {
    onDelete(task.id);
  };

  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  const [isUnAssignTaskModalOpen, setIsUnAssignTaskModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [assignTask, setAssignTask] = useState(null);
  const [unassignTask, setUnassignTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

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
  
  const closeEditModal = () => {
    setEditingTask(null);
    setAssignTask(null);
    setUnassignTask(null);
    setIsEditModalOpen(false);
    setIsAssignTaskModalOpen(false);
    setIsUnAssignTaskModalOpen(false);
    fetchAllTasks();
  };

  return (
    <div style={{ fontSize: '0.92em' }}>
      <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}> {task.task_description}</div><br />
      <strong>Status: </strong> {task.status}<br /> 
      <strong>Start Date: </strong> {changeTimeZone(task.start_date, 'Asia/Singapore')}<br />
      
      {task.status === "Completed" ? (
        <>
          <strong>End Date: </strong> {changeTimeZone(task.end_date, 'Asia/Singapore')}<br />
          <strong>Cycle Time: </strong> {task.cycle_time} day{'('}s{')'}
        </>
      ) : (
        <>
          <strong>Target End: </strong> {changeTimeZone(task.target_end_date, 'Asia/Singapore')}<br />
          <strong>Priority: </strong> {task.priority}
        </>
      )}

      <br /><div className="overflow-y-cust2"><strong>Comments: </strong>{task.task_comments}</div>
      <br />
      <strong>Assigned Users: </strong> {task.users.map(user => user.user_name).join(', ')}
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <button className="bg-gray-100 text-sm text-black p-1 mt-2 mb-1 ml-1 mr-1 border border-black rounded-md font-semibold" onClick={() => openAssignTaskModal(task)}>
          Assign
        </button>

        <button className="bg-gray-100 text-sm text-black p-1 mt-2 mb-1 ml-1 mr-1 border border-black rounded-md font-semibold" onClick={() => openUnAssignTaskModal(task)}>
          Unassign
        </button>

        <button className="bg-gray-100 text-sm text-black p-1 mt-2 mb-1 ml-1 mr-1 border border-black rounded-md font-semibold" onClick={() => openEditModal(task)}>
          Edit
        </button>

        <button className="bg-fuchsia-100 text-sm text-black p-1 mt-2 mb-1 ml-1 mr-1 border border-black rounded-md font-semibold" onClick={deleteTask}>
          Delete
        </button>
      </div>
      
      {assignTask && (
        <ChooseUser editingTask={assignTask} fetchAllTasks={fetchAllTasks} isOpen={isAssignTaskModalOpen} onClose={closeEditModal}/>
      )}

      {unassignTask && (
        <UnassignTask editingTask={unassignTask} fetchAllTasks={fetchAllTasks} isOpen={isUnAssignTaskModalOpen} onClose={closeEditModal}/>
      )}

      {editingTask && (
        <EditTasks editingTask={editingTask} fetchAllTasks={fetchAllTasks} isOpen={isEditModalOpen} onClose={closeEditModal}/>
      )}
      
    </div>
  );
}