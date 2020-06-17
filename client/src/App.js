import React from 'react';
import './App.scss';
import Header from './Header/Header';
import HomePage from './HomePage/HomePage';
import EmotionData from './Data/Data';
import Anxiety from './Anxiety/Anxiety';
import Anger from './Anger/Anger';
import Depression from './Depression/Depression';
import Journal from './Journal/Journal';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter className="App">
      <Header/>

      
        <Switch>
            <Route path='/' exact component={HomePage}/>
            <Route path='/data' component={EmotionData}/>
            <Route path='/anxiety' component={Anxiety}/>
            <Route path='/anger' component={Anger}/>
            <Route path='/depression' component={Depression}/>
            <Route path='/journal' component={Journal}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
