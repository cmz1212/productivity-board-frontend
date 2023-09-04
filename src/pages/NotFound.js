import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="grid place-items-center h-screen dark:bg-sky-950 ">
      <div className="grid justify-items-center">
        <span className="text-sky-950 dark:text-white">Page not found!</span>
        <button className="relative z-50 text-md md:text-xl font-semibold text-white bg-sky-700 hover:bg-sky-600 w-fit px-5 py-2.5 rounded-md">
          <Link to="/">Return to home</Link>
        </button>
      </div>
    </div>
  );
}

export default NotFound;