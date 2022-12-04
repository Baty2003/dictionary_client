import React from 'react';

import footerStyle from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={`${footerStyle['footer']}`}>
      <nav className={`${footerStyle['nav-menu']} container`}>
        <div className={footerStyle['copyright']}>
          <p className={footerStyle['paragraph']}>©2022 Восклецов Олег</p>
          <p className={footerStyle['paragraph']}>Английский словарь с упраженинями</p>
          <p className={footerStyle['paragraph']}>Для эффективного изучения английских слов</p>
        </div>
        <div className={footerStyle['contact']}>
          <p className={footerStyle['paragraph']}>Контакты разработчика:</p>
          <a className={footerStyle['paragraph']} href="mailto:vosf03@gmail.com">
            vosf03@gmail.com
          </a>
          <a className={footerStyle['paragraph']} href="https://t.me/ProstoOlegEKB">
            @ProstoOlegEKB
          </a>
        </div>
      </nav>
    </footer>
  );
};
export default Footer;
