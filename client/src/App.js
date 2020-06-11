import React from 'react';
import HomePage from './HomePage/HomePage'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter className="App">

      <Switch>
        <Route path='/' exact component={HomePage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
