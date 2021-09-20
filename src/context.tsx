import * as React from 'react';
import { createBrowserHistory } from 'history';
import { locationToRoute, RouteInfo } from './utils';

export const history = createBrowserHistory();

type IRouterContext = {
  currentRoute: RouteInfo;
};

const RouterContext = React.createContext<IRouterContext>({
  currentRoute: locationToRoute(history.location),
});

export { RouterContext };
