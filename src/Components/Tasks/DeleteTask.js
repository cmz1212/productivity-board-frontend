import { URL } from "../../constants";

export default async function DeleteTask(id, getAccessTokenSilently) {

  const confirmed = window.confirm("Deletion is irreversible! \n Are you sure you want to delete this task?");

  if (confirmed) {
    const sendDeleteTaskRequest = async () => {
    
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });

      await fetch(`${URL}/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

    }

    sendDeleteTaskRequest();
  }
}