import { getComments, createComment, deleteComment } from '../client/CommentClient'

export const FETCH_COMMENTS = "FETCH_COMMENTS"
export const CREATE_COMMENT = "CREATE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"

export function fetchComments() {
  return {
    type: FETCH_COMMENTS,
    payload: getComments()
  }
}

export function createNewComment(commentData) {
  return {
    type: CREATE_COMMENT,
    payload: createComment(commentData)
  }
}
export function removeComment(comment) {
  return {
    type: DELETE_COMMENT,
    payload: deleteComment(comment)
  }
}
