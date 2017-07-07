import { getComments } from '../client/CommentClient'

export const FETCH_COMMENTS = "FETCH_COMMENTS"

export function fetchComments() {
  return {
    type: FETCH_COMMENTS,
    payload: getComments()
  }
}
