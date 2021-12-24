import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@contexts/auth-context.jsx";

export const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { signup } = useAuth();

  function handleSignUp(e) {
    e.preventDefault();
    const { name, email, password } = userDetails;
    signup({ email, password, name, setUserDetails });
  }
  function handleInputChange(event) {
    const elementId = event.target.id;
    const value = event.target.value;
    switch (elementId) {
      case "name":
        setUserDetails((userDetails) => {
          return { ...userDetails, name: value };
        });
        break;
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
        onSubmit={handleSignUp}
        className="flex flex-col items-center border p-8"
      >
        <h1 className="text-2xl">Sign Up</h1>
        <div className="flex flex-col mt-4 w-56 sm:w-96">
          <Name
            handleInputChange={handleInputChange}
            userDetails={userDetails}
          />
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
      </form>
      <div className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-700 cursor-pointer">
          Login
        </Link>
      </div>
    </div>
  );
};

function Name({ handleInputChange, userDetails }) {
  return (
    <>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        onChange={handleInputChange}
        value={userDetails.name}
        className="border p-1"
        required
      />
    </>
  );
}

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
        required
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
        required
      />
    </>
  );
}

function Submit() {
  return (
    <input
      type="submit"
      value="Signup"
      className="bg-blue-400 text-white mt-4 pt-2 pb-2 w-full cursor-pointer"
    />
  );
}
