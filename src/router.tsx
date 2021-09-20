import * as React from 'react';
import { history, RouterContext } from './context';
import { RouteProps } from './components/Route';
import { Location } from 'history';
import { locationToRoute } from './utils';

type Routes = {
  [key: string]: Pick<RouteProps, 'path'>;
};

type Props = {
  routes: Routes;
  children: React.ReactElement;
};
const Router = ({ routes: routes, children }: Props) => {
  const paths: string[] = Object.keys(routes).map((key) => routes[key].path);

  const [currentRoute, setCurrentRoute] = React.useState(
    locationToRoute(history.location)
  );

  React.useEffect(() => {
    const unlisten = history.listen((update) =>
      handleRouteChange(update.location)
    );
    return unlisten;
  }, []);

  const handleRouteChange = (location: Location) => {
    const route = locationToRoute(location);
    setCurrentRoute(route);
  };

  const routerContextValue = { currentRoute: currentRoute };

  const is404 = paths.indexOf(currentRoute.path) === -1;
  console.log('Is404', is404);

  return (
    <RouterContext.Provider value={routerContextValue}>
      {children}
    </RouterContext.Provider>
  );
};

export { Router, Routes };
