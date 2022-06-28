import React from "react";
import { Navigate } from "react-router-dom";

export type PrivateRouteProps = {
  loggedIn: boolean;
  authPath: string;
  component: JSX.Element;
};

/* Higher Order Component that checks if loggedIn is true before returning desired component
 * If not redirects to authPath
 * Mainly used for redirecting protected Routes when user isn't logged in 
 */
const PrivateRoute = ({ loggedIn, authPath, component }: PrivateRouteProps) => {
  if (loggedIn)
    return component;

  return <Navigate to={{ pathname: authPath }} />;
};

export default PrivateRoute;