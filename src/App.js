import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import HomePage from './LandingPages/HomePage';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={() => <HomePage />} />
      </Switch>
    );
  }
}

export default App;