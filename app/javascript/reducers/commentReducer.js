import { FETCH_COMMENTS, CREATE_COMMENT } from '../actions/index'

export default ( state = [], action) => {
  switch(action.type){
    case FETCH_COMMENTS:
      return action.payload
    case CREATE_COMMENT:
      return [...state, action.payload];
  }
  return state
}
