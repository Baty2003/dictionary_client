const baseUrl = 'https://u140505new.test-handyhost.ru/api';
const baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const rulesForConvertData = {
  dictionary: (dictionary) => {
    return {
      id: dictionary.id,
      name: dictionary.name,
      create: dictionary.created_at,
    };
  },
  word: (word) => {
    return {
      id: word.id,
      english: word.english,
      russian: word.russian,
      transcription: word.transcription,
      create: word.created_at,
    };
  },
};

const checkAndReturnResponse = async (response, ruleConvertData) => {
  let data = await response.json();
  if (response.ok) {
    if (ruleConvertData !== undefined) {
      console.log(data);

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
  const response = await fetch(`${baseUrl}/dictionary`, {
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
