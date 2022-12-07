/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import 'antd/dist/antd.css';
import './App.scss';


import { SignUp } from '../SignUp';
import { SignIn } from '../SignIn';
import { ErrorBoundaries } from '../../common/ErrorBoundaries';
import { GuestPage } from '../GuestPage';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Table } from '../Table';
import { createAndUpdateDictionaries, deleteAndUpdateDictionaries, editAndUpdateDictionaries, getDataUser, getDictionariesAndErrorWords, getResults, setTestingData } from '../../redux/actions';
import { TableRowDictionary } from '../TableRowDictionary';
import { columnsDictionariesForTable, columnsErrorWordsForTable, columnsResultForTable } from '../../utils/namesColumns';
import GetWord from '../../common/GetWord/GetWord';
import { getCookie, shuffleArray } from '../../utils/functionHelp';
import { useLoader } from '../../utils/hooks';
import { Loader } from '../../common/Loader';
import SettingTest from '../SettingTest/SettingTest';
import Testing from '../Testing/Testing';
import { addErrorWord, addResult, deleteErrorWord } from '../../dictionaryApi';
import { TableRowErrorWord } from '../TableRowErrorWord';
import { TableRowResults } from '../TableRowResults';
import { LinkPrimary } from '../LinkPrimary';
import { AxiosInterceptor } from '../../common/AxiosInterceptor/AxiosInterceptor';

const App = () => {
  let loggin = useSelector((state) => Boolean(state.user.name));
  const dictionaries = useSelector((state) => state.data.dictionaries);
  const errorsWords = useSelector((state) => state.data.errorsWords);
  const testingData = useSelector((state) => state.data.testing);
  const results = useSelector((state) => state.data.results)
  const history = useHistory();
  const dispatch = useDispatch();
  const token = getCookie('token');


  const saveTestingSetting = async (id, countVariants, countWords, lang) => {
    await dispatch(getDictionariesAndErrorWords(token));
    const dictionaryUpdate = dictionaries.find(dict => dict.id === id);
    if (dictionaryUpdate?.count >= countWords) {
      const wordsForTesting = shuffleArray(dictionaryUpdate.words).slice(-countWords);
      dispatch(setTestingData(dictionaryUpdate, wordsForTesting, countVariants, lang));
      history.push('/testing')
      return Promise.resolve();
    } else {
      return Promise.reject('Words is not enough');
    }
  }
  const saveTestingSettingWithErrorsWords = async (countVariants, countWords) => {
    await dispatch(getDictionariesAndErrorWords(token));
    if (errorsWords.length >= countWords) {
      const wordsForTesting = shuffleArray(errorsWords).slice(-countWords);
      dispatch(setTestingData({}, wordsForTesting, countVariants));
      history.push('/testing-error')
      return Promise.resolve();
    } else {
      return Promise.reject('Words is not enough');
    }
  }

  const addErrorWordFunc = (id) => addErrorWord(id, token);
  const deleteErrorWordFunc = (id) => deleteErrorWord(id, token);

  useEffect(() => {
    if (token) {
      console.log('lol');

      dispatch(getDataUser(token));
    }
  }, []);

  const handleResult = (nameDict, countWords, countTrue, countFalse, timeTesting) => {
    addResult(nameDict, countWords, countTrue, countFalse, timeTesting, token).then(() => {
      dispatch(getResults(token));
    });
    dispatch(getDictionariesAndErrorWords(token)).then(() => {
    });
  }


  return (
    <ErrorBoundaries>
      <Header loggin={loggin} />
      <main className={`main container ${useLoader() ? 'opacity' : null}`}>
        {useLoader() && <Loader />}
        <Route path="/" exact render={() => {
          if (!loggin)
            return <GuestPage />
          else
            return <Table namesTitlesCells={columnsDictionariesForTable}
              items={dictionaries}
              title="Dictiories"
              ComponentTr={TableRowDictionary}
              type="dictionary"
              addItem={(name) => dispatch(createAndUpdateDictionaries(name, token))}
              editItem={(id, name) => dispatch(editAndUpdateDictionaries(id, name, token))}
              deleteItem={(id) => dispatch(deleteAndUpdateDictionaries(id, token))} withCreateItem />
        }} />

        <Route path="/login" component={SignIn} />
        <Route path="/register" component={SignUp} />

        <Route path="/dictionary/:id" render={() => {
          return <AxiosInterceptor><GetWord /></AxiosInterceptor>;
        }} />
        <Route path="/error-words" >
          <AxiosInterceptor>
            <Table items={errorsWords} ComponentTr={TableRowErrorWord} title="Words with error" namesTitlesCells={columnsErrorWordsForTable}>
              <LinkPrimary text="Work on error" small primary disabled={errorsWords.length < 4 || false} href="/setting-testing-error" />
            </Table>
          </AxiosInterceptor>
        </Route>
        <Route path="/setting-testing" render={() => {
          return <AxiosInterceptor>
            <SettingTest items={dictionaries} saveSettingFunc={saveTestingSetting} />
          </AxiosInterceptor>;
        }} />
        <Route path="/setting-testing-error" render={() => {
          return <AxiosInterceptor>
            <SettingTest items={errorsWords} saveSettingFunc={saveTestingSettingWithErrorsWords} workOnError />
          </AxiosInterceptor>;
        }} />
        <Route path="/testing-error" render={() => {
          return <AxiosInterceptor>
            <Testing items={testingData} onFihish={handleResult} workOnErrorTrueAnswerFunc={deleteErrorWordFunc} mode="workOnError" />
          </AxiosInterceptor>
        }} />
        <Route path="/testing" render={() => {
          return <AxiosInterceptor><Testing items={testingData} onFihish={handleResult} wrongAnswerFunc={addErrorWordFunc} /></AxiosInterceptor>;
        }} />
        <Route path="/results" render={() => {
          return <AxiosInterceptor>
            <Table namesTitlesCells={columnsResultForTable} ComponentTr={TableRowResults} items={results} />
          </AxiosInterceptor>;
        }} />
      </main>
      <Footer />
    </ErrorBoundaries>
  );
};
export default App;
