import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { CSSTransition } from 'react-transition-group';

import loaderStyle from './Loader.module.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 86 }} spin />;

const Loader = () => {
  return <Spin indicator={antIcon} className={loaderStyle['loader']} />;
};
export default Loader;
