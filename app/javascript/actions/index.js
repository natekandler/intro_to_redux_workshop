import { getComments, createComment } from '../client/CommentClient'

export const FETCH_COMMENTS = "FETCH_COMMENTS"
export const CREATE_COMMENT = "CREATE_COMMENT"

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
