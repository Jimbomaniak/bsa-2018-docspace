import * as actionTypes from './groupsActionsTypes'

const initialState = []

function groupsReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_GROUPS_SUCCESS:
      return action.payload
    case actionTypes.CREATE_GROUP_SUCCESS:
      return [ ...state, action.payload ]
    case actionTypes.GET_GROUP_SUCCESS:
    case actionTypes.UPDATE_GROUP_SUCCESS:
      return action.payload
    case actionTypes.DELETE_GROUP_SUCCESS:
      return state.filter(group => group._id !== action.payload._id)
    default: return state
  }
}

export default groupsReducer
