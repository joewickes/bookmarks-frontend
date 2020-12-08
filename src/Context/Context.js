import React from 'react';
import config from './../config';

const Context = React.createContext();

export class ContextProvider extends React.Component {
  state = {
    bookmarks: [],
    error: null,
    editing: {
      id: null,
      title: null,
      url: null,
      description: null,
      rating: null,
    }
  };

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

  clickEdit = (history, bookmark) => {
    history.push('/bookmarks/edit');
    const { id, rating, title, description, url } = bookmark;
    this.setState({
      editing: {
        id,
        rating,
        title,
        description,
        url,
      }
    })
  }

  editBookmark = (bookmark) => {
    const updatedBookmarks = this.state.bookmarks.map(bmk => {
      if (bmk.id === bookmark.id) {
        return bookmark;
      } else {
        return bmk;
      }
    })

    this.setState({bookmarks: updatedBookmarks});
  }

  handleSubmitEdit = (e, history, id) => {
    e.preventDefault();

    console.log('Got here editing');

    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmark = {
      id: id,
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }

    console.log('bookmark obj', bookmark);
    this.setState({ error: null })

    fetch((config.API_ENDPOINT + `/${id}`), {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
        // 'authorization': `bearer ${config.API_KEY}`
      },
      body: JSON.stringify(bookmark)
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res;
      })
      .then((res) => {
        console.log('got to bookmark', res);
        this.editBookmark(bookmark);
      }
      )
      .then(() => {
        return history.push('/bookmarks');
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleSubmit = (e, history) => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmark = {

      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }
    this.setState({ error: null })
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        // 'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        title.value = ''
        url.value = ''
        description.value = ''
        rating.value = ''
        this.addBookmark(data)
      }
      )
      .then(() => {
        return history.push('/bookmarks');
      })
      .catch(error => {
        this.setState({ error })
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
        handleSubmit: this.handleSubmit,
        handleSubmitEdit: this.handleSubmitEdit,
        clickEdit: this.clickEdit,
      }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;