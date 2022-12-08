/* eslint-disable prettier/prettier */
const textForReqiredFieldRu = 'Это поле обязательное';
const textForReqiredField = 'This field is required';
const redexpForEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

export const onlyRequired  = (isRussian) => [{ required: true, message: isRussian ? textForReqiredFieldRu : textForReqiredField }];

export const validateEmail = (isRussian) => [
  { required: true, message: isRussian ? textForReqiredFieldRu : textForReqiredField },
  { pattern: redexpForEmail, message: isRussian ? 'Неверный формат' : 'Incorrect format' },
];

export const validateUsernameRegister = (isRussian) => [
  { required: true, message: isRussian ? textForReqiredFieldRu : textForReqiredField },
  { min: 3, message: isRussian ? 'Имя пользователя не может быть меньше 3-х символов' : 'The user name cannot be less than 3 characters' },
  { max: 20, message: isRussian ? 'Имя пользователя не может быть больше 20 символов' : 'The user name cannot be more than 20 characters' },
];

export const validatePasswordRegister = (isRussian) => [
  { required: true, message: isRussian ? textForReqiredFieldRu : textForReqiredField },
  { min: 6, message: isRussian ? 'Пароль не может быть меньше 6 символов' : 'The password cannot be less than 6 characters' },
  { max: 40, message: isRussian ? 'Пароль не может быть больше 40 символов' : 'The password cannot be more than 40 characters' },
];

export const validatePasswordEdit = (isRussian) => [
  { min: 6, message: isRussian ? 'Пароль не может быть меньше 6 символов' : 'The password cannot be less than 6 characters'},
  { max: 40, message: isRussian ? 'Пароль не может быть больше 40 символов' : 'The password cannot be more than 40 characters'},
];

export const validateRepeatPassword =
  (isRussian) =>
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(isRussian ? 'Пароли не совпадают' : 'Passwords don\'t match'));
      },
    });

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
