import { combineReducers } from 'redux'
import BooksReducer from './reducer_books'
import ActiveBook from './reducer_active_book'

// NOTE:application state is generated through reducer functions

const rootReducer = combineReducers({
  // state: (state = {}) => state
  // NOTE: all the reducers here are available on the global state.
  // each reducer is responsible for creating a different piece of state. 
  books: BooksReducer,
  activeBook: ActiveBook
});

export default rootReducer;
