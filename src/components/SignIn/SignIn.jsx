import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import classNames from 'classnames';

import { onlyRequired, validateEmail } from '../../utils/validateRules';
import { loginUserAction } from '../../redux/actions';
import { useLoader } from '../../utils/hooks';
import { Loader } from '../../common/Loader';

const SignIn = ({ isRussian }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(false);
  const submitForm = ({ email, password }) => {
    dispatch(loginUserAction(email, password))
      .then(() => history.push('/'))
      .catch((error) => {
        setError(error?.message);
        console.log(error);
      });
  };

  return (
    <section className="pages container">
      {useLoader() && <Loader />}
      <Form
        onFinish={submitForm}
        name="login"
        initialValues={{ remember: true }}
        className={classNames({ hidden: useLoader() })}
      >
        <h1 className="antd-title">{isRussian ? 'ВХОД' : 'SIGN IN'}</h1>
        {error && <p className="ant-error">{error}</p>}
        <Form.Item label={isRussian ? 'Почта' : 'Email'} name="email" rules={validateEmail(isRussian)}>
          <Input />
        </Form.Item>

        <Form.Item label={isRussian ? 'Пароль' : 'Password'} name="password" rules={onlyRequired(isRussian)}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isRussian ? 'Войти' : 'Submit'}
          </Button>
        </Form.Item>
        <p className="ant-second-text">
          {isRussian ? 'У вас нет аккаунта?' : 'Don`t you have an account?'}{' '}
          <Link to="/register">{isRussian ? 'Зарегистрируйтесь' : 'Sign Up'}</Link>
        </p>
      </Form>
    </section>
  );
};
export default SignIn;
