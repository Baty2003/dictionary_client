import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { useDoubleTouch } from '../../utils/hooks.js';
import { validateNameHook } from '../../utils/validateRules.js';
import { parseErrorForHookForms } from '../../utils/functionHelp.js';

import tableRowStyle from './TableRowDictionary.module.scss';

const TableRowDictionary = ({ id, create, name, className, editItem, deleteItem }) => {
  const [edit, setEdit] = useState(false);
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    reset,
    setFocus,
  } = useForm({ mode: 'onBlur' });

  const classes = classNames({ [className]: Boolean(className) });
  const doubleTouchDetect = useDoubleTouch();

  const submitFunc = ({ name: nameForm }) => {
    if (name !== nameForm) {
      editItem(id, nameForm)
        .then(() => {
          setEdit(false);
        })
        .catch((errors) => {
          console.log(errors);

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
    if (edit) {
      setFocus('name');
    }
  }, [edit]);

  if (edit) {
    return (
      <tr
        className={classes}
        data-id={id}
        onDoubleClick={() => setEdit(false)}
        onTouchStart={() => doubleTouchDetect(() => setEdit(false))}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setEdit(false);
        }}
      >
        <td className={tableRowStyle['name-dictionary']}>
          <form className={tableRowStyle['form']} onSubmit={handleSubmit(submitFunc)}>
            <label htmlFor="name" className={tableRowStyle['label']}>
              <input
                type="text"
                name="name"
                className={tableRowStyle['input']}
                {...register('name', { ...validateNameHook, value: name })}
              />
              {errors.name && <span>{errors?.name?.message || 'Error'}</span>}
              {errors.general && <span>{errors?.general?.message || 'Error general'}</span>}
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
        <td className={tableRowStyle['name-dictionary']}>{<Link to={`/dictionary/${id}`}>{name}</Link>}</td>
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
export default TableRowDictionary;
