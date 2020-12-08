import React, { Component } from 'react';
import AddBookmark from './../AddBookmark/AddBookmark';
import BookmarkList from './../BookmarkList/BookmarkList';
import {withRouter} from 'react-router-dom';
import Nav from './../Nav/Nav';
import config from './../config';
import Context, { ContextProvider } from './../Context/Context';

class HomePage extends Component {

  render() {
    return (
      <Context.Consumer>
        {(value) => {

        // HOME PAGE ROUTE
        // NEW PAGE ROUTE
        // EDIT PAGE ROUTE

        const { page, bookmarks } = value.state;

          return (
            <main className='App'>
              <h1>Bookmarks!</h1>
              <Nav clickPage={this.changePage} />
              <div className='content' aria-live='polite'>
                {page === 'add' && (
                  <AddBookmark
                    onAddBookmark={this.addBookmark}
                    onClickCancel={() => this.changePage('list')}
                  />
                )}
                {page === 'list' && (
                  <BookmarkList
                    bookmarks={bookmarks}
                    history={this.props.history}
                  />
                )}
              </div>
            </main>
          );
        }}
      </Context.Consumer>
    );
  }
}

export default withRouter(HomePage);