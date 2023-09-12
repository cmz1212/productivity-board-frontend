import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL } from "../constants";
import DisplayTask from "../Components/Tasks/DisplayTasks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth0 } from "@auth0/auth0-react";


// Tutorial site for react-beautiful-dnd
//const website="https://egghead.io/lessons/react-customise-the-appearance-of-an-app-during-a-drag-using-react-beautiful-dnd-snapshot-values";

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
  const { isAuthenticated, getAccessTokenSilently} = useAuth0();
  const [tasks, setTasks] = useState([]);
  const [isValidBacklog, setIsValidBacklog] = useState(true);
  const [isValidTodo, setIsValidTodo] = useState(true);
  const [isValidInProgress, setIsValidInProgress] = useState(true);
  const [isValidReview, setIsValidReview] = useState(true);
  const [isValidCompleted, setIsValidCompleted] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const proj_id = searchParams.get("proj_id");

  useEffect(() => {

    if (isAuthenticated) {

      const fetchData = async () => {
        const url = `${URL}/task`;
        
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_API_AUDIENCE
        })

        

        fetch(url,
          {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ).then((response) => response.json())
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
  const handleBeforeDragStart = (start) => {
    // You can access the task being dragged using start.draggable
    const draggedTask = tasks.find((task) => task.id === start.draggableId);

    // Perform your validation logic here
    if (!isValidDrag(draggedTask)) {
      // Prevent the drag if it's not valid
      return false;
    }
    return true; // Allow the drag if it's valid
  };

  // Define your validation logic here
  const isValidDrag = (task) => {
    // Implement your custom validation logic here

    return true;
  };
  const handleBeforeDrop = (dropResult) => {
    // You can access the task being dropped using dropResult.draggable
    const droppedTask = tasks.find(
      (task) => task.id === dropResult.draggableId
    );

    // Perform your validation logic here and update the state variables accordingly
    const isValid = isValidDrop(
      droppedTask,
      dropResult.destination.droppableId
    );
    switch (dropResult.destination.droppableId) {
      case "backlog":
        setIsValidBacklog(isValid);
        break;
      case "todo":
        setIsValidTodo(isValid);
        break;
      case "inProgress":
        setIsValidInProgress(isValid);
        break;
      case "review":
        setIsValidReview(isValid);
        break;
      case "completed":
        setIsValidCompleted(isValid);
        break;
      default:
        break;
    }

    // Prevent the drop if it's not valid
    return isValid;
  };

  // Define your validation logic here
  const isValidDrop = (task, destinationColumnId) => {
    // Implement your custom validation logic here

    return destinationColumnId !== null;
  };
  const updateTaskStatus = async(taskId, status) => {
    // Make an API call to update the task's status here
    const updateUrl = `${URL}/task/${taskId}`;
    const requestData = { status };

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_API_AUDIENCE
    })

    

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
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={handleBeforeDragStart}
        onBeforeDrop={handleBeforeDrop}
      >
        <Droppable droppableId="board" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="board"
            >
              <Column
                columnId="backlog"
                tasks={tasks}
                isValid={isValidBacklog}
              />
              <Column columnId="todo" tasks={tasks} isValid={isValidTodo} />
              <Column
                columnId="inProgress"
                tasks={tasks}
                isValid={isValidInProgress}
              />
              <Column columnId="review" tasks={tasks} isValid={isValidReview} />
              <Column
                columnId="completed"
                tasks={tasks}
                isValid={isValidCompleted}
              />

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

function Column({ columnId, tasks, isValid }) {
  const columnTasks = tasks.filter(
    (task) => task.status === getStatusFromColumnId(columnId)
  );

  // Use the isValid prop to conditionally apply the class name
  const columnClassName = `column ${
    isValid ? "valid-drop-area" : "invalid-drop-area"
  }`;

  return (
    <div className={columnClassName} id={columnId}>
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
