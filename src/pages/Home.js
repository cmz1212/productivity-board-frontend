import React from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { Link, useLocation } from "react-router-dom";

function NavigationLinks() {
  const location = useLocation();

  // Render the links only on the homepage ("/")
  if (location.pathname === "/") {
    return (
      <div class="mb-3 text-2xl font-normal justify-items-center text-white">
        <div class="flex flex-col items-center">
          {Array(3).fill(<br />)}
          <Link to="/projects/display">Display Projects</Link>
          <br />
          <Link to="/projects/post_project">Post Project</Link>
        </div>
      </div>
    );
  }

  return null;
}

function Home() {
  return (
    <div className="grid justify-items-center bg-sky-950 w-full ">
      <Nav />
      <div className="bg-sky-950 px-10 pt-24 pb-48 w-full max-w-7xl">
        <div className="pl-3 text-center">
          <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Welcome to{" "}
            <span className="font-extralight text-sky-200">
              {" "}
              Productivity<span className="font-bold">Board</span>{" "}
            </span>
          </h1>
          <p className="mt-4 text-sky-500 text-md sm:text-lg lg:text-xl">
            A simplified Kanban board for project collaboration
          </p>
        </div>
        <NavigationLinks />
      </div>
      <div className="grid justify-items-center -mb-36 bg-sky-200 p-10 w-full"></div>
      <div className="grid justify-items-center bg-white p-10 w-full">
        <div className="w-full max-w-7xl">
          <h2 className="font-bold text-center first-line:selection:text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Why use ProductivityBoard?
          </h2>
          <hr className="my-10" />
          <div
            id="features"
            className="grid lg:grid-cols-3 place-items-center gap-5"
          >
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-sky-950">
                Big Picture
              </h5>
              <p class="mb-3 font-normal text-sky-500 dark:text-sky-400">
                Project progress overview from an elevated perspective
                <br />
              </p>
            </div>
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-sky-950">
                Zero Learning Curve
              </h5>
              <p class="mb-3 font-normal text-sky-500 dark:text-sky-400">
                Productivity Board is intuitive and has zero learning curve
              </p>
            </div>
            <div class="p-6 pt-0 text-center">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-sky-950">
                Increase Collaboration
              </h5>
              <p class="mb-3 font-normal text-sky-500 dark:text-sky-400">
                Mutiple users can create and share projects with one another{" "}
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
