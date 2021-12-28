import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showSuccessToastMessage,
  showErrorToastMessage,
} from "@utils/utility.js";
import { LoadingScreen } from "@components/common";

const AuthContext = createContext(null);

function isUserLoggedIn() {
  return JSON.parse(localStorage.getItem("user"));
}

function getAuthorizationToken() {
  return localStorage.getItem("authorizationToken");
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(isUserLoggedIn);
  const [authorizationToken, setAuthorizationToken] = useState(
    getAuthorizationToken
  );
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  const navigate = useNavigate();

  async function signup({ email, password, username, clearSignUpFields }) {
    try {
      setShowLoadingScreen(true);
      const response = await axios.post(
        "https://quizappbackend.shivaansh98.repl.co/signup",
        {
          username,
          email,
          password,
        }
      );
      console.log("Signup Successful!!");
      clearSignUpFields();
      showSuccessToastMessage(response.data.message);
      navigate("/login");
    } catch (e) {
      console.error("Signup Failed", e.response.data);
      const { message: errMsg } = e.response.data;
      showErrorToastMessage(errMsg);
    } finally {
      setShowLoadingScreen(false);
    }
  }

  async function login({ email, password, clearLoginFields }) {
    try {
      setShowLoadingScreen(true);
      const response = await axios.post(
        "https://quizappbackend.shivaansh98.repl.co/login",
        { email, password }
      );
      console.log("Login Successful!");
      const {
        email: userEmail,
        username,
        quizAttempted,
        isDarkModeSelected,
        authorizationToken,
      } = response.data.data;
      const userDetails = {
        email: userEmail,
        username,
        quizAttempted,
        isDarkModeSelected,
      };
      setCurrentUser(userDetails);
      setAuthorizationToken(authorizationToken);
      localStorage.setItem("user", JSON.stringify(userDetails));
      localStorage.setItem("authorizationToken", authorizationToken);
      clearLoginFields();
      navigate("/");
    } catch (e) {
      console.error("Signup Failed", e.response.data);
      const { message: errMsg } = e.response.data;
      showErrorToastMessage(errMsg);
    } finally {
      setShowLoadingScreen(false);
    }
  }

  async function logout() {
    try {
      setCurrentUser(null);
      setAuthorizationToken(null);
      localStorage.setItem("authorizationToken", null);
      localStorage.setItem("user", null);
    } catch (error) {
      showErrorToastMessage("Logout Failed");
    }
  }

  return (
    <AuthContext.Provider
      value={{ signup, login, logout, currentUser, authorizationToken }}
    >
      <LoadingScreen showLoadingScreen={showLoadingScreen} />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
