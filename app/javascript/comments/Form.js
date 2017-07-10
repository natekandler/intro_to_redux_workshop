import React, { Component } from 'react';
import { getFormValues } from '../Utils/utils'
import { createNewComment } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Form extends Component { 
  handleFormSubmit(event) {
    event.preventDefault();
    let newComment = getFormValues(event.target)
    newComment.author = newComment.author ? newComment.author : "anonymous"
    if(newComment.body){
      this.props.createNewComment(newComment)
      this.props.hideCommentForm(event)
    }
  }
  render() {
    return (
      <div>
        <form className="Form" onSubmit={this.handleFormSubmit.bind(this)}>
          <textarea name="body" placeholder="comment"/><br/>
          <input type="text" name="author" placeholder="author"/><br/>
          <input type="submit" value="Submit"/>
        </form>
        <a className="btn__cancel" href="#" onClick={this.props.hideCommentForm}>cancel</a>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createNewComment}, dispatch)
}

export default connect(null, mapDispatchToProps)(Form);
