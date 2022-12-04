/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
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
import { createAndUpdateDictionaries, deleteAndUpdateDictionaries, editAndUpdateDictionaries, getDictionaries, getWords, loginUserAction } from '../../redux/actions';
import { TableRowDictionary } from '../TableRowDictionary';
import { columnsDictionariesForTable } from '../../utils/namesColumns';
import GetWord from '../../common/GetWord/GetWord';
import CreateForm from '../CreateForm/CreateForm';


const App = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() =>  dispatch(loginUserAction('vosf03@gmail.com', '1234')), []);


  const loggin = true;
  const selector = useSelector((state) => Boolean(state.user.name));
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (selector) dispatch(getDictionaries(token));
  }, [selector]);
  // useEffect(() => console.log(state), [state]);
  const routes = [
    {
      path: '/',
      Component: loggin ? Table : GuestPage,
      args: loggin
        ? {
          namesTitlesCells: columnsDictionariesForTable,
          items: state.data.dictionaries,
          ComponentTr: TableRowDictionary,
          title: 'Dictiories',
          addItem: (name) =>  dispatch(createAndUpdateDictionaries(name, token)),
          editItem: (id, name) => dispatch(editAndUpdateDictionaries(id, name, token)),
          deleteItem: (id) => dispatch(deleteAndUpdateDictionaries(id, token)),
        }
        : { loggin: loggin },
    },
    { path: '/login', Component: SignIn, args: {} },
    { path: '/register', Component: SignUp, args: {} },
    { path: '/dictionary/:id', Component: GetWord },
  ];
  return (
    <Router>
      <ErrorBoundaries>
        <Header loggin={false} />
        <main className="main container">
          <Route path="/" exact render={() => {
            if(!loggin)
              return <GuestPage />
            else
              return <Table namesTitlesCells={columnsDictionariesForTable} 
                items={state.data.dictionaries} 
                title="Dictiories"
                ComponentTr={TableRowDictionary}
                type="dictionary"
                addItem={(name) => dispatch(createAndUpdateDictionaries(name, token))}
                editItem={(id, name) => dispatch(editAndUpdateDictionaries(id, name, token))} 
                deleteItem={(id) => dispatch(deleteAndUpdateDictionaries(id, token))}/>
          }}/>
          <Route path="/login" component={SignIn}/>
          <Route path="/register" component={SignUp}/>
          <Route path="/dictionary/:id" render={() => {
            return <GetWord />;
          }} />
        </main>
        <Footer />
      </ErrorBoundaries>
    </Router>
  );
};
export default App;
