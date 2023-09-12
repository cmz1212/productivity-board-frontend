import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar ({ isAuthenticated, userName }) {
    const { loginWithRedirect, logout } = useAuth0();

    return (
        <nav className="flex justify-between items-center w-full max-w-7xl px-3 py-3 border-b-2 mx-10 border-sky-700 text-sky-200">
            <Link to="/">
                <h1 className="text-center font-extralight text-2xl text-white">
                    Productivity<span className="font-bold">Board</span>{" "}
                </h1>
            </Link>

            {userName !== null ? (
                <span className="mt-4 text-sky-500 text-md sm:text-lg lg:text-xl ml-auto mr-6">{userName}</span>
            ) : null }

            <div>
                {isAuthenticated ? (
                    <div className="py-2 px-5 bg-sky-200 hover:bg-white focus:bg-white rounded-lg font-bold">
                        <button className="text-md text-sky-950" onClick={() => logout()}>Sign Out</button>
                    </div>
                ) : (
                    <div className="py-2 px-5 bg-sky-200 hover:bg-white focus:bg-white rounded-lg font-bold">
                        <button className="text-md text-sky-950" onClick={() => loginWithRedirect()}>Sign In</button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;