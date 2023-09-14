import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { URL } from "../../constants";
const url = `${URL}/user`;

export default function CreateUser() {
  const [newUser, setNewUser] = useState({
    user_name: null,
    user_role: null,
    image_link: null,
    additonal_info: null,
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const taskID = searchParams.get("task_id");
  const bool = searchParams.get("create");
  const navigate = useNavigate();
  console.log(bool);
  async function sendPostRequest() {
    const {
      user_name,

      user_role,
      image_link,
      additonal_info,
    } = newUser;

    const requestData = {
      user_name: user_name,
      user_role: user_role,

      image_link: image_link,

      additonal_info: additonal_info,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${accessToken}`,
      },

      body: JSON.stringify(requestData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNewUser({
          user_name: null,
          user_role: null,
          image_link: null,
          additonal_info: null,
        });
        if (bool) {
          navigate(`/users/select`);
        } else {
          navigate(`/users`);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function handleSubmit(event) {
    event.preventDefault();
    sendPostRequest();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Please input participant's name:</h3>
        <input
          type="text"
          value={newUser.user_name}
          onChange={(e) =>
            setNewUser({ ...newUser, user_name: e.target.value })
          }
          placeholder="Name Here"
        />

        <br />

        <h3>Participant role:</h3>
        <input
          type="text"
          value={newUser.user_role}
          onChange={(e) => {
            setNewUser({ ...newUser, user_role: e.target.value });
          }}
        />
        <br />
        <h3>Upload image(optional):</h3>
        <input
          type="text"
          value={newUser.image_link}
          onChange={(e) => {
            setNewUser({ ...newUser, image_link: e.target.value });
          }}
        />
        <br />

        <h3>Please add any additional participant information here:</h3>
        <textarea
          value={newUser.additonal_info}
          onChange={(e) =>
            setNewUser({ ...newUser, additonal_info: e.target.value })
          }
          placeholder="Additional informations"
          rows={6} // You can adjust this value to fit the desired number of lines
          style={{ width: "70%", resize: "vertical" }} // Optional styling for width and vertical resizing
        />
        <br />

        <button type="submit" className="submit-buttons">
          Submit
        </button>
      </form>
      <br />
      {bool ? (
        <button className="home-buttons">
          <Link to={`/users/select?task_id=${taskID}`}>Back</Link>{" "}
        </button>
      ) : (
        <button className="home-buttons">
          <Link to={`/users`}>Back</Link>{" "}
        </button>
      )}
      <br />
      <button className="home-buttons">
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}
