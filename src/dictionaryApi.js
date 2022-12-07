const baseUrl = 'https://u140505new.test-handyhost.ru/api';
const baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const rulesForConvertData = {
  dictionary: (dictionary) => {
    return {
      id: +dictionary.id,
      name: dictionary.name,
      count: +dictionary.count,
      create: dictionary.created_at,
      words: dictionary.words,
    };
  },
  word: (word) => {
    return {
      id: +word.id,
      english: word.english,
      russian: word.russian,
      transcription: word.transcription,
      create: word.created_at,
    };
  },
  resultTesting: (test) => {
    return {
      nameDict: test.name_dictionary,
      countWords: test.count_words,
      countTrue: test.count_true,
      countFalse: test.count_false,
      testingTimeSeconds: test.time_testing_seconds,
      create: test.created_at,
    };
  },
};

const checkAndReturnResponse = async (response, ruleConvertData) => {
  let data = await response.json();
  if (response.ok) {
    if (ruleConvertData !== undefined) {
      data = data.map(ruleConvertData);
    }
    return data;
  } else {
    return Promise.reject(data);
  }
};

const checkAndReturnNestedResponse = async (response, ruleConvertData, nameFieldConvertInResponse) => {
  let data = await response.json();
  if (response.ok) {
    if (ruleConvertData !== undefined) {
      data = ruleConvertData(data[nameFieldConvertInResponse]);
    }
    return data;
  } else {
    return Promise.reject(data);
  }
};

export const loginUser = async (email, password) => {
  const body = {
    email,
    password,
  };
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      ...baseHeaders,
    },
    body: JSON.stringify(body),
  });

  return checkAndReturnResponse(response);
};

export const editUser = async (name, email, password, token) => {
  const body = {
    name,
    email,
    password,
  };
  const response = await fetch(`${baseUrl}/user`, {
    method: 'PUT',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return checkAndReturnResponse(response);
};

export const getUserByToken = async (token) => {
  const response = await fetch(`${baseUrl}/user`, {
    method: 'GET',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  return checkAndReturnResponse(response);
};

export const registerUser = async (name, email, password) => {
  const body = {
    name,
    email,
    password,
  };
  const response = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      ...baseHeaders,
    },
    body: JSON.stringify(body),
  });

  return checkAndReturnResponse(response);
};

export const getDictionariesByToken = async (token) => {
  const response = await fetch(`${baseUrl}/dictionary/count`, {
    method: 'GET',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  return checkAndReturnResponse(response, rulesForConvertData.dictionary);
};

export const addDictionary = async (name, token) => {
  const body = {
    name,
  };
  const response = await fetch(`${baseUrl}/dictionary`, {
    method: 'POST',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return checkAndReturnNestedResponse(response, rulesForConvertData.dictionary, 'dictionary');
};

export const editDictionary = async (id, name, token) => {
  const body = {
    id,
    name,
  };
  const response = await fetch(`${baseUrl}/dictionary`, {
    method: 'PUT',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return checkAndReturnResponse(response);
};

export const deleteDictionary = async (id, token) => {
  const response = await fetch(`${baseUrl}/dictionary/${id}`, {
    method: 'DELETE',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  return checkAndReturnResponse(response);
};

export const getWordsByToken = async (id, token) => {
  const response = await fetch(`${baseUrl}/word/${id}`, {
    method: 'GET',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  return checkAndReturnResponse(response, rulesForConvertData.word);
};

export const addWord = async (dictionary_id, english, russian, transcription, token) => {
  const body = {
    dictionary_id,
    english,
    russian,
    transcription,
    token,
  };
  const response = await fetch(`${baseUrl}/word`, {
    method: 'POST',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return checkAndReturnResponse(response);
};

export const editWord = async (id, english, russian, transcription, token) => {
  const body = {
    id,
    english,
    russian,
    transcription,
    token,
  };
  const response = await fetch(`${baseUrl}/word`, {
    method: 'PUT',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return checkAndReturnResponse(response);
};

export const deleteWord = async (id, token) => {
  const response = await fetch(`${baseUrl}/word/${id}`, {
    method: 'DELETE',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  return checkAndReturnResponse(response);
};

export const getErrorWord = async (token) => {
  const response = await fetch(`${baseUrl}/error_word`, {
    method: 'GET',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  return checkAndReturnResponse(response, rulesForConvertData.word);
};

export const addErrorWord = async (idWord, token) => {
  const response = await fetch(`${baseUrl}/error_word`, {
    method: 'POST',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ word_id: idWord }),
  });

  return checkAndReturnResponse(response);
};

export const deleteErrorWord = async (idWord, token) => {
  const response = await fetch(`${baseUrl}/error_word/${idWord}`, {
    method: 'DELETE',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  return checkAndReturnResponse(response);
};

export const getHistoryResults = async (token) => {
  const response = await fetch(`${baseUrl}/result_testing`, {
    method: 'GET',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
  });

  return checkAndReturnResponse(response, rulesForConvertData.resultTesting);
};

export const addResult = async (name_dictionary, count_words, count_true, count_false, time_testing_seconds, token) => {
  const body = {
    name_dictionary,
    count_words,
    count_true,
    count_false,
    time_testing_seconds,
  };
  const response = await fetch(`${baseUrl}/result_testing`, {
    method: 'POST',
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return checkAndReturnResponse(response);
};
