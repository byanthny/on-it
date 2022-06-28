import { Navigate } from "react-router-dom";

export type PrivateRouteProps = {
  loggedIn: boolean;
  authPath: string;
  component: JSX.Element;
};

export const PrivateRoute = ({ loggedIn, authPath, component }: PrivateRouteProps) => {
  if (loggedIn)
    return component;

  return <Navigate to={{ pathname: authPath }} />;
};
