import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { AuthProvider } from "./contexts/auth-context";
import { LoadingScreenProvider } from "./contexts/loadingScreen-context";
import App from "./App";

toast.configure();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingScreenProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LoadingScreenProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
