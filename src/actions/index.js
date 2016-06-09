export function selectBook(book){
  // { type, payload }
  // selectBook is an `ActionCreator`, it needs to return an action, an object
  // with a `type` property. it can have any number of properties but commonly
  // has a property which is the `payload`.
  // the `type` describes the purpose of the action.
  return {
    type: 'BOOK_SELECTED',
    payload: book
  }
}