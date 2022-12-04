import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { parseErrorForHookForms } from '../../utils/functionHelp';
import { validateNameHook } from '../../utils/validateRules';
import { LinkPrimary } from '../LinkPrimary';

import formStyle from './CreateForm.module.scss';

const CreateForm = ({ submitFunc, type }) => {
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const submitDictionary = ({ name }) => {
    submitFunc(name)
      .then(() => setShowForm(false))
      .catch((errors) =>
        errors.errors
          ? parseErrorForHookForms(errors.errors, setError)
          : setError('general', { type: 'general', message: errors?.message }),
      );
  };
  if (!showForm) {
    return <LinkPrimary text={'Add new item'} className="table__link-add" primary onClick={() => setShowForm(true)} />;
  } else if (type === 'word')
    return (
      <form className={formStyle['form']} onSubmit={handleSubmit(submitDictionary)}>
        <label htmlFor="name" className={formStyle['label']}>
          <span className={formStyle['name-label']}>Name Dictionary</span>
          {errors?.general && <span className="ant-error">{errors?.general?.message || 'Error General'}</span>}
          {errors?.name && <span className="ant-error">{errors?.name?.message || 'Error'}</span>}
          <input type="text" className={formStyle['input']} {...register('name', validateNameHook)} />
        </label>
        <label htmlFor="">
          <button type="submit" className={formStyle['button']}>
            Add dictionary
          </button>
          <button className={`${formStyle['button']} ${formStyle['button-cancel']}`} onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </label>
      </form>
    );
  else if (type === 'dictionary')
    return (
      <form className={formStyle['form']} onSubmit={handleSubmit(submitDictionary)}>
        <label htmlFor="name" className={formStyle['label']}>
          <span className={formStyle['name-label']}>Name Dictionary</span>
          {errors?.general && <span className="ant-error">{errors?.general?.message || 'Error General'}</span>}
          {errors?.name && <span className="ant-error">{errors?.name?.message || 'Error'}</span>}
          <input type="text" className={formStyle['input']} {...register('name', validateNameHook)} />
        </label>
        <label htmlFor="">
          <button type="submit" className={formStyle['button']}>
            Add dictionary
          </button>
          <button className={`${formStyle['button']} ${formStyle['button-cancel']}`} onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </label>
      </form>
    );
};
export default CreateForm;
