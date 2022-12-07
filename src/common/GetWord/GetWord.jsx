import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Table } from '../../components/Table';
import TableRowWord from '../../components/TableRowWord/TableRowWord';
import { createAndUpdateWord, deleteAndUpdateWord, editAndUpdateWord, getWords } from '../../redux/actions';
import { columnsWordsForTable } from '../../utils/namesColumns';
const GetWord = () => {
  const dispatch = useDispatch();
  const { id: idDict } = useParams();
  const token = useSelector((state) => state.user.token);
  const items = useSelector((state) => state.data.words);
  const dictionaryName = useSelector((state) => state.data?.dictionaries).find((item) => item.id === +idDict)?.name;

  useEffect(() => {
    if (token) dispatch(getWords(idDict, token));
  }, [token]);

  return (
    <Table
      items={items}
      title={`Dictionary is ${dictionaryName || ''}`}
      namesTitlesCells={columnsWordsForTable}
      ComponentTr={TableRowWord}
      type="word"
      editItem={(id, english, russian, transcription) =>
        dispatch(editAndUpdateWord(id, english, russian, transcription, idDict, token))
      }
      addItem={(english, russian, transcription) =>
        dispatch(createAndUpdateWord(english, russian, transcription, idDict, token))
      }
      deleteItem={(idWord) => dispatch(deleteAndUpdateWord(idWord, idDict, token))}
      withCreateItem
    />
  );
};
export default GetWord;
