import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL, modalStyles2 } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

export default function AddTasks(props) {
  const { project_id, fetchAllTasks, isOpen, onClose } = props;
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const [sel_DateTime, setDateTime] = useState(null);
  const handleDateTimeChange = (newValue) => {
    setDateTime(newValue);
    setNewTask({ ...newTask, target_end_date: new Date(newValue) });
  };

  const [newTask, setNewTask] = useState({
    description: null,
    start_date: null,
    end_date: null,
    target_end_date: null,
    cycle_time: null,
    target_cycle_time: null,
    priority: null,
    task_comments: null,
  });
  
  async function sendPostRequest() {
    try {
      const {
        description,
        start_date,
        end_date,
        target_end_date,
        cycle_time,
        target_cycle_time,
        priority,
        task_comments,
      } = newTask;
  
      const requestData = {
        task_description: description,
        project_id: project_id,
        status: "Backlog",
        start_date: start_date,
        end_date: end_date,
        target_end_date: target_end_date,
        cycle_time: cycle_time,
        target_cycle_time: target_cycle_time,
        priority: priority,
        task_comments: task_comments,
      };
  
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE
      });
  
      const response = await fetch(`${URL}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      setNewTask({
        description: null,
        start_date: null,
        end_date: null,
        target_end_date: null,
        cycle_time: null,
        target_cycle_time: null,
        priority: null,
        task_comments: null,
      });
  
      onClose();
      fetchAllTasks();
      navigate(`/tasks?proj_id=${project_id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  function handleSubmit(event) {
    // Check if Task Description is empty
    if (!newTask.description) {
      alert("Please fill in Task Description");
      return;
    }

    event.preventDefault();
    sendPostRequest();
  }  

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles2}>
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Task Description:</h3>
          <input
            type="text"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            placeholder="Description Here"
          />

          {Array(2).fill(<br />)}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              label="Target end date:"
              defaultValue={dayjs((new Date()).toISOString().slice(0, 16))}
              value={sel_DateTime}
              onChange={handleDateTimeChange}
            />
          </LocalizationProvider>
          
          {Array(2).fill(<br />)}
          <h3>Target Cycle Time:</h3>
          <input
            type="text"
            value={newTask.target_cycle_time}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*$/.test(inputValue)) {
                setNewTask({ ...newTask, target_cycle_time: inputValue });
              }
            }}
          />

          {Array(2).fill(<br />)}
          <h3>Priority:</h3>
          <input
            type="text"
            value={newTask.priority}
            onChange={(e) => {
              setNewTask({ ...newTask, priority: e.target.value })
            }}
          />

          {Array(2).fill(<br />)}
          <h3>Please add comments for the task:</h3>
          <textarea
            value={newTask.task_comments}
            onChange={(e) =>
              setNewTask({ ...newTask, task_comments: e.target.value })
            }
            placeholder="Task Comments"
            rows={5}
            style={{ width: "90%"}}
          />

          {Array(2).fill(<br />)}
          <button type="submit" className="bg-gray-100 text-black w-120 h-25 border border-black rounded-md m-1 font-semibold">Submit</button>
          {"        "}
          <button className="bg-gray-100 text-black w-120 h-25 border border-black rounded-md m-1 font-semibold" onClick={onClose}>Close</button>

        </form>
      </div>
    </Modal>
  );
}