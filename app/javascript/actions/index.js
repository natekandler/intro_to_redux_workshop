export const FETCH_COMMENTS = "FETCH_COMMENTS"

export function fetchComments() {
  return {
    type: FETCH_COMMENTS,
    payload: [{id: 1, author: "me!", body: "from the reducer"}]
  }
}
