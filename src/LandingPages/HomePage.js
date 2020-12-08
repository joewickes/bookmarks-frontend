import React, { Component } from 'react';
import AddBookmark from './../AddBookmark/AddBookmark';
import BookmarkList from './../BookmarkList/BookmarkList';
import {withRouter} from 'react-router-dom';
import Nav from './../Nav/Nav';
import Context from './../Context/Context';

class HomePage extends Component {

  render() {
    return (
      <Context.Consumer>
        {(value) => {

        const { page, bookmarks } = value.state;

          return (
            <main className='App'>
              <h1>Bookmarks!</h1>
              <Nav clickPage={value.changePage} />
              <div className='content' aria-live='polite'>
                  <BookmarkList
                    bookmarks={bookmarks}
                    history={this.props.history}
                  />
              </div>
            </main>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withRouter(HomePage);