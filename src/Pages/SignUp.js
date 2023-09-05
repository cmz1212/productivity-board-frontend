import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUpFields } from "../constants";
import Input from "../Components/Input";
import Submit from "../Components/Submit";

const fields = signUpFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function SignUp() {

  const [loginState, setLoginState] = useState(fieldsState);
  const [phase, setPhase] = useState(0);

  const register = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("first_name", loginState["firstname"]);
    formData.append("last_name", loginState["lastname"]);
    formData.append("email", loginState["email"]);
    formData.append("username", loginState["username"]);
    formData.append("password", loginState["password"]);
    formData.append("password2", loginState["confirm"]);
    
  };

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className="grid lg:grid-cols-1 min-h-screen dark:bg-sky-900 dark:text-white">
        <div className="grid place-items-center">
          <div className="max-w-sm w-full space-y-10">

            <div className="mb-10">
              <Link to="/">
                <h1 className="text-center font-extralight text-4xl text-sky-500">
                  Productivity<span className="font-bold">Board</span>{" "}
                </h1>
              </Link>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-sky-900 dark:text-white">
                Create a new account
              </h2>
              <p className="mt-2 text-center text-sm text-sky-600 dark:text-sky-300">
                Already have an account?{" "}
                <Link to="/signin" className="font-medium dark:text-white">
                  Sign In
                </Link>
              </p>
            </div>

            <form className="space-y-6 px-5" >
              <div className="flex-row mb-10">
                {fields.slice(phase * 3, (phase + 1) * 3).map((field) => (
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={loginState[field.id]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                  />
                ))}
              </div>
              {phase === 0 && (
                <button
                  onClick={() => {
                    setPhase(phase + 1);
                  }}
                  className="group font-semibold relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-sky-600"
                >
                  Next
                </button>
              )}
              {phase === 1 && (
                <div className="grid grid-cols-2 gap-x-5">
                  <button
                    onClick={() => {
                      setPhase(phase - 1);
                    }}
                    className="group h-fit font-semibold  relative flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-sky-600"
                  >
                    Back
                  </button>
                  <Submit text="Sign Up" className="mt-0" />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;