import { FETCH_WEATHER } from '../actions/index'

export default (state = [], action) => {
  // console.log('Action received', action)

  switch (action.type) {
    case FETCH_WEATHER:
      // NEVER mutate the state, always return a new state.
      // action.payload.data becomes the first item in the array
      // and the items in state are spread over the rest of the array.

      // return state.concat([action.payload.data])
      return [action.payload.data, ...state]
  }

  return state
}