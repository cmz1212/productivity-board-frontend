import { URL } from "../../constants";

export default async function DeleteUser(id, getAccessTokenSilently) {

  const confirmed = window.confirm("Deletion is irreversible! \n Are you sure you want to delete this user?");

  if (confirmed) {

    const sendDeleteUserRequest = async () => {

      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_API_AUDIENCE,
      });

      await fetch(`${URL}/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

    }

    await sendDeleteUserRequest();
    window.location.reload();
    
  }
}
