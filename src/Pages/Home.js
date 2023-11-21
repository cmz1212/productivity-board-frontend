import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { TypeAnimation } from 'react-type-animation';
import Navbar from './Navbar';
import Footer from "./Footer";

export default function Home() {
  const { isAuthenticated, user } = useAuth0();
  const userName = isAuthenticated ? user.name : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/projects');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="grid justify-items-center bg-white w-full h-screen">

      <Navbar isAuthenticated={isAuthenticated} userName={userName} />

      <div className="bg-white px-20 pt-24 pb-40 w-full max-w-8xl">
        <div className="pl-3 text-center">
          <h1 className="font-semibold text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-sky-950">
            Welcome to{" "}
            <span className="font-extralight text-sky-950">
              {" "}
              Productivity<span className="font-bold">Board</span>{" "}
            </span>
          </h1>
          <p className="mt-4 text-sky-950 text-md sm:text-xs md:text-sm lg:text-xl">
            An interactive board for project collaboration
          </p>
        </div>
      </div>

      <div className="grid justify-items-center bg-white p-8 w-full">
        <div className="w-full max-w-8xl">
          <h2 className="font-bold text-center first-line:selection:text-center text-sky-950 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            Why use ProductivityBoard?
          </h2>
          <div className="flex justify-between" style={{height: '285px'}}>
            <div className="w-1/3"></div>
            <div className="w-1/3 flex flex-col justify-start items-center text-sky-950 text-md sm:text-xs md:text-sm lg:text-lg overflow-hidden">
              {Array(2).fill(<br />)}
              <TypeAnimation
                sequence={[
                  `Big Picture - Overview of project progress from an elevated perspective`,
                  800,
                   `Big Picture - Overview of project progress from an elevated perspective\n
                    Zero Learning Curve - Intuitive design with no tutorial required`,
                  800,
                   `Big Picture - Overview of project progress from an elevated perspective\n
                    Zero Learning Curve - Intuitive design with no tutorial required\n
                    Increase Collaboration - Users can be created and assigned to tasks`,
                  800,
                ]}
                speed={50} style={{whiteSpace: 'pre-line'}}/>
            </div>
            <div className="w-1/3"></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}