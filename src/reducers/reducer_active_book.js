// all reducers get two arguments, `state` and `action`.
// state argument is NOT the application state. it's
// only the state that the reducer is responsible for.
// note: ALL reducers run everytime an action is dispatched.
// `state` can never be undefined, so a default of value null
// is set.
export default (state = null, action) => {
  // always return a fresh object for the state. DO NOT modify
  // the current state and return it.
  switch(action.type){
    case 'BOOK_SELECTED':
      return action.payload
  }

  return state
}