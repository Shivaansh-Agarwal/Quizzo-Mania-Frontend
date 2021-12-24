import React from "react";
import imgSpinner from "../images/spinner.gif";

export default function LoadingScreen({ showLoadingScreen = true }) {
  return (
    <>
      {showLoadingScreen && (
        <div className="w-screen h-screen bg-white opacity-70 flex justify-center items-center absolute">
          <img src={imgSpinner} alt="Loading Indicator" />
        </div>
      )}
      {!showLoadingScreen && null}
    </>
  );
}
