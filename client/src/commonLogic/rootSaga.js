
import { fork, all } from 'redux-saga/effects'
import signupWatcher from 'components/auth/signup/logic/signupSaga'
import loginWatcher from 'components/auth/login/logic/loginSaga'
import spaceSaga from 'components/space/spaceContainer/logic/spaceSaga'
import userSaga from 'components/containers/user/logic/userSaga'
import resetSaga from 'components/auth/reset/logic/resetSaga'
import setNewPasswordSaga from 'components/auth/setNewPassword/logic/setNewPasswordSaga'
import verificationWatcher from 'components/auth/verification/logic/verificationSaga'
import pageSaga from 'components/page/logic/pageSaga'
import commentSaga from 'components/page/commentsLogic/commentsSaga'
import likesSaga from 'components/page/likesLogic/likesSaga'
import blogSaga from 'components/blog/logic/blogSaga'
import historyWatcher from 'commonLogic/historySaga/historySaga'
import activitySaga from 'components/dashboard/main/activity/logic/activitySaga'
import groupSaga from 'components/group/logic/groupSaga'
import watcherSaga from 'components/page/watcherLogic/watcherSaga'
import matchingUsersSaga from 'components/modals/groupDialog/logic/matchingUserSaga'
import searchSaga from 'commonLogic/search/searchSaga'
import clientsActionsExchangeSaga from 'sockets/clientsActionsExchangeSaga'
import permissionsSaga from 'components/space/spaceSettings/permissions/logic/permissionsSaga'
import allUsersSaga from 'components/dashboard/peopleBody/logic/allUsersSaga'
import notificationsSaga from 'components/modals/notificationsModal/logic/saga'

function * rootSaga () {
  yield all([
    fork(spaceSaga),
    fork(pageSaga),
    fork(userSaga),
    fork(commentSaga),
    fork(likesSaga),
    fork(blogSaga),
    fork(activitySaga),
    fork(groupSaga),
    fork(watcherSaga),
    fork(matchingUsersSaga),
    fork(searchSaga),
    fork(resetSaga),
    fork(setNewPasswordSaga),
    fork(clientsActionsExchangeSaga),
    fork(permissionsSaga),
    fork(allUsersSaga),
    fork(notificationsSaga),
    verificationWatcher(),
    signupWatcher(),
    loginWatcher(),
    historyWatcher()
  ])
}

export default rootSaga
