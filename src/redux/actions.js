import {
  addDictionary,
  deleteDictionary,
  editDictionary,
  getDictionariesByToken,
  getUserByToken,
  getWordsByToken,
  loginUser,
  registerUser as registerUserApi,
} from '../dictionaryApi';

import { SET_IS_DICTIONARIES, SET_IS_FETCHING, SET_IS_WORDS, SET_USER } from './actionsNames';

export const setIsFetching = (statusIsFetching) => {
  return { type: SET_IS_FETCHING, isFetching: statusIsFetching };
};

export const setUserData = (name, email, token) => {
  return { type: SET_USER, name, email, token };
};

export const setDictionaries = (dictionaries) => {
  return { type: SET_IS_DICTIONARIES, dictionaries };
};
export const setWords = (words) => {
  return { type: SET_IS_WORDS, words };
};

// async
export const loginUserAction = (email, password) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    let response = await loginUser(email, password);
    const { token } = response;
    dispatch(getDataUser(token));
    return response;
  } catch (err) {
    dispatch(setIsFetching(false));
    return Promise.reject(err);
  }
};

export const getDataUser = (token) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await getUserByToken(token);
    dispatch(setUserData(response.name, response.email, token));
    return response;
  } catch (err) {
    dispatch(setIsFetching(false));
    return Promise.reject(err);
  }
};

export const registerUser = (name, email, password) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await registerUserApi(name, email, password);
    const { token } = response;

    dispatch(getDataUser(token));
    dispatch(setIsFetching(false));
    return response;
  } catch (err) {
    dispatch(setIsFetching(false));
    return Promise.reject(err);
  }
};

export const getDictionaries = (token) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await getDictionariesByToken(token);
    dispatch(setDictionaries(response));
    dispatch(setIsFetching(false));
    return response;
  } catch (err) {
    console.log(err);
    dispatch(setIsFetching(false));
    return Promise.reject(err);
  }
};

export const createAndUpdateDictionaries = (name, token) => async (dispatch) => {
  dispatch(setIsFetching(true));
  const response = await addDictionary(name, token);
  dispatch(getDictionaries(token));
  dispatch(setIsFetching(false));
  return response;
};

export const editAndUpdateDictionaries = (id, name, token) => async (dispatch) => {
  dispatch(setIsFetching(true));
  const response = await editDictionary(id, name, token);
  dispatch(getDictionaries(token));
  dispatch(setIsFetching(false));
  return response;
};

export const deleteAndUpdateDictionaries = (id, token) => async (dispatch) => {
  dispatch(setIsFetching(true));
  const response = await deleteDictionary(id, token);
  dispatch(getDictionaries(token));
  dispatch(setIsFetching(false));
  return response;
};

export const getWords = (id, token) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await getWordsByToken(id, token);
    dispatch(setWords(response));
    dispatch(setIsFetching(false));
    return response;
  } catch (err) {
    console.log(err);
    dispatch(setIsFetching(false));
    return Promise.reject(err);
  }
};
