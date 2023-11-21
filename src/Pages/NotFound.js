import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="grid justify-items-center">
        <span className="text-3xl md:text-6xl text-sky-950">Page Not Found!</span>
        {Array(3).fill(<br />)}
        <button className="relative z-50 text-lg md:text-xl font-semibold text-white bg-sky-50 hover:bg-sky-800 w-fit px-3 py-1.5 rounded-md font-semibold">
          <Link to="/">Return to Home</Link>
        </button>
      </div>
    </div>
  );
}