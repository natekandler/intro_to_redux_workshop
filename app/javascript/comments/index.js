import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import CommentsContainer from './CommentsContainer'
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import commentReducer from '../reducers/commentReducer'

const store = createStore(commentReducer)

class CommentIndex extends Component {
  render() {
    return (
      <Provider store={store}>
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
