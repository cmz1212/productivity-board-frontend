import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="grid place-items-center h-screen dark:bg-sky-950 ">
      <div className="grid justify-items-center">
        <h1 className="text-center text-xl md:text-4xl font-semibold text-notFound">
          Page <span className="text-sky-950 dark:text-white">not found!</span>
        </h1>
        <button className="relative z-50 text-md md:text-xl font-semibold text-white bg-sky-700 hover:bg-sky-600 w-fit px-5 py-2.5 rounded-md">
          <Link to="/">Return to home</Link>
        </button>
      </div>
    </div>
  );
}

export default NotFound;