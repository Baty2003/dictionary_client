import React from 'react';
import { Link } from 'react-router-dom';

import { AnimatedLogo } from '../../common/AnimatedLogo';

import guestPageStyle from './GuestPage.module.scss';

const GuestPage = () => {
  return (
    <section className={`${guestPageStyle['section']} container pages`}>
      <h2 className={guestPageStyle['title']}>Добро пожаловать на гостевую страницу словаря</h2>
      <p>
        Мы очень рады, что вы выбрали наш словарь для того чтобы изучать английский язык. С помощью нашего словаря вы
        сможете быстро запомнить слова, которые недавно изучили.
      </p>
      <h3>Основные преимущества словаря</h3>
      <ul>
        <li>Работа над ошибками</li>
        <li>Упражнение в виде тестирования</li>
        <li>Создание неограниченного количества слов</li>
        <li>Создание неограниченного количества словарей</li>
        <li>Удобное взаимодействия со словами и словарями</li>
        <li>Дружелюбный интерфейс</li>
      </ul>
      <p>
        Попробуйте и оцените все преимущества использования словаря с упраженинями при изучения английского словаря!
      </p>
      <div className={guestPageStyle['animation-logo']}>
        <AnimatedLogo width="300" />
      </div>
      <div className={guestPageStyle['container-invite']}>
        <Link className={guestPageStyle['invite']} to="/register">
          Let&apos;s go learn English<span className={guestPageStyle['invite-exclamation']}>!</span>
        </Link>
      </div>
    </section>
  );
};
export default GuestPage;
