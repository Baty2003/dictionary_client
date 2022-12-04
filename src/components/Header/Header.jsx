import React from 'react';
import { Link } from 'react-router-dom';

import { LinkPrimary } from '../LinkPrimary';

import headerStyle from './Header.module.scss';

const Header = ({ loggin }) => {
  if (loggin) {
    return <header className={headerStyle['header']}></header>;
  } else {
    return (
      <header className={headerStyle['header']}>
        <nav className={headerStyle['nav-header']}>
          <Link className={headerStyle['title']} to="/">
            English Dictionary
          </Link>
          <div className={headerStyle['container-link']}>
            <LinkPrimary text={'login'} href="/login" />
            <LinkPrimary text={'register'} href="/register" primary />
          </div>
        </nav>
      </header>
    );
  }
};
export default Header;
