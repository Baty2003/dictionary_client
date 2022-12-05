/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import { createAndUpdateDictionaries, deleteAndUpdateDictionaries, editAndUpdateDictionaries, exit, getDataUser, getDictionaries} from '../../redux/actions';
import { TableRowDictionary } from '../TableRowDictionary';
import { columnsDictionariesForTable } from '../../utils/namesColumns';
import GetWord from '../../common/GetWord/GetWord';
import { getCookie} from '../../utils/functionHelp';
import { useLoader } from '../../utils/hooks';
import { Loader } from '../../common/Loader';

const App = () => {
  let loggin = useSelector((state) => Boolean(state.user.name));
  const dictionariesLength = useSelector((state) => state.data.dictionaries.length);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = getCookie('token');

  
  useEffect(() => {
    if(token){
      dispatch(getDataUser(token));
    }
  }, []);

  return (
    <Router>
      <ErrorBoundaries>
        <Header loggin={loggin} />
        <main className={`main container ${useLoader() ? 'opacity' : null}`}>
          {useLoader() && <Loader />}
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
