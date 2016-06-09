import React, { Component } from 'react'
import { connect } from 'react-redux'

// NOTE: the component state is completely different than the 
// application state.

class BookDetail extends Component {
  render() {

    // render this first if no book has been selected.
    if (!this.props.book) {
      return (
        <div>Select a book to get started.</div>
      )
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>Title: {this.props.book.title}</div>
        <div>Pages: {this.props.book.pages}</div>
      </div>
    )
  }
}

// the object return will show up as props within BookDetail
let mapStateToProps = (state) => {
  return {
    book: state.activeBook
  }
}

export default connect(mapStateToProps)(BookDetail)