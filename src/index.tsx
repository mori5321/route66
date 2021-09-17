import * as React from "react";
import { locationToRoute } from "./utils";
import { history, RouterContext } from "./context";
import { Route, RouteProps } from "./route";
import { Link } from "./link";
import { Location } from "history";

type Routes = {
  [key: string]: Pick<RouteProps, "path">;
};

type Props = {
  routes: Routes;
  children: React.ReactElement;
};
const Router = ({ routes: routes, children }: Props) => {
  const paths: string[] = Object.keys(routes).map((key) => routes[key].path);

  console.log("Paths", paths);

  const [currentRoute, setCurrentRoute] = React.useState(
    locationToRoute(history.location)
  );

  console.log("CurrentRoute", currentRoute);

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

  const routerContextValue = { route: currentRoute };

  const is404 = paths.indexOf(currentRoute.path) === -1;
  console.log("Is404", is404);

  return (
    <RouterContext.Provider value={routerContextValue}>
      {children}
    </RouterContext.Provider>
  );
};

export { history, RouterContext, Router, Routes, Route, Link };
