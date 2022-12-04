export const parseErrorForHookForms = (errors, setErrorFunc) => {
  for (const key in errors) {
    setErrorFunc(key, { type: key, message: errors[key][0] });
  }
  return;
};
