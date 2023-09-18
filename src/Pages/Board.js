import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL, getDaysDifferenceWithTimeZone, refreshCurPage } from "../constants";
import Column from "../Components/Tasks/Column";
import DeleteTask from "../Components/Tasks/DeleteTask";
import { DragDropContext } from "react-beautiful-dnd";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AddTasks from "../Components/Tasks/AddTasks";
import AllUsers from "../Components/Users/AllUsers";

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

  // State variable to control the visibility of Modals
  // State variable to set state for Modals
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [project_id, setProjID] = useState(null);
  const [project_id2, setProjID2] = useState(null);
  const [isModalEdited, setisModalEdited] = useState(false);
  const [isModalEdited2, setisModalEdited2] = useState(false);
  const [isAllUsersModalOpen, setIsAllUsersModalOpen] = useState(false);


  // Function to open Modals
  const openPostModal = (project_id) => {
    setProjID(project_id);
    setIsPostModalOpen(true);
  };
  const showAllUsersModal = (project_id2) => {
    setProjID2(project_id2);
    setIsAllUsersModalOpen(true);
  }

  // Function to close Modals
  const closePostModal = () => {
    setProjID(null);
    setIsPostModalOpen(false);
    setisModalEdited(true);
  };
  const closeAllUsersModal = () => {
    setProjID2(null);
    setIsAllUsersModalOpen(false);
  }

  const onDeleteTask = async (taskId) => {
    const result = await DeleteTask(taskId, getAccessTokenSilently);
    if (result.success) {
      setIsTaskDeleted(true);
    }
  };

  const fetchData = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }
    
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });
  
      const response = await fetch(`${URL}/task`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
      let task_list = [];
      for (const task in data) {
        if (data[task].project_id === proj_id) {
          task_list.push(data[task]);
        }
      }
  
      setTasks(task_list);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }, [isAuthenticated, getAccessTokenSilently, proj_id]);  

  useEffect(() => {
    fetchData();
  }, [fetchData, isTaskDeleted, isModalEdited, isModalEdited2]);
  

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

    // Update the task status based on the column;
    const columnId2 = result.destination.droppableId;

    if (!isValidColumn(columnId2)) {
      // Handle the case when the task is dropped into an invalid column
      return;
    }

    const updatedStatus2 = getStatusFromColumnId(columnId2);
    movedTask.status = updatedStatus2;
    setTasks(updatedTasks);

    const currentDate = new Date();
    const parseStartDate = new Date(movedTask.start_date);
    if (columnId2==="todo") {
      updateTaskStatus(movedTask.id, updatedStatus2, currentDate, null, null);
    }
    else if (columnId2==="completed") {
      updateTaskStatus(movedTask.id, updatedStatus2, null, currentDate, getDaysDifferenceWithTimeZone(parseStartDate.toISOString(), currentDate.toISOString() , 'Asia/Singapore'));
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
  
    let requestData = { status };
  
    if (start_date) { requestData.start_date = start_date; }
    if (end_date) { requestData.end_date = end_date; }
    if (cycle_time) { requestData.cycle_time = cycle_time;}
  
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });
  
      const response = await fetch(`${URL}/task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        // After updating the task, re-fetch the tasks to reflect the latest data in the UI
        fetchData();
      } else {
        // handle potential errors from the server
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
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
        <button className="task-buttons" onClick={() => showAllUsersModal(proj_id)}>
          View All Users
        </button>
        <button className="task-buttons" onClick={refreshCurPage}>
          Refresh
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

      <AllUsers
        project_id2={project_id2? project_id2 : null}
        isOpen={isAllUsersModalOpen}
        onClose={closeAllUsersModal}
      />

      <Footer />
    </div>
  );
}
