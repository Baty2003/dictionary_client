import { sortItemsByInt, sortItemsByString } from './functionHelp';

export const columnsDictionariesForTable = (isRussian) => [
  {
    name: isRussian ? 'Имя' : 'Name',
    sortFunction: (items, reverse) => sortItemsByString(items, 'name', reverse),
  },
  {
    name: isRussian ? 'Кол-во слов' : 'Count Words',
    sortFunction: (items, reverse) => sortItemsByString(items, 'count', reverse),
    width: '10%',
  },
  {
    name: isRussian ? 'Создано' : 'Create',
    sortFunction: (items, reverse) => sortItemsByString(items, 'create', reverse),
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
    sortFunction: (items, reverse) => sortItemsByString(items, 'english', reverse),
    width: '30%',
  },
  {
    name: isRussian ? 'Русский' : 'Russian',
    sortFunction: (items, reverse) => sortItemsByString(items, 'russian', reverse),
    width: '30%',
  },
  {
    name: isRussian ? 'Транскрипция' : 'Transcription',
    sortFunction: (items, reverse) => sortItemsByString(items, 'transcription', reverse),
  },
  {
    name: isRussian ? 'Создано' : 'create',
    sortFunction: (items, reverse) => sortItemsByString(items, 'create', reverse),
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
    sortFunction: (items, reverse) => sortItemsByString(items, 'english', reverse),
    width: '30%',
  },
  {
    name: isRussian ? 'Русский' : 'Russian',
    sortFunction: (items, reverse) => sortItemsByString(items, 'russian', reverse),
    width: '30%',
  },
  {
    name: isRussian ? 'Транскрипция' : 'Transcription',
    sortFunction: (items, reverse) => sortItemsByString(items, 'transcription', reverse),
  },
  {
    name: isRussian ? 'Создано' : 'create',
    sortFunction: (items, reverse) => sortItemsByString(items, 'create', reverse),
    width: '10%',
  },
];

export const columnsResultForTable = (isRussian) => [
  {
    name: isRussian ? 'Имя словаря' : 'Dictionary name',
    sortFunction: (items, reverse) => sortItemsByString(items, 'nameDict', reverse),
    width: '25%',
  },
  {
    name: isRussian ? 'Кол-во слов' : 'Count words',
    sortFunction: (items, reverse) => sortItemsByInt(items, 'countWords', reverse),
  },
  {
    name: isRussian ? 'Правильный ответы' : 'True answer',
    sortFunction: (items, reverse) => sortItemsByInt(items, 'countTrue', reverse),
  },
  {
    name: isRussian ? 'Неправильные ответы' : 'False answer',
    sortFunction: (items, reverse) => sortItemsByInt(items, 'countFalse', reverse),
  },
  {
    name: isRussian ? 'Время тестирования' : 'Time Testing',
    sortFunction: (items, reverse) => sortItemsByInt(items, 'testingTimeSeconds', reverse),
    width: '20%',
  },
  {
    name: isRussian ? 'Дата тестирования' : 'Date testing',
    sortFunction: (items, reverse) => sortItemsByString(items, 'create', reverse),
    width: '10%',
  },
];
