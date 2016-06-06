export function selectBook(book){
  // type, payload
  // selectBook is an `ActionCreator`, it needs to return an action, an object
  // with a `type` property and somtimes a property which is the `payload`.
  return {
    type: 'BOOK_SELECTED',
    payload: book
  }
}