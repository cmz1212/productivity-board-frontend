import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex justify-between items-center w-full max-w-7xl px-3 py-3 border-b-2 mx-10 border-sky-700 text-sky-200">
      <Link to="/">
        <h1 className="text-center font-extralight text-2xl text-white">
          Productivity<span className="font-bold">Board</span>{" "}
        </h1>
      </Link>
      <Link to="/">
        <div className="py-2 px-5 bg-sky-200 hover:bg-white focus:bg-white rounded-lg font-bold">
          <p className="text-md text-sky-950">Sign In</p>
        </div>
      </Link>
    </nav>
  );
}

export default Nav;