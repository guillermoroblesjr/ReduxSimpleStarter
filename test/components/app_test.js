import { renderComponent , expect } from '../test_helper'
import App from '../../src/components/app'
import deepFreeze from 'deep-freeze-strict'

describe('App' , () => {
  let component

  beforeEach(() => {
    component = renderComponent(App);
  })

  it('renders something', () => {
    expect(component).to.exist;
  })

  it('add counter', () => {
    const addCounter = (list) => {
      return [...list, 0]
    }

    const testAddCounter = () => {
      const listBefore = []
      const listAfter = [0]

      deepFreeze(listBefore)
      expect(listBefore).to.be.frozen

      expect(
        addCounter(listBefore)
      ).to.eql(listAfter)
    }

    testAddCounter()
  })

  it('remove counter', () => {
    const removeCounter = (list, index) => {
      return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
      ]
    }

    const testRemoveCounter = () => {
      const listBefore = [0, 10, 20]
      const listAfter = [0, 20]

      deepFreeze(listBefore)
      expect(listBefore).to.be.frozen

      expect(
        removeCounter(listBefore, 1)
      ).to.eql(listAfter)
    }

    testRemoveCounter()
  })

  it('increment counter', () => {
    const incrementCounter = (list, index) => {
      return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
      ]
    }

    const testIncrementCounter = () => {
      const listBefore = [0, 10, 20]
      const listAfter = [0, 11, 20]

      deepFreeze(listBefore)
      expect(listBefore).to.be.frozen

      expect(
        incrementCounter(listBefore, 1)
      ).to.eql(listAfter)
    }

    testIncrementCounter()
  })

  it('toggle todo with a frozen object', () => {
    const toggleTodo = (todo) => {
      // GOOD
      return {
        ...todo,
        completed: !todo.completed
      }
      // return Object.assign({}, todo, {
      //   completed: !todo.completed
      // })

      // BAD
      // todo.completed = !todo.completed
      // return todo
    }

    const testToggleTodo = () => {
      const todoBefore = {
        id: 0,
        text: 'Learn Redux',
        completed: false
      }
      const todoAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: true
      }

      deepFreeze(todoBefore)
      expect(todoBefore).to.be.frozen

      expect(
        toggleTodo(todoBefore)
      ).to.eql(todoAfter)
    }

    testToggleTodo()
  })

  it('todo list reducer', () => {

    // Must be a pure function that requires the state
    // and the action being dispatched.
    // 
    // NOTE: This is refactored below.
    // 
    // const todos = (state = [], action) => {
    //   switch (action.type) {
    //     case 'ADD_TODO':
    //       return [
    //         ...state,
    //         {
    //           id: action.id,
    //           text: action.text,
    //           completed: false
    //         }
    //       ]
    //     case 'TOGGLE_TODO':
    //       return state.map(todo => {
    //         if (todo.id !== action.id){
    //           return todo
    //         }
    //         return {
    //           ...todo,
    //           completed: !todo.completed
    //         }
    //       })
    //     default:
    //       return state
    //   }
    // }

    const todo = (state, action) => {
      switch (action.type) {
        case 'ADD_TODO':
          return {
            id: action.id,
            text: action.text,
            completed: false
          }
        case 'TOGGLE_TODO':
          if (state.id !== action.id){
            return state
          }
          return {
            ...state,
            completed: !state.completed
          }
      }
    }

    // Must be a pure function that requires the state
    // and the action being dispatched.
    // NOTE: this function will only take care of how 
    // the entire todos are updated. The function above
    // `todo` will take care of how each individual todo
    // is updated.
    const todos = (state = [], action) => {
      switch (action.type) {
        case 'ADD_TODO':
          return [
            ...state,
            todo(undefined, action)
          ]
        case 'TOGGLE_TODO':
          return state.map(t => todo(t, action))
        default:
          return state
      }
    }

    describe('ADD_TODO action', () => {
      it('will add a todo item', () => {
        const stateBefore = []
        const action = {
          type: 'ADD_TODO',
          id: 0,
          text: 'Learn Redux'
        }
        const stateAfter = [
          {
            id: 0,
            text: 'Learn Redux',
            completed: false
          }
        ]

        deepFreeze(stateBefore)
        deepFreeze(action)

        expect(
          todos(stateBefore, action)
        ).to.eql(stateAfter)
      })
    })

    describe('TOGGLE_TODO action', () => {
      it('will toggle a todo item', () => {
        const stateBefore = [
          {
            id: 0,
            text: 'Learn Redux',
            completed: false
          },
          {
            id: 1,
            text: 'Go shopping',
            completed: false
          },
        ]

        const action = {
          type: 'TOGGLE_TODO',
          id: 1
        }

        const stateAfter = [
        {
          id: 0,
          text: 'Learn Redux',
          completed: false
        },
        {
          id: 1,
          text: 'Go shopping',
          completed: true
        },
        ]

        deepFreeze(stateBefore)
        deepFreeze(action)

        expect(
          todos(stateBefore, action)
        ).to.eql(stateAfter)
      })
    })

  })


/*
  it('', () => {

  })
*/

})
