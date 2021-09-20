// import {Routes} from './router';

type Route = {
  path: string;
};

type Routes = {
  [key: string]: Route;
};

type RouteFunc = (path: string) => Route;
// type NestFunc = (path: string, callback: CreateRoutes) => Routes;

type CreateRoutes = (
  callback: (callbackArgs: { route: RouteFunc }) => Routes
) => Routes;

const createRoutes: CreateRoutes = (callback) => {
  const route: RouteFunc = (path) => {
    return {
      path,
    };
  };

  return callback({ route });
};

const routes = createRoutes(({ route }) => {
  return {
    home: route('/home'),
  };
});

console.log('Routes', routes);

export { createRoutes };
