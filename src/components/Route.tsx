import * as React from 'react';
import { RouterContext } from '../context';

export type RouteProps = { path: string; children: React.ReactElement };
const Route = ({ path, children }: RouteProps) => {
  const { currentRoute } = React.useContext(RouterContext);

  if (currentRoute.path !== path) {
    return null;
  }

  return children;
};

export { Route };
