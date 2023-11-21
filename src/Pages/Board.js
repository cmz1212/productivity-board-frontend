import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL, getDaysDifferenceWithTimeZone, refreshCurPage } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";
import { DragDropContext } from "react-beautiful-dnd";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Column from "../Components/Tasks/Column";
import { getStatusFromColumnId, isValidColumn } from "../Components/Tasks/GetColumnStatus";
import AddTasks from "../Components/Tasks/AddTasks";
import AllUsers from "../Components/Users/AllUsers";
import DeleteTask from "../Components/Tasks/DeleteTask";

export default function Board() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const userName = isAuthenticated ? user.name : null;
  const [tasks, setTasks] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const proj_id = searchParams.get("proj_id");

  const [project_id, setProjID] = useState(null);
  const [project_id2, setProjID2] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
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
    fetchAllTasks();
  };
  const closeAllUsersModal = () => {
    setProjID2(null);
    setIsAllUsersModalOpen(false);
    fetchAllTasks();
  }

  const onDeleteTask = async (taskId) => {
    await DeleteTask(taskId, getAccessTokenSilently);
    fetchAllTasks();
  };
  
  // eslint-disable-next-line
  const fetchAllTasks = async () => {
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
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllTasks();
    }
  }, [isAuthenticated, fetchAllTasks]);
  
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
      (task) => task.id === parseInt(result.draggableId, 10)
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
      updateTaskStatus(movedTask.id, updatedStatus2, null, currentDate, getDaysDifferenceWithTimeZone(parseStartDate.toISOString(), currentDate.toISOString(), 'Asia/Singapore'));
    }
    else {
      updateTaskStatus(movedTask.id, updatedStatus2);
    } 

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
        fetchAllTasks();
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  
  return (
    <div className="grid justify-items-center bg-white w-full overflow-y-auto">
      <Navbar isAuthenticated={isAuthenticated} userName={userName} />
      {Array(2).fill(<br />)}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex">
          <Column columnId="backlog" tasks={tasks} fetchAllTasks={fetchAllTasks} onDelete={onDeleteTask}/>
          <Column columnId="todo" tasks={tasks} fetchAllTasks={fetchAllTasks} onDelete={onDeleteTask}/>
          <Column columnId="inProgress" tasks={tasks} fetchAllTasks={fetchAllTasks} onDelete={onDeleteTask}/>
          <Column columnId="review" tasks={tasks} fetchAllTasks={fetchAllTasks} onDelete={onDeleteTask}/>
          <Column columnId="completed" tasks={tasks} fetchAllTasks={fetchAllTasks} onDelete={onDeleteTask}/>
        </div>
      </DragDropContext>
      <br />
      <div className="button-group flex justify-center space-x-4 mt-1 mb-1">
        <button onClick={() => openPostModal(proj_id)}
          className="border-2 border-black rounded-md bg-sky-50 p-3 w-250 h-35 flex items-center justify-center font-bold hover:bg-sky-800">
          Add Tasks
        </button>
        <button onClick={() => showAllUsersModal(proj_id)}
          className="border-2 border-black rounded-md bg-sky-50 p-3 w-250 h-35 flex items-center justify-center font-bold hover:bg-sky-800">
          View All Users
        </button>
        <button onClick={refreshCurPage}
          className="border-2 border-black rounded-md bg-sky-50 p-3 w-250 h-35 flex items-center justify-center font-bold hover:bg-sky-800">
          Refresh
        </button>
        <button className="border-2 border-black rounded-md bg-sky-50 p-3 w-250 h-35 flex items-center justify-center font-bold hover:bg-sky-800">
          <Link to="/projects">Back: Projects</Link>
        </button>
      </div>

      <AddTasks
        project_id={project_id? project_id : null}
        fetchAllTasks={fetchAllTasks}
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