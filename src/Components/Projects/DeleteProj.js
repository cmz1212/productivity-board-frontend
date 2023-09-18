import { URL } from "../../constants";

export default async function DeleteProj(id, getAccessTokenSilently) {

  const confirmed = window.confirm("Deletion is irreversible! \n Are you sure you want to delete this project?");

  if (confirmed) {

    const sendDeleteProjRequest = async () => {

      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });

      await fetch(`${URL}/project/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
    }

    await sendDeleteProjRequest();
    window.location.reload();

  }
}
