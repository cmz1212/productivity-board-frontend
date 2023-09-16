import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL } from "../constants";
import Column from "../Components/Tasks/Column";
import DeleteTask from "../Components/Tasks/DeleteTask";
import { DragDropContext } from "react-beautiful-dnd";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AddTasks from "../Components/Tasks/AddTasks";

export function DaysBetweenDates({ cal_start_date, cal_end_date }) {

  const cal_startDate = new Date(cal_start_date);
  // Calculate the difference in days
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((cal_end_date - cal_startDate) / oneDay));

  return diffDays;
}

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
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const userName = isAuthenticated ? user.name : null;
  const [tasks, setTasks] = useState([]);
  const [isTaskDeleted, setIsTaskDeleted] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const proj_id = searchParams.get("proj_id");

  // State variable to control the visibility of the AddTasks modal
  // State variable to set state for AddTasks Modal
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [project_id, setProjID] = useState(null);
  const [isModalEdited, setisModalEdited] = useState(false);
  const [isModalEdited2, setisModalEdited2] = useState(false);

  // Function to open the AddTasks Modal
  const openPostModal = (project_id) => {
    setProjID(project_id);
    setIsPostModalOpen(true);
  };

  // Function to close the AddTasks Modal
  const closePostModal = () => {
    setProjID(null);
    setIsPostModalOpen(false);
    setisModalEdited(true);
  };

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

        fetch(`${URL}/task`, {
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
  }, [proj_id, isAuthenticated, getAccessTokenSilently, isTaskDeleted, isModalEdited, isModalEdited2]);

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
    movedTask.status = updatedStatus2;
    setTasks(updatedTasks);

    const currentDate = new Date();
    if (columnId2==="todo") {
      updateTaskStatus(movedTask.id, updatedStatus2, currentDate, null, null);
      window.location.reload();
    }
    else if (columnId2==="completed") {
      updateTaskStatus(movedTask.id, updatedStatus2, null, currentDate, DaysBetweenDates(movedTask.start_date, currentDate));
      window.location.reload();
    }
    else {
      updateTaskStatus(movedTask.id, updatedStatus2);
    } 

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

  const updateTaskStatus = async (taskId, status, start_date = null, end_date = null, cycle_time = null) => {
    // Make an API call to update the task's status here
    const updateUrl = `${URL}/task/${taskId}`;

    let requestData = {
      status
    };

    if (start_date) {
      requestData.start_date = start_date;
    }

    if (end_date) {
        requestData.end_date = end_date;
    }

    if (cycle_time) {
        requestData.cycle_time = cycle_time;
    }

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
    <div className="grid justify-items-center bg-sky-950 w-full h-screen overflow-y-auto">
      <Navbar isAuthenticated={isAuthenticated} userName={userName} />
      {Array(2).fill(<br />)}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          <Column columnId="backlog" tasks={tasks} onDelete={onDeleteTask} setisModalEdited2={setisModalEdited2}/>
          <Column columnId="todo" tasks={tasks} onDelete={onDeleteTask} setisModalEdited2={setisModalEdited2}/>
          <Column columnId="inProgress" tasks={tasks} onDelete={onDeleteTask} setisModalEdited2={setisModalEdited2}/>
          <Column columnId="review" tasks={tasks} onDelete={onDeleteTask} setisModalEdited2={setisModalEdited2}/>
          <Column columnId="completed" tasks={tasks} onDelete={onDeleteTask} setisModalEdited2={setisModalEdited2}/>
        </div>
      </DragDropContext>
      <br />
      <div className="button-group flex justify-center space-x-4">
        <button className="task-buttons" onClick={() => openPostModal(proj_id)}>
          Add Tasks
        </button>
        <button className="task-buttons">
          <Link to={`/users?proj_id=${proj_id}`}>View All Users</Link>
        </button>
        <button className="task-buttons">
          <Link to="/projects">Back: Projects</Link>
        </button>
      </div>

      <AddTasks
        project_id={project_id? project_id : null}
        isOpen={isPostModalOpen}
        onClose={closePostModal}
      />

      <Footer />
    </div>
  );
}
