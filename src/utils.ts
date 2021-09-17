import qs from 'querystringify';
import { Location } from 'history';

type Route = {
  path: string;
  hash: string;
  query: Object;
};

const locationToRoute = (location: Location) => {
  return {
    path: location.pathname,
    hash: location.hash,
    query: qs.parse(location.search),
  };
};

export { Route, locationToRoute };
