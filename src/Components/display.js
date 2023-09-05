import { Component } from "react";
import { Link } from "react-router-dom";

export const URL = process.env.REACT_APP_BACKEND_URL;

export default class Display extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
    };
  }
  componentDidMount() {
    const url = `${URL}/project`;
    fetch(url) // Send GET request to '/sightings' endpoint
      .then((response) => response.json())
      .then((data) => {
        this.setState({ projects: data }); // Update the 'sightings' state with the fetched data
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
  render() {
    const projects = this.state.projects;
    return (
      <div>
        {projects ? (
          <div>
            {projects.map((projects, index) => (
              <div key={index + 1}>
                Project: {projects.project_description}
                <br />
                <Link to={`/projects/display_by_id?id=${projects.id}`}>
                  View details
                </Link>
              </div>
            ))}
          </div>
        ) : null}
        <br />
        <Link to ="/projects/post_project">Add new project</Link>
        <br/>
        <Link to="/">Home</Link>
      </div>
    );
  }
}
