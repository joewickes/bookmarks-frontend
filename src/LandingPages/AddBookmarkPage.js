import React, { Component } from  'react';
import {withRouter, NavLink} from 'react-router-dom';


import config from '../config'
import Context from '../Context/Context';
import Nav from '../Nav/Nav';
import './../AddBookmark/AddBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class AddBookmarkPage extends Component {
  static defaultProps = {
    onAddBookmark: () => {}
  };

  render() {
    const { onClickCancel } = this.props
    return (
      <Context.Consumer>
        {(value) => {
          const { error } = value.state

          return (
            <section className='AddBookmark'>
              <h2>Create a bookmark</h2>
              <form
                className='AddBookmark__form'
                onSubmit={(e) => value.handleSubmit(e, this.props.history)}
              >
                <div className='AddBookmark__error' role='alert'>
                  {error && <p>{error.message}</p>}
                </div>
                <div>
                  <label htmlFor='title'>
                    Title
                    {' '}
                    <Required />
                  </label>
                  <input
                    type='text'
                    name='title'
                    id='title'
                    placeholder='Great website!'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='url'>
                    URL
                    {' '}
                    <Required />
                  </label>
                  <input
                    type='url'
                    name='url'
                    id='url'
                    placeholder='https://www.great-website.com/'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='description'>
                    Description
                  </label>
                  <textarea
                    name='description'
                    id='description'
                  />
                </div>
                <div>
                  <label htmlFor='rating'>
                    Rating
                    {' '}
                    <Required />
                  </label>
                  <input
                    type='number'
                    name='rating'
                    id='rating'
                    defaultValue='1'
                    min='1'
                    max='5'
                    required
                  />
                </div>
                <div className='AddBookmark__buttons'>
                  <NavLink to={'/bookmarks'}>
                    <button type='button' onClick={onClickCancel}>
                      Cancel
                    </button>
                  </NavLink>
                  {' '}
                  <button type='submit'>
                    Save
                  </button>
                </div>
              </form>
            </section>
          )
        }}
      </Context.Consumer>
      
    );
  }
}

export default withRouter(AddBookmarkPage);
