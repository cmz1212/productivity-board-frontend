import React from "react";
import { Link } from "react-router-dom";

export default function DisplayTask(props) {
  const { task, onDelete } = props;

  // Function to delete the task
  const deleteTask = () => {
    onDelete(task.id);
  };
  return (
    <div>
      Description: {task.task_description}
      <br />
      Status: {task.status}
      <br />
      Start time: {task.start_date}
      <br />
      Target end time: {task.target_end_date}
      <br />
      Priority: {task.priority}
      <br />
      Comments: {task.task_comments}
      <br />
      <button className="edit-buttons">
        <Link to={`/tasks/edit/${task.id}`}>Edit task</Link>
      </button>
      {"  "}
      <button className="delete-buttons" onClick={deleteTask}>
        Delete task
      </button>
      <br />
      <button className="edit-buttons">
        <Link to={`/users/select`}>Assign task</Link>
      </button>
    </div>
  );
}
