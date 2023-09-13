import { URL } from "../../constants";

export default async function DeleteProj(id, getAccessTokenSilently, navigate) {

  const confirmed = window.confirm(
    "Deletion is irreversible! \n Are you sure you want to delete this project?"
  );

  if (confirmed) {
      const url = `${URL}/project/${id}`;

      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE
      })

      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {
          // Trigger navigation only when the deletion is confirmed
          navigate(`/projects`);
        })
        .catch((error) => {
          console.error("Error: ", error.message);
        });
    }
    
}
