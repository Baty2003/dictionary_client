import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { getCookie } from '../../utils/functionHelp';

const AxiosInterceptor = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const [error, setError] = useState(true);
  const baseUrl = 'https://u140505new.test-handyhost.ru/api';
  const token = getCookie('token');
  useEffect(() => {
    if (token) {
      axios.get(`${baseUrl}/user`, {
        method: 'Get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });
    } else {
      history.push('/');
    }
  }, [location.pathname]);

  axios.interceptors.response.use(
    (response) => {
      setError(false);
      return response;
    },
    ({ response }) => {
      if (response.status === 401) {
        history.push('/');
      }
    },
  );
  if (!error) return children;
};

export { AxiosInterceptor };
