import * as actionTypes from './spaceActionTypes'
import { UPDATE_PAGE_SUCCESS } from 'src/components/page/logic/pageActionTypes'
import { combineReducers } from 'redux'

const initialState = {
  all: [],
  byId: {}
}

function all (state = initialState.all, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_SPACES_SUCCESS:
      return action.payload.all

    case actionTypes.DELETE_SPACE_SUCCESS:
      return state.filter(id => id !== action.payload.id)

    case actionTypes.GET_SPACE_SUCCESS:
    case actionTypes.CREATE_SPACE_SUCCESS:
      return [ ...state, action.payload._id ]

    default: return state
  }
}

function byId (state = initialState.byId, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SPACE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    case actionTypes.GET_ALL_SPACES_SUCCESS:
      return action.payload.byId

    case actionTypes.GET_SPACE_SUCCESS:
    case actionTypes.CREATE_SPACE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    // update target page title in pages list
    case UPDATE_PAGE_SUCCESS: {
      const { _id, spaceId, title } = action.payload
      const updatedPages = state[spaceId].pages.map(page => page._id === _id ? { ...page, title: title } : page)
      return {
        ...state,
        [spaceId]: {
          ...state[spaceId],
          pages: updatedPages
        }
      }
    }

    default: return state
  }
}

export default combineReducers({
  all,
  byId
})

// SELECTOR
// usage: import this selector and do this :
// const mapStateToProps = ( state) => { spaces: allSpaces(state) }
// Now you have array of spaces objects

export const allSpaces = ({spaces}) => spaces.all.map(id => spaces.byId[id])

export const spaceById = (state) => {
  const id = state.router.location.pathname.split('/')[2]

  return state.spaces.byId[id]
}
