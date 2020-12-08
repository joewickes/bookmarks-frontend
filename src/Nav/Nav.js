import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav(props) {
  return (
    <nav className='Nav'>
      <button>
        Bookmark List
      </button>
      {' '}
      <NavLink to={'/bookmarks/add'}>
        <button>
          Add Bookmark
        </button>
      </NavLink>
    </nav>
  );
}
