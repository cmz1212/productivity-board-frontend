import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL } from "../constants";
import Column from "../Components/Tasks/Column";
import DeleteTask from "../Components/Tasks/DeleteTask";
import { DragDropContext } from "react-beautiful-dnd";
import { useAuth0 } from "@auth0/auth0-react";
import "./ProjPage.css";

const url = `${URL}/task`;

// Define getStatusFromColumnId function here
export function getStatusFromColumnId(columnId) {
  switch (columnId) {
    case "backlog":
      return "Backlog";
    case "todo":
      return "To Do";
    case "inProgress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "review":
      return "Review";
    default:
      return "";
  }
}

export default function Board() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [tasks, setTasks] = useState([]);

  const [isTaskDeleted, setIsTaskDeleted] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const proj_id = searchParams.get("proj_id");
  const onDeleteTask = async (taskId) => {
    const result = await DeleteTask(taskId, getAccessTokenSilently);
    if (result.success) {
      setIsTaskDeleted(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_AUDIENCE,
        });

        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            let task_list = [];
            for (const task in data) {
              if (data[task].project_id === proj_id) {
                task_list.push(data[task]);
              }
            }

            setTasks(task_list);
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      };

      fetchData();
    }
  }, [proj_id, isAuthenticated, getAccessTokenSilently, isTaskDeleted]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      // Handle the case when the task is not dropped into a valid droppable area
      return;
    }

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    const updatedTasks = [...tasks];

    // Find the moved task by its id
    const movedTask = updatedTasks.find(
      (task) => task.id === result.draggableId
    );

    // Update the task status based on the column
    //const columnId1 = result.source.droppableId;
    const columnId2 = result.destination.droppableId;

    if (!isValidColumn(columnId2)) {
      // Handle the case when the task is dropped into an invalid column
      return;
    }

    //const updatedStatus1 = getStatusFromColumnId(columnId1);
    const updatedStatus2 = getStatusFromColumnId(columnId2);

    // Update the task status in the local state
    movedTask.status = updatedStatus2;
    setTasks(updatedTasks);

    // Make an API call to update the task's status on the server
    updateTaskStatus(movedTask.id, updatedStatus2);
  };

  const isValidColumn = (columnId) => {
    // Add logic to check if columnId is a valid column
    // For example, you can check if columnId is one of the valid column names
    const validColumns = [
      "backlog",
      "todo",
      "inProgress",
      "review",
      "completed",
    ];
    return validColumns.includes(columnId);
  };

  const updateTaskStatus = async (taskId, status) => {
    // Make an API call to update the task's status here
    const updateUrl = `${URL}/task/${taskId}`;
    const requestData = { status };

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_API_AUDIENCE,
    });

    fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          <Column columnId="backlog" tasks={tasks} onDelete={onDeleteTask} />
          <Column columnId="todo" tasks={tasks} onDelete={onDeleteTask} />
          <Column columnId="inProgress" tasks={tasks} onDelete={onDeleteTask} />
          <Column columnId="review" tasks={tasks} onDelete={onDeleteTask} />
          <Column columnId="completed" tasks={tasks} onDelete={onDeleteTask} />
        </div>
      </DragDropContext>
      <br />
      <button className="edit-buttons">
        <Link to={`/tasks/add?proj_id=${proj_id}`}>Add tasks</Link>{" "}
      </button>
      <br />
      <button className="edit-buttons">
        <Link to={`/users`}>View participants</Link>{" "}
      </button>
      <br />
      <button className="edit-buttons">
        <Link to="/projects">Choose another project</Link>
      </button>
      <br />
      <button className="home-buttons">
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
