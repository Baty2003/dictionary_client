import React from 'react';
import { Link } from 'react-router-dom';

import { AnimatedLogo } from '../../common/AnimatedLogo';

import guestPageStyle from './GuestPage.module.scss';

const GuestPage = ({ isRussian }) => {
  return (
    <section className={`${guestPageStyle['section']} container pages`}>
      {isRussian ? (
        <>
          <h2 className={guestPageStyle['title']}>Добро пожаловать на гостевую страницу словаря</h2>
          <p>
            Мы очень рады, что вы выбрали наш словарь для того чтобы изучать английский язык. С помощью нашего словаря
            вы сможете быстро запомнить слова, которые недавно изучили.
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
        </>
      ) : (
        <>
          <h2 className={guestPageStyle['title']}>Welcome to the guest page of the dictionary</h2>
          <p>
            We are very glad that you have chosen our dictionary to learn English. With the help of our dictionary you
            will be able to quickly memorize words that you have recently learned.
          </p>
          <h3>The main advantages of the dictionary</h3>
          <ul>
            <li>Work on errors</li>
            <li>Exercise in the form of testing</li>
            <li>Creating an unlimited number of words</li>
            <li>Creating an unlimited number of dictionaries</li>
            <li>Convenient interaction with words and dictionaries</li>
            <li>Friendly interface</li>
          </ul>
          <p>
            Try and appreciate all the advantages of using a dictionary with exercises when learning English vocabulary!
          </p>
        </>
      )}
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
