import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="grid justify-items-center bg-sky-950 w-full ">
      <nav className="flex justify-between items-center w-full max-w-7xl px-3 py-3 border-b-2 mx-10 border-sky-700 text-sky-200">
        <Link to="/">
          <h1 className="text-center font-extralight text-2xl text-white">
            Productivity<span className="font-bold">Board</span>{" "}
          </h1>
        </Link>
        <Link to="/signin">
          <div className="py-2 px-5 bg-sky-200 hover:bg-white focus:bg-white rounded-lg font-bold">
            <p className="text-md text-sky-950">Sign In</p>
          </div>
        </Link>
      </nav>
      
      <Link to="/projects" className="red-text">Projects</Link>{" "} {/* TODO: Remove this link later once proper authentication is set up */}
      <Link to="/users" className="red-text">Project Members</Link>{" "} {/* TODO: Remove this link later once proper authentication is set up */}
      
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
            An interactive board for project collaboration
          </p>
        </div>
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
            <div className="p-6 pt-0 text-center">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-sky-950">
                Big Picture
              </h5>
              <p className="mb-3 font-normal text-sky-500 dark:text-sky-400">
                Project progress overview from an elevated perspective
                <br />
              </p>
            </div>
            <div className="p-6 pt-0 text-center">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-sky-950">
                Zero Learning Curve
              </h5>
              <p className="mb-3 font-normal text-sky-500 dark:text-sky-400">
                Productivity Board is intuitive and has zero learning curve
              </p>
            </div>
            <div className="p-6 pt-0 text-center">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-sky-950">
                Increase Collaboration
              </h5>
              <p className="mb-3 font-normal text-sky-500 dark:text-sky-400">
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
