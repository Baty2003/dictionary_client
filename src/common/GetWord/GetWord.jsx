import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Table } from '../../components/Table';
import TableRowWord from '../../components/TableRowWord/TableRowWord';
import { getWords } from '../../redux/actions';
import { columnsWordsForTable } from '../../utils/namesColumns';
const GetWord = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const items = useSelector((state) => state.data.words);

  useEffect(() => {
    if (token) dispatch(getWords(id, token));
  }, [token]);

  return <Table items={items} namesTitlesCells={columnsWordsForTable} ComponentTr={TableRowWord} type="word" />;
};
export default GetWord;
