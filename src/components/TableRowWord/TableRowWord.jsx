import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { Popconfirm } from 'antd';
import { useForm } from 'react-hook-form';

import { useDoubleTouch } from '../../utils/hooks.js';
import { validateWordsFieldHook } from '../../utils/validateRules.js';
import { parseErrorForHookForms } from '../../utils/functionHelp.js';

import tableRowStyle from './TableRowWord.module.scss';

const TableRowWord = ({ id, create, english, russian, transcription, editItem, deleteItem }) => {
  const [edit, setEdit] = useState(false);
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    reset,
    setFocus,
  } = useForm({ mode: 'onBlur' });

  const classTd = tableRowStyle['td'];
  const doubleTouchDetect = useDoubleTouch();

  const submitFunc = ({ english: englishForm, russian: russianForm, transcription: transcriptionForm }) => {
    if (english !== englishForm || russian !== russianForm || transcription !== transcriptionForm) {
      editItem(id, englishForm, russianForm, transcriptionForm)
        .then(() => {
          setEdit(false);
        })
        .catch((errors) => {
          errors.errors
            ? parseErrorForHookForms(errors.errors, setError)
            : setError('general', { type: 'general', message: errors?.message });
        });
    } else {
      setEdit(false);
    }
  };
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setEdit(false);
    }
  });

  useEffect(() => {
    if (!edit) {
      reset();
    } else {
      setFocus('english');
    }
  }, [edit]);

  if (edit) {
    return (
      <tr
        data-id={id}
        onDoubleClick={() => setEdit(false)}
        onTouchStart={() => doubleTouchDetect(() => setEdit(false))}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setEdit(false);
        }}
      >
        <td colSpan={3} className={tableRowStyle['name-dictionary']}>
          <form className={tableRowStyle['form']} onSubmit={handleSubmit(submitFunc)}>
            <label htmlFor="name" className={tableRowStyle['label']}>
              <input
                type="text"
                name="english"
                className={tableRowStyle['input']}
                {...register('english', { ...validateWordsFieldHook, value: english })}
              />
              {errors.english && <span>{errors?.english?.message || 'Error'}</span>}
              {errors.general && <span>{errors?.general?.message || 'Error general'}</span>}
            </label>
            <label htmlFor="name" className={tableRowStyle['label']}>
              <input
                type="text"
                name="russian"
                className={tableRowStyle['input']}
                {...register('russian', { ...validateWordsFieldHook, value: russian })}
              />
              {errors.russian && <span>{errors?.russian?.message || 'Error'}</span>}
              {errors.general && <span>{errors?.general?.message || 'Error general'}</span>}
            </label>
            <label style={{ display: 'flex' }} htmlFor="name" className={tableRowStyle['label']}>
              <input
                type="text"
                name="transcription"
                className={tableRowStyle['input']}
                {...register('transcription', { ...validateWordsFieldHook, value: transcription })}
              />
              {errors.transcription && <span>{errors?.transcription?.message || 'Error'}</span>}
              {errors.general && <span>{errors?.general?.message || 'Error general'}</span>}
            </label>
            <label htmlFor="">
              <button type="submit" className={tableRowStyle['submit-button']}>
                submit
              </button>
            </label>
          </form>
        </td>
        <td></td>
        <td></td>
      </tr>
    );
  }
  return (
    <>
      <tr data-id={id} onDoubleClick={() => setEdit(true)} onTouchStart={() => doubleTouchDetect(() => setEdit(true))}>
        <td className={classTd}>{english}</td>
        <td className={classTd}>{russian}</td>
        <td className={classTd}>{transcription}</td>
        <td>{format(new Date(create), 'MM/dd/yy')}</td>
        <td>
          {
            <Popconfirm onConfirm={() => deleteItem(id)} title={'Delete this item?'} className={tableRowStyle['pop']}>
              Delete
            </Popconfirm>
          }
        </td>
      </tr>
    </>
  );
};
export default TableRowWord;
