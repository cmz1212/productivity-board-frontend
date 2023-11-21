import React, { useState } from "react";
import { URL } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreateUser(props) {
  const { project_id, fetchAllUsers, onClose } = props;
  const { getAccessTokenSilently } = useAuth0();

  const [newUser, setNewUser] = useState({
    user_name: null,
    user_role: null,
    image_link: null,
    additional_info: null,
    proj_id: project_id,
  });

  const sendPostRequest = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });

      await fetch(`${URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newUser),
      })
        
      setNewUser({
        user_name: null,
        user_role: null,
        image_link: null,
        additional_info: null,
        proj_id: null,
      });
      
    } catch (error) {
      console.error("Error: ", error.message);
    }

    onClose();
    fetchAllUsers();
  };

  const handleSubmit = (event) => {
    // Check if all fields are filled up
    if (!newUser.user_name || !newUser.user_role|| !newUser.additional_info) {
      alert("Please fill in all required fields");
      return;
    }
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
          rows={6}
          style={{ width: "70%"}}
        />

        {Array(3).fill(<br />)}
        <div className="button-group flex justify-left space-x-4">
          <button type="submit" className="bg-gray-100 text-black w-120 h-25 border border-black rounded-md m-1 font-semibold">
            Submit
          </button>
          <button className="bg-gray-100 text-black w-120 h-25 border border-black rounded-md m-1 font-semibold" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}