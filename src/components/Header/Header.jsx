import React from 'react';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';

import { LinkPrimary } from '../LinkPrimary';
import { exit } from '../../redux/actions';
import { setCookie } from '../../utils/functionHelp';

import headerStyle from './Header.module.scss';

const Header = ({ loggin }) => {
  const dispatch = useDispatch();
  const exitFunc = () => {
    dispatch(exit());
    setCookie('token', '');
  };
  if (loggin) {
    return (
      <header className={headerStyle['header']}>
        <nav className={`${headerStyle['nav-header']} ${headerStyle['nav-header-loggin']}`}>
          <Link className={headerStyle['title']} to="/">
            English Dictionary
          </Link>
          <div className={headerStyle['container-link']}>
            <LinkPrimary text="Testing" href="/login" primary />
            <LinkPrimary text="Work on errors" href="/register" primary />
            <Popconfirm onConfirm={exitFunc} title={'Do you want to get out?'}>
              <LinkPrimary text="Exit" href="/exit" primary />
            </Popconfirm>
          </div>
        </nav>
      </header>
    );
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
