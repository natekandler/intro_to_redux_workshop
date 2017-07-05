import React, { Component } from 'react';
import Comments from './Comments'
import Form from './Form'
import { getComments, createComment, deleteComment } from '../client/CommentClient'
import { getFormValues, commentList } from '../Utils/utils'
import { connect } from 'react-redux';

class CommentsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      showForm: false,
      comments: []
    };
  }

  componentDidMount() {
    getComments.bind(this)();
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let newComment = getFormValues(event.target)
    if(newComment.body){
      createComment.bind(this)(newComment)
    }
  }

  hideCommentForm(e) {
    e.preventDefault();
    this.setState({ showForm: false })
  }

  showCommentForm() {
    this.setState({ showForm: true })
  } 
  
  renderForm() {
    if(this.state.showForm){
      return <Form handleFormSubmit={this.handleFormSubmit.bind(this)} hideCommentForm={this.hideCommentForm.bind(this)} />
    } else {
      return <button onClick={this.showCommentForm.bind(this)}>Add Comment</button>
    }
  }

  render() {
    return (
      <div className="CommentsContainer">
        <Comments comments={this.props.comments} deleteComment={deleteComment.bind(this)} />
        {this.renderForm()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state
  }
}

export default connect(mapStateToProps, null)(CommentsContainer);

