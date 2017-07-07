import { FETCH_COMMENTS } from '../actions/index'

export default ( state = [], action) => {
  switch(action.type){
    case FETCH_COMMENTS:
    return action.payload
  }
  return state
}
