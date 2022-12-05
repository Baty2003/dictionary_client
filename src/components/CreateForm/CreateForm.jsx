import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { parseErrorForHookForms } from '../../utils/functionHelp';
import { validateNameHook } from '../../utils/validateRules';
import { LinkPrimary } from '../LinkPrimary';

import formStyle from './CreateForm.module.scss';

const CreateForm = ({ submitFunc, type, hideFunc, showFunc, show }) => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const submit = (data) => {
    submitFunc(...Object.values(data))
      .then(() => {
        hideFunc();
      })
      .catch((error) => {
        console.log(error);

        error.errors
          ? parseErrorForHookForms(error.errors, setError)
          : setError('general', { type: 'general', message: error?.message });
      });
  };

  if (!show) {
    return <LinkPrimary text={'Add new item'} className="table__link-add" primary onClick={showFunc} href="#" />;
  } else if (type === 'word')
    return (
      <form className={formStyle['form']} onSubmit={handleSubmit(submit)}>
        <label htmlFor="name" className={formStyle['label']}>
          <span className={formStyle['name-label']}>English</span>
          {errors?.general && <span className="ant-error">{errors?.general?.message || 'Error General'}</span>}
          {errors?.english && <span className="ant-error">{errors?.english?.message || 'Error'}</span>}
          <input type="text" className={formStyle['input']} {...register('english', validateNameHook)} />
        </label>
        <label htmlFor="name" className={formStyle['label']}>
          <span className={formStyle['name-label']}>Russian</span>
          {errors?.general && <span className="ant-error">{errors?.general?.message || 'Error General'}</span>}
          {errors?.russian && <span className="ant-error">{errors?.russian?.message || 'Error'}</span>}
          <input type="text" className={formStyle['input']} {...register('russian', validateNameHook)} />
        </label>
        <label htmlFor="name" className={formStyle['label']}>
          <span className={formStyle['name-label']}>Transcription</span>
          {errors?.general && <span className="ant-error">{errors?.general?.message || 'Error General'}</span>}
          {errors?.transcription && <span className="ant-error">{errors?.transcription?.message || 'Error'}</span>}
          <input type="text" className={formStyle['input']} {...register('transcription', validateNameHook)} />
        </label>
        <label htmlFor="">
          <button type="submit" className={formStyle['button']}>
            Add Word
          </button>
          <button className={`${formStyle['button']} ${formStyle['button-cancel']}`} onClick={hideFunc}>
            Cancel
          </button>
        </label>
      </form>
    );
  else if (type === 'dictionary')
    return (
      <form className={formStyle['form']} onSubmit={handleSubmit(submit)}>
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
          <button className={`${formStyle['button']} ${formStyle['button-cancel']}`} onClick={hideFunc}>
            Cancel
          </button>
        </label>
      </form>
    );
};
export default CreateForm;
