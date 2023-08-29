import { Component } from "react";
import { Link } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL;

export default class Display extends Component {
    constructor(){
        super();
        this.state={
            projects:[]
        }
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
    render(){
        const projects = this.state.projects;
  return (
    <div>
        {projects ? (
          <div>
            {projects.map((projects, index) => (
              <div key={index + 1}>
                Project ID: {projects.id}
                <br />Description: {projects.project_description}
                <br />WIP limit: {projects.wip_limit}
                <br />cycle time: {projects.cycle_time_limit}
                <br />Comments: {projects.project_comments}<br />
                </div>
            ))}
          </div>
        ) : null}
      <br />
      <Link to="/">Home</Link>
    </div>
  );
}}
