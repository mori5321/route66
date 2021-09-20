// import {Routes} from './router';

type Route = {
  path: string;
};

type Routes = {
  [key: string]: Route | Routes;
};

type RouteFunc = (path: string) => Route;
type NestFunc = (path: string, callback: Callback) => Routes;

type Callback = (callbackArgs: { route: RouteFunc; nest: NestFunc }) => Routes;
type CreateRoutes = (callback: Callback) => Routes;

const createRoutes: CreateRoutes = (callback) => {
  return _createRoutes(callback, '');
};

const _createRoutes = (callback: Callback, basePath: string) => {
  const route: RouteFunc = (path): Route => {
    if (basePath.length > 0) {
      return {
        path: basePath + path, // TODO: join URL safely
      };
    }

    return {
      path,
    };
  };

  const nest: NestFunc = (path, callback): Routes => {
    return _createRoutes(callback, path);
  };

  return callback({ route, nest });
};

const routes = createRoutes(({ route, nest }) => {
  return {
    home: route('/home'),
    users: nest('/users', ({ route }) => {
      return {
        list: route('/'),
      };
    }),
  };
});

// FIXME: routes.users.home みたいな型推論ができない
console.log('Routes', routes);

export { createRoutes };
