import React, { Component } from  'react';
import {withRouter, NavLink} from 'react-router-dom';

import config from '../config'
import './../UpdateBookmark/UpdateBookmark.css';
import Context from './../Context/Context';

const Required = () => (
  <span className='UpdateBookmark__required'>*</span>
)

class EditBookmarkPage extends Component {
  static defaultProps = {
    onUpdateBookmark: () => {}
  };

  state = {
    error: null,
  };

  

  render() {
    console.log(this.props);
    const { error } = this.state
    const { onClickCancel } = this.props
    return (
      <Context.Consumer>
        {value => {

        
          return (  
            <section className='UpdateBookmark'>
              <h2>Create a bookmark</h2>
              <form
                className='UpdateBookmark__form'
                onSubmit={(e) => value.handleSubmitEdit(e, this.props.history, value.state.editing.id)}
              >
                <div className='UpdateBookmark__error' role='alert'>
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
                    defaultValue={`${value.state.editing.title}`}
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
                    defaultValue={`${value.state.editing.url}`}
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
                    defaultValue={`${value.state.editing.description}`}
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
                    defaultValue={`${value.state.editing.rating}`}
                    min='1'
                    max='5'
                    required
                  />
                </div>
                <div className='UpdateBookmark__buttons'>
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

export default withRouter(EditBookmarkPage);
