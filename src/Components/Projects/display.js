import { Component } from "react";
import { Link } from "react-router-dom";
import "./ProjPage.css";

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
      <div className="background">
        {projects ? (
          <div>
            {projects.map((projects, index) => (
              <div key={index + 1} className="project-space">
                Project: {projects.project_description}
                <br />
                <button className="edit-buttons">
                  {" "}
                  <Link to={`/projects/display_by_id?id=${projects.id}`}>
                    View details
                  </Link>
                </button>
              </div>
            ))}
          </div>
        ) : null}
        <br />
        <button className="edit-buttons">
        <Link to="/projects/post_project">Add new project</Link></button>
        <br />
        <button className="home-buttons">
        <Link to="/">Home</Link></button>
      </div>
    );
  }
}
