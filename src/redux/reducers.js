/* eslint-disable indent */

import { combineReducers } from 'redux';

import {
  EXIT,
  SET_IS_DICTIONARIES,
  SET_IS_ERROR_WORDS,
  SET_IS_FETCHING,
  SET_IS_RESULTS,
  SET_IS_TESTING_DATA,
  SET_IS_WORDS,
  SET_USER,
} from './actionsNames';

const initialStateUser = {
  name: '',
  email: '',
  token: '',
};

const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, name: action.name, email: action.email, token: action.token };
    case EXIT:
      return initialStateUser;
    default:
      return state;
  }
};

const initialStateDate = {
  dictionaries: [],
  currentDictionary: {},
  words: [],
  errorsWords: [],
  results: [],
  testing: {
    dictionary: {},
    words: 0,
    countVariants: 0,
    lang: 'english',
  },
};

const dataReducer = (state = initialStateDate, action) => {
  switch (action.type) {
    case SET_IS_DICTIONARIES:
      return { ...state, dictionaries: action.dictionaries };
    case SET_IS_ERROR_WORDS:
      return { ...state, errorsWords: action.errorsWords };
    case SET_IS_WORDS:
      return { ...state, words: action.words };
    case SET_IS_TESTING_DATA:
      return {
        ...state,
        testing: {
          dictionary: action.dictionary,
          words: action.words,
          countVariants: action.countVariants,
          lang: action.lang,
        },
      };
    case SET_IS_RESULTS:
      return { ...state, results: action.results };
    case EXIT:
      return initialStateDate;
    default:
      return state;
  }
};

const isFetchingReducer = (state = false, action) => {
  switch (action.type) {
    case SET_IS_FETCHING:
      return action.isFetching;
    default:
      return state;
  }
};

export const reducer = combineReducers({ user: userReducer, data: dataReducer, isFetching: isFetchingReducer });
