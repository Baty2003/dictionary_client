import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal, Popconfirm, Button, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { LinkPrimary } from '../LinkPrimary';
import { exit, getDataUser } from '../../redux/actions';
import { getCookie, setCookie } from '../../utils/functionHelp';
import { editUser } from '../../dictionaryApi';

import headerStyle from './Header.module.scss';

const Header = ({ loggin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const countErrorWords = useSelector((state) => state.data.errorsWords.length);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [errorsEditProfile, setErrorsEditProfile] = useState(false);
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const { Text } = Typography;
  const token = getCookie('token');

  useEffect(() => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
    });
  }, [user.name, user.email]);

  const exitFunc = () => {
    dispatch(exit());
    setCookie('token', '');
    history.push('/');
  };
  const closeModalProfile = () => setShowProfileModal(false);
  const closeModalProfileEdit = () => {
    setShowEditProfileModal(false);
    form.resetFields();
  };

  const editProfileSubmit = ({ name, email, password }) => {
    if (name === user.name) name = '';
    if (email === user.email) email = null;
    if (!name && !email && !password) {
      closeModalProfileEdit();
      return;
    }
    editUser(name, email, password, token)
      .then(() => {
        dispatch(getDataUser(token));
        closeModalProfileEdit();
      })
      .catch((error) => {
        setErrorsEditProfile(error?.errors);
      });
  };
  if (loggin) {
    return (
      <header className={headerStyle['header']}>
        <Modal title="User menu" open={showProfileModal} onOk={closeModalProfile} onCancel={closeModalProfile} on>
          <LinkPrimary
            text="Edit profile"
            href="#"
            onClick={() => {
              setShowProfileModal(false);
              setShowEditProfileModal(true);
            }}
          />
          <hr />
          <LinkPrimary text="Show results testing" href="/results" onClick={() => setShowProfileModal(false)} />
        </Modal>
        <Modal
          title="Edit Name User"
          open={showEditProfileModal}
          onOk={closeModalProfileEdit}
          onCancel={closeModalProfileEdit}
          on
        >
          <Form onFinish={editProfileSubmit} form={form} initialValues={!showEditProfileModal && {}}>
            {errorsEditProfile?.name && <Text type="danger">{errorsEditProfile?.name[0]}</Text>}
            <Form.Item
              label="username"
              name="name"
              initialValue={user.name}
              rules={[{ max: 20, message: 'Name can be no more than 20 characters' }]}
            >
              <Input></Input>
            </Form.Item>
            {errorsEditProfile?.email && <Text type="danger">{errorsEditProfile?.email[0]}</Text>}
            <Form.Item
              label="email"
              name="email"
              initialValue={user.email}
              rules={[{ type: 'email' }, { max: 40, message: 'Email can be no more than 40 characters' }]}
            >
              <Input></Input>
            </Form.Item>
            {errorsEditProfile?.password && <Text type="danger">{errorsEditProfile?.password[0]}</Text>}
            <Form.Item label="password" name="password" initialValue="">
              <Input type="password"></Input>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <nav className={`${headerStyle['nav-header']} ${headerStyle['nav-header-loggin']}`}>
          <Link className={headerStyle['title']} to="/">
            English Dictionary
          </Link>
          <p className={headerStyle['text-profile']} onClick={() => setShowProfileModal(true)}>
            Welcome <span className={headerStyle['username-text']}>{user.name}</span>
          </p>
          <div className={headerStyle['container-link']}>
            <LinkPrimary text="Testing" href="/setting-testing" primary />
            <LinkPrimary text={`List errors - ${countErrorWords}`} href="/error-words" primary />
            <Popconfirm onConfirm={exitFunc} title={'Do you want to get out?'}>
              <LinkPrimary text="Exit" href="/exit" primary />
            </Popconfirm>
          </div>
        </nav>
      </header>
    );
  } else {
    return (
      <header className={headerStyle['header']}>
        <nav className={headerStyle['nav-header']}>
          <Link className={headerStyle['title']} to="/">
            English Dictionary
          </Link>
          <div className={headerStyle['container-link']}>
            <LinkPrimary text={'login'} href="/login" />
            <LinkPrimary text={'register'} href="/register" primary />
          </div>
        </nav>
      </header>
    );
  }
};
export default Header;
