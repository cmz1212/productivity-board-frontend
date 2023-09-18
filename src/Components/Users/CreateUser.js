import React, { useState } from "react";
import { URL } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreateUser({ project_id, onClose }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [newUser, setNewUser] = useState({
    user_name: null,
    user_role: null,
    image_link: null,
    additional_info: null,
    proj_id: project_id,
  });

  const sendPostRequest = async () => {
    if (isAuthenticated) {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });

      fetch(`${URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then(() => {
          setNewUser({
            user_name: null,
            user_role: null,
            image_link: null,
            additional_info: null,
            proj_id: null,
          });
          onClose();
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendPostRequest();
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>

        <h3>Please Input User's Name:</h3>
        <input
          type="text"
          value={newUser.user_name}
          onChange={(e) =>
            setNewUser({ ...newUser, user_name: e.target.value })
          }
          placeholder="Name Here"
        />

        {Array(2).fill(<br />)}
        <h3>User Role:</h3>
        <input
          type="text"
          value={newUser.user_role}
          onChange={(e) => {
            setNewUser({ ...newUser, user_role: e.target.value });
          }}
        />

        {Array(2).fill(<br />)}
        <h3>Upload Image(Optional):</h3>
        <input
          type="text"
          value={newUser.image_link}
          onChange={(e) => {
            setNewUser({ ...newUser, image_link: e.target.value });
          }}
        />

        {Array(2).fill(<br />)}
        <h3>Please add any additional information here:</h3>
        <textarea
          value={newUser.additional_info}
          onChange={(e) =>
            setNewUser({ ...newUser, additional_info: e.target.value })
          }
          placeholder="Additional Information"
          rows={6} // You can adjust this value to fit the desired number of lines
          style={{ width: "70%", resize: "vertical" }} // Optional styling for width and vertical resizing
        />

        {Array(3).fill(<br />)}
        <div className="button-group flex justify-left space-x-4">
          <button type="submit" className="submit-buttons">
            Submit
          </button>
          <button className="submit-buttons" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
      
    </div>
  );
}
