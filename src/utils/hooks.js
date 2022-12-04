import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const useLoader = () => {
  return useSelector((state) => state.isFetching);
};

export const useDoubleTouch = (func) => {
  const [doubleTouch, setDoubleTouch] = useState(false);
  const doubleTouchDetect = (func) => {
    if (!doubleTouch) {
      setDoubleTouch(true);
      setTimeout(function () {
        setDoubleTouch(false);
      }, 300);
      return false;
    }
    func();
  };
  return doubleTouchDetect;
};

export const useValidate = (item, validateRule) => {
  const [error, setError] = useState(false);
};
