import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import CommentsContainer from './CommentsContainer'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import commentReducer from '../reducers/commentReducer'
import ReduxPromise from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

class CommentIndex extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(commentReducer)}>
        <CommentsContainer />  
      </Provider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CommentIndex name="CommentIndex" />,
    document.body.appendChild(document.createElement('div')),
  )
})
