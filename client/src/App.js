import React from 'react';
import './App.scss';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import EmotionData from './Data/Data';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter className="App">
      <Header/>

      
        <Switch>
            <Route path='/' exact component={HomePage}/>
            <Route path='/data' component={EmotionData}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
