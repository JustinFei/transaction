import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import TransactionList from 'components/transactionlist';
import TransactionDetail from 'components/transactiondetail';
import { AccountName, TransactionType, TransactionItem } from "models/transaction";
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation
} from "react-router-dom";

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const  App = () => {
  const [state, setState] = useState({
      transactionDetail: null
  }); 


  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <TransactionList setTransaction={(transactionDetail) => setState({...state, transactionDetail})}/>
            </Route>
            <Route exact path="/detail">
              <TransactionDetail transactionDetail={state.transactionDetail}/>
            </Route>
            <Route path="*">
              <NoMatch />
          </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
