import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import HomePage from './LandingPages/HomePage';
import AddBookmarkPage from './LandingPages/AddBookmarkPage';
import EditBookmarkPage from './LandingPages/EditBookmarkPage';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={() => <HomePage />} />
        <Route exact path='/bookmarks' component={() => <HomePage />} />
        <Route exact path='/bookmarks/add' component={() => <AddBookmarkPage />} />
        <Route exact path='/bookmarks/edit' component={() => <EditBookmarkPage />} />
      </Switch>
    );
  }
}

export default App;