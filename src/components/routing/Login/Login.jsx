import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@contexts/auth-context.jsx";

export const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  function handleLogin(e) {
    e.preventDefault();
    login({
      ...userDetails,
      clearLoginFields: clearLoginFields.bind(this, setUserDetails),
    });
  }

  function clearLoginFields(setUserDetails) {
    setUserDetails({ email: "", password: "" });
  }

  function handleInputChange(event) {
    const elementId = event.target.id;
    const value = event.target.value;
    switch (elementId) {
      case "email":
        setUserDetails((userDetails) => {
          return { ...userDetails, email: value };
        });
        break;
      case "password":
        setUserDetails((userDetails) => {
          return { ...userDetails, password: value };
        });
        break;
      default:
        console.error("The Input Event is not valid");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center border p-8"
      >
        <h1 className="text-2xl">Login</h1>
        <div className="flex flex-col mt-4 w-56 sm:w-96">
          <Email
            handleInputChange={handleInputChange}
            userDetails={userDetails}
          />
          <Password
            handleInputChange={handleInputChange}
            userDetails={userDetails}
          />
          <Submit />
        </div>
        <button
          className="text-blue-700 mt-4 cursor-pointer hover:underline"
          onClick={(e) => {
            e.preventDefault();
            setUserDetails((userDetails) => {
              return {
                ...userDetails,
                email: "test@gmail.com",
                password: "Password@1",
              };
            });
          }}
        >
          Use guest credentails
        </button>
      </form>
      <div className="mt-4">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-700 cursor-pointer hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

function Email({ handleInputChange, userDetails }) {
  return (
    <>
      <label htmlFor="email" className="mt-4">
        Email
      </label>
      <input
        type="email"
        id="email"
        onChange={handleInputChange}
        value={userDetails.email}
        className="border p-1"
      />
    </>
  );
}

function Password({ handleInputChange, userDetails }) {
  return (
    <>
      <label htmlFor="password" className="mt-4">
        Password
      </label>
      <input
        type="password"
        id="password"
        onChange={handleInputChange}
        value={userDetails.password}
        className="border p-1"
      />
    </>
  );
}

function Submit() {
  return (
    <input
      type="submit"
      value="Login"
      className="bg-blue-400 text-white mt-4 pt-2 pb-2 w-full cursor-pointer"
    />
  );
}
