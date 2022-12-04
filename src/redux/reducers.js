/* eslint-disable indent */

import { combineReducers } from 'redux';

import { SET_IS_DICTIONARIES, SET_IS_FETCHING, SET_IS_WORDS, SET_USER } from './actionsNames';

const initialStateUser = {
  name: '',
  email: '',
  token: '',
};

const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, name: action.name, email: action.email, token: action.token };
    default:
      return state;
  }
};

const initialStateDate = {
  dictionaries: [],
  currentDictionary: {},
  words: [],
};

const dataReducer = (state = initialStateDate, action) => {
  switch (action.type) {
    case SET_IS_DICTIONARIES:
      return { ...state, dictionaries: action.dictionaries };
    case SET_IS_WORDS:
      return { ...state, words: action.words };
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
