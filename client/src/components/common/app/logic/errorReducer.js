import * as actionTypesUser from 'components/containers/user/logic/userActionTypes'
import * as actionTypesSpace from 'components/space/spaceContainer/logic/spaceActionTypes'
import * as actionTypesPage from 'components/page/logic/pageActionTypes'
import * as actionTypesGroup from 'components/group/logic/groupsActionsTypes'
import * as actionTypesError from 'components/common/app/logic/errorActionTypes'
const initialState = {
  status: 0,
  message: ''
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesUser.COMPARE_USER_ERROR:
    case actionTypesSpace.GET_SPACE_ERROR:
    case actionTypesPage.GET_PAGE_BY_ID_ERROR:
    case actionTypesGroup.GET_GROUP_ERROR:
    {
      return {
        status: action.err.status
      }
    }
    case actionTypesError.REDIRECT_TO_HELPFUL_LINK:
    {
      return action.payload
    }
    default: return state
  }
}

export default errorReducer
