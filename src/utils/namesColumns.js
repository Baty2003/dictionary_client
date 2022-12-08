export const columnsDictionariesForTable = (isRussian) => [
  {
    name: isRussian ? 'Имя' : 'Name',
  },
  {
    name: isRussian ? 'Кол-во слов' : 'Count Words',
    width: '10%',
  },
  {
    name: isRussian ? 'Создано' : 'Create',
    width: '10%',
  },
  {
    name: isRussian ? 'Действие' : 'action',
    width: '10%',
  },
];

export const columnsWordsForTable = (isRussian) => [
  {
    name: isRussian ? 'Английский' : 'English',
    width: '30%',
  },
  {
    name: isRussian ? 'Русский' : 'Russian',
    width: '30%',
  },
  {
    name: isRussian ? 'Транскрипция' : 'Transcription',
  },
  {
    name: isRussian ? 'Создано' : 'create',
    width: '10%',
  },
  {
    name: isRussian ? 'Действие' : 'Action',
    width: '8%',
  },
];

export const columnsErrorWordsForTable = (isRussian) => [
  {
    name: isRussian ? 'Английский' : 'English',
    width: '30%',
  },
  {
    name: isRussian ? 'Русский' : 'Russian',
    width: '30%',
  },
  {
    name: isRussian ? 'Транскрипцпия' : 'Transcription',
  },
  {
    name: isRussian ? 'Создано' : 'create',
    width: '10%',
  },
];

export const columnsResultForTable = (isRussian) => [
  {
    name: isRussian ? 'Имя словаря' : 'Dictionary name',
    width: '25%',
  },
  {
    name: isRussian ? 'Кол-во слов' : 'Count words',
  },
  {
    name: isRussian ? 'Правильный ответы' : 'True answer',
  },
  {
    name: isRussian ? 'Неправильные ответы' : 'False answer',
  },
  {
    name: isRussian ? 'Время тестирования' : 'Time Testing',
    width: '20%',
  },
  {
    name: isRussian ? 'Дата тестирования' : 'Date testing',
    width: '10%',
  },
];
