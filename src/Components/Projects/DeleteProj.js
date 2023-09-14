import { URL } from "../../constants";

export default async function DeleteProj(id, getAccessTokenSilently) {
  const url = `${URL}/project/${id}`;

  const accessToken = await getAccessTokenSilently({
    audience: process.env.REACT_APP_API_AUDIENCE,
  });
  const confirmed = window.confirm(
    "Deletion is irreversible! \n Are you sure you want to delete this project?"
  );
  if (confirmed) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        return { success: true };
      } else {
        console.error("Error: ", response.statusText);
        return { success: false };
      }
    } catch (error) {
      console.error("Error: ", error.message);
      return { success: false };
    }
  }
}
