import { FETCH_COMMENTS, CREATE_COMMENT, DELETE_COMMENT } from '../actions/index'

export default ( state = [], action) => {
  switch(action.type){
    case FETCH_COMMENTS:
      return action.payload
    case CREATE_COMMENT:
      return [...state, action.payload];
    case DELETE_COMMENT:
      return state.filter(function(comment){
        return comment.id != action.payload.id
      })
  }
  return state
}
