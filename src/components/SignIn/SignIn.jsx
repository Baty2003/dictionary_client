import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import classNames from 'classnames';

import { onlyRequired, validateEmail } from '../../utils/validateRules';
import { loginUserAction } from '../../redux/actions';
import { useLoader } from '../../utils/hooks';
import { Loader } from '../../common/Loader';

const SignIn = () => {
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
        <h1 className="antd-title">SIGN IN</h1>
        {error && <p className="ant-error">{error}</p>}
        <Form.Item label="Email" name="email" rules={validateEmail}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={onlyRequired}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <p className="ant-second-text">
          Don&apos;t you have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Form>
    </section>
  );
};
export default SignIn;
