import React, { useState } from "react";
import { URL, modalStyles6 } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";

export default function EditUser(props) {
  const { editingUser, fetchAllUsers, isOpen, onClose } = props;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [User, setUser] = useState({
    user_name: editingUser?.user_name || "",
    user_role: editingUser?.user_role || "",
    image_link: editingUser?.image_link || "",
    additional_info: editingUser?.additional_info || "",
  });

  async function sendPutRequest() {
    if (isAuthenticated) {
      const requestData = {
        user_name: User.user_name,
        user_role: User.user_role,
        image_link: User.image_link,
        additional_info: User.additional_info,
      };

      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });

      fetch(`${URL}/User/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUser({
            user_name: data.user_name,
            user_role: null,
            image_link: null,
            additional_info: null,
          });
          onClose();
          fetchAllUsers();
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
      }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPutRequest();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles6}>
      <div>
        <form onSubmit={handleSubmit}>
          <h3>User Name:</h3>
          <input
            type="text"
            value={User.user_name}
            onChange={(e) => setUser({ ...User, user_name: e.target.value })}
            placeholder="Name Here"
          />

          {Array(2).fill(<br />)}
          <h3>Role:</h3>
          <input
            type="text"
            value={User.user_role}
            onChange={(e) => setUser({ ...User, user_role: e.target.value })}
          />
          {Array(2).fill(<br />)}
          <h3>Link to user image:</h3>
          <input
            type="text"
            value={User.image_link}
            onChange={(e) => setUser({ ...User, image_link: e.target.value })}
          />

          {Array(2).fill(<br />)}
          <h3>Please add comments for the User:</h3>
          <textarea
            value={User.additional_info}
            onChange={(e) =>
              setUser({ ...User, additional_info: e.target.value })
            }
            placeholder="Additional information"
            rows={5}
            style={{ width: "70%"}}
          />

          {Array(2).fill(<br />)}
          <button type="submit" className="bg-gray-100 text-black w-120 h-25 border border-black rounded-md m-1 font-semibold"> Submit </button>
          {"    "}{"    "}
          <button className="bg-gray-100 text-black w-120 h-25 border border-black rounded-md m-1 font-semibold" onClick={onClose}> Close </button>
        </form>
      </div>
    </Modal>
  );
}