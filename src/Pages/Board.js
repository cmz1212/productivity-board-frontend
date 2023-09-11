import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL } from "../constants";
import DisplayTask from "../Components/Tasks/DisplayTasks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const url = `${URL}/task`;

export default function Board() {
  const [tasks, setTasks] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const proj_id = searchParams.get("proj_id");

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

  useEffect(() => {
    fetch(url)
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
  }, [proj_id]);

  // Function to update task status when dragged and dropped
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    // Update the task status based on the column
    const columnId = result.destination.droppableId;
    const updatedStatus = getStatusFromColumnId(columnId);

    // Update the task status in the local state
    movedTask.status = updatedStatus;
    setTasks(updatedTasks);

    // Make an API call to update the task's status on the server
    updateTaskStatus(movedTask.id, updatedStatus);
  };

  const updateTaskStatus = (taskId, status) => {
    // Make an API call to update the task's status here
    // You can use the `fetch` method to update the task's status on the server
    // Example:
    const updateUrl = `${url}/${taskId}`;
    const requestData = { status };
    fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
        <Link to="/projects/display">Choose another project</Link>
      </button>
      <br />
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}

function Column({ columnId, tasks }) {
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
