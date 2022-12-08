import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { useLoader } from '../../utils/hooks';
import { Loader } from '../../common/Loader';
import { registerUser } from '../../redux/actions';
import {
  validateEmail,
  onlyRequired,
  validatePasswordRegister,
  validateRepeatPassword,
} from '../../utils/validateRules';

import './SignUp.scss';

const SignUp = ({ isRussian }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const sumbitForm = ({ name, email, password }) => {
    dispatch(registerUser(name, email, password))
      .then(() => {
        setErrors(false);
        history.push('/');
      })
      .catch((error) => {
        setErrors(error.errors);
      });
  };
  return (
    <section className={'pages container'}>
      {useLoader() && <Loader />}
      <Form onFinish={sumbitForm} initialValues={{ remember: true }} className={classNames({ hidden: useLoader() })}>
        <h1 className="antd-title">{isRussian ? 'Регистрация' : 'SIGN UP'}</h1>
        {errors?.name && <p className="ant-error">{errors.name[0]}</p>}
        <Form.Item label={isRussian ? 'Имя' : 'Username'} name="name" rules={onlyRequired(isRussian)}>
          <Input />
        </Form.Item>

        {errors?.email && <p className="ant-error">{errors.email[0]}</p>}
        <Form.Item label={isRussian ? 'Почта' : 'Email'} name="email" rules={validateEmail(isRussian)}>
          <Input />
        </Form.Item>

        {errors?.password && <p className="ant-error">{errors.password[0]}</p>}
        <Form.Item
          label={isRussian ? 'Пароль' : 'Password'}
          name="password"
          rules={validatePasswordRegister(isRussian)}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={isRussian ? 'Повторите пароль' : 'Repeat Password'}
          name="_"
          rules={[...onlyRequired(isRussian), validateRepeatPassword(isRussian)]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isRussian ? 'Регистрация' : 'Submit'}
          </Button>
        </Form.Item>
        <p className="ant-second-text">
          Do you already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Form>
    </section>
  );
};
export default SignUp;
