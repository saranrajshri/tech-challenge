import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PrivateSection from "./PrivateSection";
import { ContextProvider } from "../context/Context";
import PublicRoutes from "./PublicRoutes";

function Routes() {
  const { pathname } = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("TECH_AUTH_TOKEN");
    if (token !== null && token !== undefined && token !== "null") {
      setUserLoggedIn(true);
    }
  }, [pathname]);

  return isUserLoggedIn ? (
    <ContextProvider>
      <PrivateSection />
    </ContextProvider>
  ) : (
    <PublicRoutes />
  );
}

export default Routes;
