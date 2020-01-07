import { routerReducer as routing } from 'react-router-redux/lib'
import { combineReducers } from 'redux'
import { signupReducer } from 'components/auth/signup/logic/signupReducer'
import { loginReducer } from 'components/auth/login/logic/loginReducer'
import { resetReducer } from 'components/auth/reset/logic/resetReducer'
import { setNewPasswordReducer } from 'components/auth/setNewPassword/logic/setNewPasswordReducer'
import userReducers from 'components/containers/user/logic/userReducer'
import spaceReducer from 'components/space/spaceContainer/logic/spaceReducer'
import pageReducer from 'components/page/logic/pageReducer'
import blogReducer from 'components/blog/logic/blogReducer'
import {verificationReducer} from 'components/auth/verification/logic/verificationReducer'
import activityReducer from 'components/dashboard/main/activity/logic/activityReducer'
import groupsReducer from 'components/group/logic/groupsReducer'
import matchingUsersReducer from 'components/modals/groupDialog/logic/matchingUserReducer'
import searchReducer from 'commonLogic/search/searchReducer'
import allUsersReducer from 'components/dashboard/peopleBody/logic/allUsersReducer'
import { warningModalReducer } from 'components/modals/warningModal/logic/warningModalReducer'
import errorReducer from 'components/common/app/logic/errorReducer'
import permissionsReducer from 'components/space/spaceSettings/permissions/logic/permissionsReducer'

const baseReducer = combineReducers({
  signup: signupReducer,
  login: loginReducer,
  user: userReducers,
  pages: pageReducer,
  error: errorReducer,
  spaces: spaceReducer,
  currentSpacePermissions: permissionsReducer,
  blog: blogReducer,
  groups: groupsReducer,
  search: searchReducer,
  matchingUsers: matchingUsersReducer,
  verification: verificationReducer,
  activity: activityReducer,
  reset: resetReducer,
  setNewPassword: setNewPasswordReducer,
  allUsers: allUsersReducer,
  warningModal: warningModalReducer,
  routing
})

export default baseReducer
