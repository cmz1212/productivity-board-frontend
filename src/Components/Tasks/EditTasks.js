import React, { useState } from "react";
import { URL, modalStyles2 } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

export default function EditTask(props) {
  const { editingTask, fetchAllTasks, isOpen, onClose } = props;
  const { getAccessTokenSilently } = useAuth0();

  const [sel_DateTime, setDateTime] = useState(null);
  const handleDateTimeChange = (newValue) => {
    setDateTime(newValue);
    setTask({ ...task, target_end: new Date(newValue) });
  };

  const [task, setTask] = useState({
    description: editingTask?.task_description || "",
    start_date: editingTask?.start_date || "",
    end_date: editingTask?.end_date || "",
    target_end: editingTask?.target_end_date || "",
    cycle_time: editingTask?.cycle_time || "",
    target_cycle: editingTask?.target_cycle_time || "",
    priority: editingTask?.priority || "",
    comment: editingTask?.task_comments || "",
  });
  
  async function sendPutRequest() {
    const requestData = {
      task_description: task.description,
      start_date: task.start_date,
      end_date: task.end_date,
      target_end_date: task.target_end,
      cycle_time: task.cycle_time,
      target_cycle_time: task.target_cycle,
      priority: task.priority,
      task_comments: task.comment,
    };

    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_API_AUDIENCE
    });

    const response = await fetch(`${URL}/task/${editingTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    setTask({
      description: "",
      start_date: "",
      end_date: "",
      target_end: "",
      cycle_time: "",
      target_cycle: "",
      priority: "",
      comment: "",
    });

    onClose();
    fetchAllTasks();
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPutRequest();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles2}>
      <div>
        <form onSubmit={handleSubmit}>
          <h3>Task Description:</h3>
          <input
            type="text"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Description Here"
          />

          {Array(2).fill(<br />)}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              label="Target End Date:"
              defaultValue={dayjs((new Date()).toISOString().slice(0, 16))}
              value={sel_DateTime}
              onChange={handleDateTimeChange}
            />
          </LocalizationProvider>

          {Array(2).fill(<br />)}
          <h3>Target Cycle Time:</h3>
          <input
            type="text"
            value={task.target_cycle}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^\d*$/.test(inputValue)) {
                setTask({ ...task, target_cycle: inputValue });
              }
            }}
          />

          {Array(2).fill(<br />)}
          <h3>Priority:</h3>
          <input
            type="text"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          />

          {Array(2).fill(<br />)}
          <h3>Please add comments for the task:</h3>
          <textarea
            value={task.comment}
            onChange={(e) => setTask({ ...task, comment: e.target.value })}
            placeholder="task comments"
            rows={5}
            style={{ width: "90%" }}
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