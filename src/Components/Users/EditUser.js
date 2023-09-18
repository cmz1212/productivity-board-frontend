import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL, customStyles2 } from "../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-modal";

export default function EditUser(props) {
  const { editingUser, isOpen, onClose, isEdit } = props;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const [User, setUser] = useState({
    user_name: editingUser?.user_name || "",
    user_role: editingUser?.user_role || "",
    image_link: editingUser?.image_link || "",
    additional_info: editingUser?.additional_info || "",
  });

  function sendPutRequest() {
    const requestData = {
      user_name: User.user_name,
      user_role: User.user_role,
      image_link: User.image_link,
      additional_info: User.additional_info,
    };

    if (isAuthenticated) {

      const fetchData = async () => {
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

            if (isEdit) {
              navigate(`/users/select`);
            } else {
              navigate(`/users`);
            }
            
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      }

      fetchData();
    }

    onClose();
    window.location.reload();
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendPutRequest();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles2}>
      <div>
        <form onSubmit={handleSubmit} className="forms">
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
            rows={6} // You can adjust this value to fit the desired number of lines
            style={{ width: "70%", resize: "vertical" }} // Optional styling for width and vertical resizing
          />

          {Array(3).fill(<br />)}
          <button type="submit" className="submit-buttons">
            Submit
          </button>
          {"    "}
          {"    "}
          <button className="back-buttons" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </Modal>
  );
}
