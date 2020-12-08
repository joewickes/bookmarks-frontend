import React from 'react';
import config from './../config';

const Context = React.createContext();

export class ContextProvider extends React.Component {
  state = {
    page: 'list',
    bookmarks: [],
    error: null,
  };

  changePage = (page) => {
    this.setState({ page })
  }

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
      page: 'list',
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
        // 'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    return (
      <Context.Provider value={{
        state: this.state,
        changePage: this.changePage,
        setBookmarks: this.setBookmarks,
        addBookmark: this.addBookmark,
        fetch: this.fetchBookmarks,
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;