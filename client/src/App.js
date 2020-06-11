import React from 'react';
import './App.scss';
import HomePage from './HomePage/HomePage'
import Header from './Header/Header';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter className="App">
        <Header/>
        <Switch>
          <Route path='/' exact component={HomePage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
