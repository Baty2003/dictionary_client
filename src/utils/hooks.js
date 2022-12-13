import { useEffect, useMemo, useState } from 'react';
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

export const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null && sortConfig.sortFunction) {
      sortConfig.sortFunction(sortableItems, sortConfig.reverse);
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key, sortFunction) => {
    let reverse = false;
    if (sortConfig && sortConfig.key === key && !sortConfig.reverse) {
      reverse = true;
    }
    setSortConfig({ key, reverse, sortFunction });
  };

  return { items: sortedItems, requestSort };
};
