import React from 'react';
import Rating from '../Rating/Rating';
import Context from './../Context/Context';
import './BookmarkItem.css';

export default function BookmarkItem(props) {
  return (
    <Context.Consumer>
      {(value) => {

        const id = props.id
        console.log('BookmarkItem Props', props);
        return (
          <li className='BookmarkItem'>
            <div className='BookmarkItem__row'>
              <h3 className='BookmarkItem__title'>
                <a
                  href={props.url}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {props.title}
                </a>
              </h3>
              <Rating value={props.rating} />
            </div>
            <p className='BookmarkItem__description'>
              {props.description}
            </p>
            <div className='BookmarkItem__buttons'>
              <button
                className='BookmarkItem__description'
                onClick={() => value.clickEdit(props.history, props)}
              >
                Edit
              </button>
              <button
                className='BookmarkItem__description'
                onClick={() => value.deleteItem(id)}
              >
                Delete
              </button>
            </div>
          </li>);
      }}
    </Context.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}
