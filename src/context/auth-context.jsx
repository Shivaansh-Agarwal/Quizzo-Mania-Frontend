import { createContext, useContext, useEffect, useState } from "react";
import {
  showSuccessToastMessage,
  showErrorToastMessage,
} from "../utilities/utility.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "../firebase.js";
import { LoadingScreen } from "../components";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

function isUserLoggedIn() {
  return JSON.parse(localStorage.getItem("user"));
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(isUserLoggedIn);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  });

  const navigate = useNavigate();

  async function signup({ email, password, name, setUserDetails }) {
    try {
      setShowLoadingScreen(true);
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: name,
      });
      setUserDetails({
        name: "",
        email: "",
        password: "",
      });
      showSuccessToastMessage("SignUp Successful!");
      navigate("/login");
    } catch (error) {
      const { code: errorCode, message: errorMessage } = error;
      showErrorToastMessage("Signup Failed", errorCode, errorMessage);
    } finally {
      setShowLoadingScreen(false);
    }
  }

  async function login({ email, password, setUserDetails }) {
    try {
      setShowLoadingScreen(true);
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setUserDetails({ email: "", password: "" });
      const { displayName: username } = user;
      showSuccessToastMessage(`Welcome ${username}`);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      const { code: errorCode, message: errorMessage } = error;
      showErrorToastMessage("Login Failed", errorCode, errorMessage);
    } finally {
      setShowLoadingScreen(false);
    }
  }

  async function logout() {
    try {
      const auth = getAuth();
      await signOut(auth);
      localStorage.setItem("user", null);
    } catch (error) {
      showErrorToastMessage("Logout Failed", error);
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      <LoadingScreen showLoadingScreen={showLoadingScreen} />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
