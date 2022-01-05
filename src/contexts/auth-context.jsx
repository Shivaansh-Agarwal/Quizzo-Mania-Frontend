import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showSuccessToastMessage,
  showErrorToastMessage,
} from "@utils/utility.js";
import userReducer from "../reducers/user.reducer";
import { useLoadingScreen } from "@contexts/loadingScreen-context";

const AuthContext = createContext(null);

function getUserDetails() {
  return {
    currUserDetails: JSON.parse(localStorage.getItem("user")),
    authorizationToken: localStorage.getItem("authorizationToken"),
  };
}

export function AuthProvider({ children }) {
  const initialUserDetails = {
    currUserDetails: null,
    authorizationToken: null,
  };
  const [authState, authDispatch] = useReducer(
    userReducer,
    initialUserDetails,
    getUserDetails
  );
  const { setShowLoadingScreen } = useLoadingScreen();

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
      authDispatch({
        type: "LOGIN",
        payload: response.data.data,
      });
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
      authDispatch({
        type: "LOGOUT",
        payload: {},
      });
    } catch (error) {
      showErrorToastMessage("Logout Failed");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        currentUser: authState.currUserDetails,
        authorizationToken: authState.authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
