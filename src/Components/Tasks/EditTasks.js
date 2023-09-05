import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../constants";

export default function EditTask(props) {
  const { task_id } = props;
  const [task, setTask] = useState({
    description: null,
    project_id: null,
    start_date: null,
    end_date: null,
    target_end: null,
    cycle_time: null,
    target_cycle: null,
    priority: null,
    comment: null,
  });
  const navigate = useNavigate();
  function sendPutRequest() {
    const url = `${URL}/task/${task_id}`;

    const requestData = {
      task_description: task.description,
      start_date: task.wip,
      end_date: task.end_date,
      target_end_date: task.target_end,
      cycle_time: task.cycle_time,
      target_cycle_time: task.target_cycle,
      priority: task.priority,
      task_comments: task.comment,
    };
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTask({
          description: data.task_description,
          start_date: null,
          end_date: null,
          target_end: null,
          cycle_time: null,
          target_cycle: null,
          priority: null,
          comment: null,
        });
        console.log(data);

        navigate(`/tasks?proj_id=${data.project_id}`);
      })

      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
  function handleSubmit(event) {
    event.preventDefault();

    sendPutRequest();
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="forms">
        <h3>Input new task description(if any):</h3>
        <input
          type="text"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Description Here"
        />
        <br />
        <h3>New start date(if any):</h3>
        <input
          type="text"
          value={task.start_date}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
              setTask({ ...task, start_date: inputValue });
            }
          }}
        />
        <br />
        <h3>New end date limit(if any):</h3>
        <input
          type="text"
          value={task.end_date}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
              setTask({ ...task, end_date: inputValue });
            }
          }}
        />
        <br />
        <h3>New target end date(if any):</h3>
        <input
          type="text"
          value={task.target_end}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
              setTask({ ...task, target_end: inputValue });
            }
          }}
        />
        <br />
        <h3>New cycle time limit(if any):</h3>
        <input
          type="text"
          value={task.cycle_time}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
              setTask({ ...task, cycle_time: inputValue });
            }
          }}
        />
        <br />
        <h3>New target cycle time(if any):</h3>
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
        <br />
        <h3>New priority level(if any):</h3>
        <input
          type="text"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        />
        <br />
        <h3>New comments for the task(if any):</h3>
        <textarea
          value={task.comment}
          onChange={(e) => setTask({ ...task, comment: e.target.value })}
          placeholder="task comments"
          rows={8} // You can adjust this value to fit the desired number of lines
          style={{ width: "90%", resize: "vertical" }} // Optional styling for width and vertical resizing
        />
        <br />

        <button type="submit" className="submit-buttons">
          Submit
        </button>
      </form>
      <br />
      <button className="home-buttons">
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
