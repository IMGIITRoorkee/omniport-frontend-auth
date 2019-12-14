import axios from 'axios'

import {
  getUserLoginUrlApi,
  getWhoAmIApi,
  getQuestionApi,
  getVerifyAnswerApi,
  changePasswordApi,
  getUserLogoutUrlApi,
  getGuestUserLoginUrlApi
} from 'services/auth/src/urls'

export const userLogin = (data, callback) => {
  return async dispatch => {
    try {
      const res = await axios.post(getUserLoginUrlApi(), data)
      dispatch({ type: 'LOG_IN', payload: res.data, isGuestAuth: false })
      callback(res.data.status)
    } catch (err) {
      callback(err.response.data.errors.nonFieldErrors[0])
    }
  }
}

export const userLogout = (_, callback) => {
  return async dispatch => {
    try {
      const res = await axios.get(getUserLogoutUrlApi())
      dispatch({ type: 'LOG_OUT', payload: res.data })
      callback()
    } catch (err) {
      callback()
    }
  }
}

export const guestUserLogin = (data, callback) => {
  return async dispatch => {
    try {
      const res = await axios.get(getGuestUserLoginUrlApi(), data)
      dispatch({ type: 'LOG_IN', payload: res.data, isGuestAuth: true })
      callback(res.data.status)
    } catch (err) {
      callback(err.response.data.errors.nonFieldErrors[0])
    }
  }
}

export const whoami = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(getWhoAmIApi())

      const roles = res.data.roles
      
      var isGuest =false;

      for (var index = 0; index < roles.length; ++index) {
        var role = roles[index];
        if(role.role == "Guest"){
          isGuest = true;
          break;
        }
      }
      
      console.log(isGuest)

      dispatch({
        type: 'LOG_IN',
        payload: res.data,
        isGuestAuth: isGuest
      })
    } catch (err) {
      getState()
      dispatch({
        type: 'LOG_OUT'
      })
    }
  }
}

export const getQuestion = (username, callback) => {
  return async () => {
    try {
      const res = await axios.get(getQuestionApi(username))

      callback(res.data.secretQuestion)
    } catch (err) {
      callback(err.response.data.errors.username[0])
    }
  }
}

export const validateAnswer = (data, callback) => {
  return async () => {
    try {
      const res = await axios.post(getVerifyAnswerApi(data.username), data)
      callback(res.data.status)
    } catch (err) {
      callback(err.response.data.errors.secretAnswer[0])
    }
  }
}

export const changePassword = (data, callback) => {
  return async () => {
    try {
      const res = await axios.post(changePasswordApi(), data)
      callback(res.data.status)
    } catch (err) {
      callback(err.response.data.errors.secretAnswer[0])
    }
  }
}
