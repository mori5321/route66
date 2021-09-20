type Route = {
  path: string;
};

type RouteFunc = (path: string) => Route;
type NestFunc = <R extends Object>(
  path: string,
  callback: Callback<R>
) => ReturnType<Callback<R>>;

type Callback<R extends Object> = (callbackArgs: {
  route: RouteFunc;
  nest: NestFunc;
}) => R;

const createRoutes = <R extends Object>(callback: Callback<R>) => {
  return _createRoutes(callback, '');
};

const _createRoutes = <R extends Object>(
  callback: Callback<R>,
  basePath: string
) => {
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

  const nest: NestFunc = (path, callback) => {
    return _createRoutes(callback, path);
  };

  return callback({ route, nest });
};

const routes = createRoutes(({ route, nest }) => {
  return {
    home: route('/home'),
    users: nest('/users', ({ route, nest }) => ({
      list: route('/'),
      me: nest('/me', ({ route }) => ({
        hello: route('/hello'),
      })),
    })),
  };
});

console.log('Routes', routes.users.me.hello.path);

export { createRoutes };
