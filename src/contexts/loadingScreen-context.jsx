import { useState, createContext, useContext } from "react";
import { LoadingScreen } from "@components/common";

const LoadingScreenContext = createContext(null);

export function LoadingScreenProvider({ children }) {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  return (
    <LoadingScreenContext.Provider value={{ setShowLoadingScreen }}>
      <LoadingScreen showLoadingScreen={showLoadingScreen} />
      {children}
    </LoadingScreenContext.Provider>
  );
}

export function useLoadingScreen() {
  return useContext(LoadingScreenContext);
}
