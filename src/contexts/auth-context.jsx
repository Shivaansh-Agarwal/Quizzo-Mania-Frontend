import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  showSuccessToastMessage,
  showErrorToastMessage,
} from "@utils/utility.js";
import userReducer from "../reducers/user.reducer";
import { useLoadingScreen } from "@contexts/loadingScreen-context";
import { signupAPI, loginAPI } from "../api/api-requests.js";

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
    setShowLoadingScreen(true);
    const response = await signupAPI({ username, email, password });
    if (response.status === "success") {
      console.log("Signup Successful!!");
      clearSignUpFields();
      showSuccessToastMessage(response.message);
      navigate("/login");
    } else {
      console.error("Signup Failed", response.message);
      showErrorToastMessage(response.message);
    }
    setShowLoadingScreen(false);
  }

  async function login({ email, password, clearLoginFields }) {
    setShowLoadingScreen(true);
    const response = await loginAPI({ email, password });
    if (response.status === "success") {
      console.log("Login Successful!");
      authDispatch({
        type: "LOGIN",
        payload: response.data,
      });
      clearLoginFields();
      navigate("/");
    } else {
      console.error("Signup Failed", response.message);
      showErrorToastMessage(response.message);
    }
    setShowLoadingScreen(false);
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
