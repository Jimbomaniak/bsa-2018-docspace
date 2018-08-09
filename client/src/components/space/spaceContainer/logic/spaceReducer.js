import * as actionTypes from './spaceActionTypes'
import { combineReducers } from 'redux'

const initialState = {
  all: [],
  byId: {
    TS: {
      name: 'Test space',
      ownerId: '111',
      key: 'TS',
      pages: [
        {
          name: 'First Test Page',
          id: '666'
        }
      ]
    }
  }
}

function all (state = initialState.all, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_SPACES_SUCCESS:
      return action.payload.all

    case actionTypes.DELETE_SPACE_SUCCESS:
      return state.filter(id => id !== action.payload.id)

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

    case actionTypes.CREATE_SPACE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

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
