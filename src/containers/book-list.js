/*
  A `container` is just a `Component` that has direct access to the 
  redux `state`. Containers are also known as `smart components`,
  where other components are `dumb components` which do not speak to
  redux.

  BookList was premoted to a container because it has to be aware of
  the application `state`.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectBook } from '../actions/index'
// this makes sure that our actions flow automatically through all the
// reducers
import { bindActionCreators } from 'redux'

export class BookList extends Component {

  renderList(){
    return this.props.books.map(book => {
      return (

        <li 
          key={book.title} 
          className="list-group-item"
          onClick={() => this.props.selectBook(book)}
        >
          {book.title}
        </li>
      )
    })
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

// this function is the `glue` between React and React-Redux.
// anytime the `state` changes, the `container` (component) will
// re-render.
// all properties on the returned object will be set as `props`
// on the `container`.
function mapStateToProps(state){
  // Whatever is returned will show up as `props` inside of BookList
  return {
    books: state.books
  }
}

// anything returned from this function will end up as props on the
// BookList container
function mapDispatchToProps(dispatch){
  // whenever `selectBook` is called, the result should be passed to
  // all of our reducers
  return bindActionCreators({ selectBook: selectBook }, dispatch)
}

// Promote `BookList` from a component to a container - it needs to know
// about this new `dispatch` method `selectBook`. Make it available as
// a `prop`.
// `connect` requires a function and a component. this will export
// the `container`.
export default connect(mapStateToProps, mapDispatchToProps)(BookList)