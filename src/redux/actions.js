/* eslint-disable prettier/prettier */
import {
  addDictionary,
  addWord,
  deleteDictionary,
  deleteWord,
  editDictionary,
  editWord,
  getDictionariesByToken,
  getUserByToken,
  getWordsByToken,
  loginUser,
  registerUser as registerUserApi,
} from '../dictionaryApi';
import { setCookie } from '../utils/functionHelp';

import { EXIT, SET_IS_DICTIONARIES, SET_IS_FETCHING, SET_IS_WORDS, SET_USER } from './actionsNames';

export const setIsFetching = (statusIsFetching) => {
  return { type: SET_IS_FETCHING, isFetching: statusIsFetching };
};

export const setUserData = (name, email, token) => {
  return { type: SET_USER, name, email, token };
};

export const exit = () => {
  return {type: EXIT}
}

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
    setCookie('token', token);
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
    dispatch(getDictionaries(token))
    dispatch(setIsFetching(false));
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

export const excuteFuncAndUpdateDictionries =
  (func, token, ...args) =>
    async (dispatch) => {
      try{
        dispatch(setIsFetching(true));
        const response = await func(...args, token);
        dispatch(getDictionaries(token));
        dispatch(setIsFetching(false));
        return response;
      } catch (error) {
        dispatch(setIsFetching(false));
        return Promise.reject(error);
      }
    };

export const createAndUpdateDictionaries = (name, token) => async (dispatch) => {
  const result = await dispatch(excuteFuncAndUpdateDictionries(addDictionary, token, name));
  return result;
};

export const editAndUpdateDictionaries = (id, name, token) => async (dispatch) => {
  const result = await dispatch(excuteFuncAndUpdateDictionries(editDictionary, token, id, name));
  return result;
};

export const deleteAndUpdateDictionaries = (id, token) => async (dispatch) => {
  const result = await dispatch(excuteFuncAndUpdateDictionries(deleteDictionary, token, id));
  return result;
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

export const excuteFuncAndUpdateWords =
  (func, token,idDict, ...args) =>
    async (dispatch) => {
      console.log(args);
      
      try{
        dispatch(setIsFetching(true));
        const response = await func(...args, token);
        
        dispatch(getWords(idDict,token));
        dispatch(setIsFetching(false));
        return response;
      } catch (error) {
        dispatch(setIsFetching(false));
        return Promise.reject(error);
      }
    };

export const editAndUpdateWord = (idWord, english, russian, transcription, idDict, token) => async (dispatch) =>{
  const result = dispatch(excuteFuncAndUpdateWords(editWord, token, idDict, idWord, english, russian, transcription));
  return result;
}

export const createAndUpdateWord = (english, russian, transcription, idDict, token) => async (dispatch) =>{
  const result = dispatch(excuteFuncAndUpdateWords(addWord, token, idDict, idDict, english, russian,transcription));
  return result;
}

export const deleteAndUpdateWord = (idWord, idDict, token) => async (dispatch) =>{
  const result = dispatch(excuteFuncAndUpdateWords(deleteWord, token, idDict, idWord));
  return result;
}
