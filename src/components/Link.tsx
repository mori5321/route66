import * as React from 'react';
import { RouterContext, history } from '../context';

type LinkProps = {
  to: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactElement;
} & JSX.IntrinsicElements['a'];
const Link = ({ to, onClick, children, ...restProps }: LinkProps) => {
  const { currentRoute } = React.useContext(RouterContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (currentRoute.path === to) {
      return;
    }

    if (onClick) {
      onClick(e);
    }

    history.push(to);
  };

  return (
    <a {...restProps} onClick={handleClick}>
      {children}
    </a>
  );
};

export { Link };
