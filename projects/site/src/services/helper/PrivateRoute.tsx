// https://github.com/openscript/react-router-private-protected-routes/blob/react-router-6/src/components/ProtectedRoute.tsx

import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

export type ProtectedRouteProps = {
  loggedIn: boolean;
  authenticationPath: string;
  component: JSX.Element;
};

export default function ProtectedRoute({loggedIn, authenticationPath, component}: ProtectedRouteProps) {
  const currentLocation = useLocation();

  if(loggedIn) {
    return component;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};