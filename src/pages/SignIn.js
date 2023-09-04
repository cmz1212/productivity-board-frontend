import React, { useState } from "react";
import { signInFields } from "../constants";
import Input from "../Components/Input";
import Submit from "../Components/Submit";
import { Link } from "react-router-dom";

const fields = signInFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function SignIn() {
  const [loginState, setLoginState] = useState(fieldsState);

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
                Login to your account
              </h2>
              <p className="mt-2 text-center text-sm text-sky-600 dark:text-sky-300">
                Don't have an account yet?{" "}
                <Link to="/" className="font-medium dark:text-white">
                  Sign Up
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-10 px-5">
              <div className="-space-y-px">
                {fields.map((field) => (
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
              <Submit text="Sign in" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;