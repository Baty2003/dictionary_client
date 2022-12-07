const textForReqiredField = 'Это поле обязательное';
const redexpForEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

export const onlyRequired = [{ required: true, message: textForReqiredField }];

export const validateEmail = [
  { required: true, message: textForReqiredField },
  { pattern: redexpForEmail, message: 'Неверный формат' },
];

export const validateUsernameRegister = [
  { required: true, message: textForReqiredField },
  { min: 3, message: 'Имя пользователя не может быть меньше 3-х символов' },
  { max: 20, message: 'Имя пользователя не может быть больше 20 символов' },
];

export const validatePasswordRegister = [
  { required: true, message: textForReqiredField },
  { min: 6, message: 'Пароль не может быть меньше 6 символов' },
  { max: 40, message: 'Пароль не может быть больше 40 символов' },
];

export const validatePasswordEdit = [
  { min: 6, message: 'Пароль не может быть меньше 6 символов' },
  { max: 40, message: 'Пароль не может быть больше 40 символов' },
];

export const validateRepeatPassword = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли не совпадают'));
  },
});

export const validateCheckboxRequired = [
  {
    validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
  },
];

export const validateNameHook = {
  required: 'Field is required',
  maxLength: { value: 20, message: 'Max name length is 20 symbol' },
};

export const validateWordsFieldHook = {
  required: 'Field is required',
  maxLength: { value: 40, message: 'Max name length is 40 symbol' },
};
export const validateTranscriptionFieldHook = {
  maxLength: { value: 40, message: 'Max name length is 40 symbol' },
};

export const validateDictionaryCount = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Пароли не совпадают'));
  },
});
