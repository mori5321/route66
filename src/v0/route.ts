import * as React from 'react';
import { RouterContext } from './context';

export type RouteProps = { path: string; children: React.ReactElement };
const Route = ({ path, children }: RouteProps) => {
  const { route } = React.useContext(RouterContext);

  if (route.path !== path) {
    return null;
  }

  return children;
};

export { Route };
