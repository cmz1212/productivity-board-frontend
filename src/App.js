import React, { Component } from "react";
import "./App.css";
import Routing from "./Routing";
import { Link, useLocation } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Project kanban</p>
          <NavigationLinks />
          <Routing />
        </header>
      </div>
    );
  }
}

function NavigationLinks() {
  const location = useLocation();

  // Render the links only on the homepage ("/")
  if (location.pathname === "/") {
    return (
      <div>
        <Link to="/display">Project data display</Link>
        <br />
        <Link to="/post_project">Add new project</Link>
        <br />
        <Link to="/edit_project">Edit existing project</Link>
        <br /> <Link to="/tasks">Tasks </Link>
        <br /> <Link to="/users">Users</Link>
      </div>
    );
  }

  return null; // Render nothing on other pages
}

export default App;
