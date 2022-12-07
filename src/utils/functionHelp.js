import differenceInSeconds from 'date-fns/differenceInSeconds';

export const parseErrorForHookForms = (errors, setErrorFunc) => {
  for (const key in errors) {
    setErrorFunc(key, { type: key, message: errors[key][0] });
  }
  return;
};

export const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const getCookie = (name) => {
  let matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getTranscriptionByEnglishWord = async (englishWord) => {
  const response = await fetch(
    `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20221205T121657Z.f4a72103e521ba1f.1fa74dc3eade69e45ab3723b338fac778ed3e758&lang=en-ru&text=${englishWord}`,
  );

  const data = await response.json();
  if (data?.def?.length) return `[${data.def[0].ts}]`;
  else return '[]';
};

export const shuffleArray = (array) => {
  const arrayShuffle = [...array];
  for (let i = arrayShuffle.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arrayShuffle[i], arrayShuffle[j]] = [arrayShuffle[j], arrayShuffle[i]];
  }
  return arrayShuffle;
};

export const getDifferentWithCurrentDateInSeconds = (date) => {
  return differenceInSeconds(new Date(), date);
};
