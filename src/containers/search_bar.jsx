import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWeather } from '../actions/index'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { term: '' }
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onInputChange(event) {
    console.log(event.target.value)
    this.setState({ term: event.target.value })
  }

  onFormSubmit(event) {
    event.preventDefault()

    // fetch the weather data
    this.props.fetchWeather(this.state.term)

    // clear out the input box
    this.setState({ term: '' })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input 
          type="text"
          placeholder="Get a five-day forecast in your favorite cities"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    )
  }
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchWeather }, dispatch)
}

// Section 5, #57, Redux-Promises in Practice, 5:20
export default connect(null, mapDispatchToProps)(SearchBar)