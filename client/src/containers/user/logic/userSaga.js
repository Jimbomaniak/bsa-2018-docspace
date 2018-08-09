import { takeEvery, put, all, call } from 'redux-saga/effects'
import * as actionTypes from './userActionTypes'
import { userService } from 'src/services/userService'
import { loginService } from 'src/services/loginService'

function * getUser (action) {
  const result = yield userService.getUserData(action.payload.id)
  yield put({
    type: actionTypes.GET_USER_DATA_SUCCESS,
    payload: result
  })
}

function * updUser (action) {
  const result = yield userService.updateUser(action.payload)
  yield put({
    type: actionTypes.UPDATE_USER_SUCCESS,
    payload: result
  })
}

function * chackUserPassword (action) {
  try {
    const { email, password } = action

    let response = yield call(loginService.login, {email, password})
    console.log(response.success)
    if (!response.success) {
      throw new Error(response.message)
    }
    yield put({ type: actionTypes.CHECK_USER_PASSWORD_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.CHECK_USER_PASSWORD_FAILED, error })
  }
}

export default function * selectionsSaga () {
  yield all([
    takeEvery(actionTypes.GET_USER_DATA, getUser),
    takeEvery(actionTypes.UPDATE_USER, updUser),
    takeEvery(actionTypes.CHECK_USER_PASSWORD, chackUserPassword)
  ])
}
