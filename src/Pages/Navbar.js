import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar ({ isAuthenticated, userName }) {
    const { loginWithRedirect, logout } = useAuth0();

    return (
        <nav className="flex justify-between items-center w-full max-w-8xl px-3 py-2 border-b-2 mx-10 border-sky-950 mt-1 mb-1">
            <Link to="/">
                <h1 className="text-center font-extralight text-2xl text-sky-950">
                    Productivity<span className="font-bold">Board</span>{" "}
                </h1>
            </Link>

            {userName !== null ? (
                <span className="text-sky-950 text-lg sm:text-xl lg:text-2xl ml-auto mr-8"> {userName} </span>
            ) : null }

            <div>
                {isAuthenticated ? (
                    <div className="py-2 px-5 bg-sky-50 hover:bg-sky-50 focus:bg-white rounded-lg font-bold">
                        <button className="text-md text-sky-950" onClick={() => logout()}>Sign Out</button>
                    </div>
                ) : (
                    <div className="py-2 px-5 bg-sky-50 hover:bg-sky-50 focus:bg-white rounded-lg font-bold">
                        <button className="text-md text-sky-950" onClick={() => loginWithRedirect()}>Sign In</button>
                    </div>
                )}
            </div>
        </nav>
    );
}