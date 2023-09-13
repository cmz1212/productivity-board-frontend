import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL } from "../constants";
import DisplayTask from "../Components/Tasks/DisplayTasks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth0 } from "@auth0/auth0-react";
import "./ProjPage.css";

const url = `${URL}/task`;

// Define getStatusFromColumnId function here
const getStatusFromColumnId = (columnId) => {
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
};

export default function Board() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [tasks, setTasks] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const proj_id = searchParams.get("proj_id");

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
  }, [proj_id, isAuthenticated, getAccessTokenSilently]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      // Handle the case when the task is not dropped into a valid droppable area
      return;
    }

    const updatedTasks = [...tasks];

    // Find the moved task by its id
    const movedTask = updatedTasks.find(
      (task) => task.id === result.draggableId
    );

    console.log(`Moved task: ${movedTask.task_description}`);

    // Update the task status based on the column
    const columnId = result.destination.droppableId;

    if (!isValidColumn(columnId)) {
      // Handle the case when the task is dropped into an invalid column
      return;
    }

    const updatedStatus = getStatusFromColumnId(columnId);

    // Update the task status in the local state
    movedTask.status = updatedStatus;
    setTasks(updatedTasks);

    // Make an API call to update the task's status on the server
    updateTaskStatus(movedTask.id, updatedStatus);
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
        <Droppable droppableId="board" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="board"
            >
              <Column columnId="backlog" tasks={tasks} />
              <Column columnId="todo" tasks={tasks} />
              <Column columnId="inProgress" tasks={tasks} />
              <Column columnId="review" tasks={tasks} />
              <Column columnId="completed" tasks={tasks} />

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <br />
      <button>
        <Link to={`/tasks/add?proj_id=${proj_id}`}>Add tasks</Link>{" "}
      </button>
      <br />
      <button>
        <Link to="/projects">Choose another project</Link>
      </button>
      <br />
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}

function Column({ columnId, tasks }) {
  const columnTasks = tasks.filter(
    (task) => task.status === getStatusFromColumnId(columnId)
  );

  return (
    <div className="column" id={columnId}>
      <h2>{columnId}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {columnTasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DisplayTask key={task.id} task={task} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
