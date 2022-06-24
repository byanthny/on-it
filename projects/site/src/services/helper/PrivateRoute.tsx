import { Navigate, useLocation } from "react-router";

export type PrivateRouteProps = {
  loggedIn: boolean;
  authPath: string;
  component: JSX.Element;
};

export const PrivateRoute = ({ loggedIn, authPath, component }: PrivateRouteProps) => {
  const currentLocation = useLocation();

  if (loggedIn) {
    return component;
  } else {
    return <Navigate to={{ pathname: authPath }} />;
  }
};
