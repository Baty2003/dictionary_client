import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import linkPrimaryStyle from './LinkPrimary.module.scss';

const LinkPrimary = ({ onClick, text, className, href, primary, disabled, small }) => {
  const classes = classNames({
    [className]: className,
    [linkPrimaryStyle['primary']]: primary,
    [linkPrimaryStyle['link']]: true,
  });
  return (
    <Link
      className={classes}
      style={small ? { padding: '5px' } : {}}
      onClick={onClick}
      disabled={disabled || false}
      to={disabled ? '#' : href}
    >
      {text}
    </Link>
  );
};
export default LinkPrimary;
