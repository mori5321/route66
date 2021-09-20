import qs from 'querystringify';
import { Location } from 'history';

type RouteInfo = {
  path: string;
  hash: string;
  query: object;
};

const locationToRoute = (location: Location): RouteInfo => {
  return {
    path: location.pathname,
    hash: location.hash,
    query: qs.parse(location.search),
  };
};

export { RouteInfo, locationToRoute };
