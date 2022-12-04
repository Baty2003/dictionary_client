import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import linkPrimaryStyle from './LinkPrimary.module.scss';

const LinkPrimary = ({ onClick, text, className, href, primary }) => {
  const classes = classNames({
    [className]: className,
    [linkPrimaryStyle['primary']]: primary,
    [linkPrimaryStyle['link']]: true,
  });
  return (
    <Link className={classes} onClick={onClick} to={href}>
      {text}
    </Link>
  );
};
export default LinkPrimary;
