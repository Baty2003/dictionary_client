import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Modal, Popconfirm, Button, Form, Input, Typography, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { LinkPrimary } from '../LinkPrimary';
import { exit, getDataUser, setLang } from '../../redux/actions';
import { getCookie, setCookie } from '../../utils/functionHelp';
import { editUser } from '../../dictionaryApi';

import headerStyle from './Header.module.scss';

const Header = ({ loggin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const countErrorWords = useSelector((state) => state.data.errorsWords.length);
  const isRussian = useSelector((state) => state.user.lang === 'ru');
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
        <Modal
          title={isRussian ? '???????? ????????????????????????' : 'User menu'}
          open={showProfileModal}
          onOk={closeModalProfile}
          onCancel={closeModalProfile}
          on
        >
          <LinkPrimary
            text={isRussian ? '???????????????????????????? ??????????????' : 'Edit profile'}
            href="#"
            onClick={() => {
              setShowProfileModal(false);
              setShowEditProfileModal(true);
            }}
          />
          <hr />
          <LinkPrimary
            text={isRussian ? '???????????????? ???????????????????? ????????????????????????' : 'Show results testing'}
            href="/results"
            onClick={() => setShowProfileModal(false)}
          />
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
              label={isRussian ? '?????? ????????????????????????' : 'username'}
              name="name"
              initialValue={user.name}
              rules={[
                {
                  max: 20,
                  message: isRussian
                    ? '?????? ???? ?????????? ???????? ???????????? 20 ????????????????'
                    : 'Name can be no more than 20 characters',
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
            {errorsEditProfile?.email && <Text type="danger">{errorsEditProfile?.email[0]}</Text>}
            <Form.Item
              label={isRussian ? '??????????' : 'email'}
              name="email"
              initialValue={user.email}
              rules={[
                {
                  type: 'email',
                  message: isRussian ? '???????????????????????? ????????????' : 'Incorrect format',
                },
                {
                  max: 40,
                  message: isRussian
                    ? '?????????? ???? ?????????? ???????? ???????????? 40 ????????????????'
                    : 'Email can be no more than 40 characters',
                },
              ]}
            >
              <Input></Input>
            </Form.Item>
            {errorsEditProfile?.password && <Text type="danger">{errorsEditProfile?.password[0]}</Text>}
            <Form.Item label={isRussian ? '????????????' : 'password'} name="password" initialValue="">
              <Input type="password"></Input>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                {isRussian ? '??????????????????' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <nav className={`${headerStyle['nav-header']} ${headerStyle['nav-header-loggin']}`}>
          <Link className={headerStyle['title']} to="/">
            English Dictionary
          </Link>
          <div className={headerStyle['profile-info-container']}>
            <p className={headerStyle['text-profile']} onClick={() => setShowProfileModal(true)}>
              {isRussian ? '?????????? ????????????????????' : 'Welcome'}{' '}
              <span className={headerStyle['username-text']}>{user.name}</span>
            </p>
            <Radio.Group
              name="lang"
              buttonStyle="solid"
              defaultValue="en"
              onChange={({ target }) => dispatch(setLang(target.value))}
            >
              <Radio.Button value="en">EN</Radio.Button>
              <Radio.Button value="ru">RU</Radio.Button>
            </Radio.Group>
          </div>
          <div className={headerStyle['container-link']}>
            <LinkPrimary text={isRussian ? '????????' : 'Testing'} href="/setting-testing" primary />
            <LinkPrimary
              text={`${isRussian ? '???????????? ????????????' : 'List errors'} - ${countErrorWords}`}
              href="/error-words"
              primary
            />
            <Popconfirm onConfirm={exitFunc} title={'Do you want to get out?'}>
              <LinkPrimary text={isRussian ? '??????????' : 'Exit'} href="/exit" primary />
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
          <div className={headerStyle['language-container']}>
            <Radio.Group
              name="lang"
              buttonStyle="solid"
              defaultValue="en"
              onChange={({ target }) => dispatch(setLang(target.value))}
            >
              <Radio.Button value="en">EN</Radio.Button>
              <Radio.Button value="ru">RU</Radio.Button>
            </Radio.Group>
          </div>
        </nav>
      </header>
    );
  }
};
export default Header;
