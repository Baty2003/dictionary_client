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

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const sumbitForm = ({ name, email, password }) => {
    dispatch(registerUser(name, email, password))
      .then((data) => {
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
        <h1 className="antd-title">SIGN UP</h1>
        {errors?.name && <p className="ant-error">{errors.name[0]}</p>}
        <Form.Item label="Username" name="name" rules={onlyRequired}>
          <Input />
        </Form.Item>

        {errors?.email && <p className="ant-error">{errors.email[0]}</p>}
        <Form.Item label="Email" name="email" rules={validateEmail}>
          <Input />
        </Form.Item>

        {errors?.password && <p className="ant-error">{errors.password[0]}</p>}
        <Form.Item label="Password" name="password" rules={validatePasswordRegister}>
          <Input.Password />
        </Form.Item>

        <Form.Item label="Repeat Password" name="_" rules={[...onlyRequired, validateRepeatPassword]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
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
