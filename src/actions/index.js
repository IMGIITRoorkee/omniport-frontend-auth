import axios from 'axios'
import { toast } from 'react-semantic-toasts'

import {
  getUserLoginUrlApi,
  getWhoAmIApi,
  getQuestionApi,
  getVerifyAnswerApi,
  changePasswordApi,
  getUserLogoutUrlApi,
  getGuestUserLoginUrlApi,
  getTokenApi,
  verifyTokenApi,
  resetPasswordApi,
  registrationUrl
} from 'services/auth/src/urls'

import { ifRole } from 'formula_one'
import { getGoogleOAuthUrlApi } from '../urls'

export const checkUserAuthStatus = (data, callback) => {
  return async dispatch => {
    try {
      const res = await axios.get(getGoogleOAuthUrlApi('check_auth_status/'))
      if (res.data) {
        dispatch({ type: 'LOG_IN', payload: res.data, isGuestAuth: false})
      }
      callback(res.data.status)
    } catch (err) {
      callback(err.response.data.errors.nonFieldErrors[0])
    }
  }
}

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
      const res = await axios.get(getGuestUserLoginUrlApi())
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

      let isGuest = ifRole(roles, 'Guest') !== 'NOT_ROLE' ? true : false

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

export const resetPassword = (data, callback) => {
  return async () => {
    try {
      const res = await axios.post(resetPasswordApi(), data)
      callback(res.data)
    } catch (err) {
      callback(err.response.data.errors.username[0])
    }
  }
}

export const getToken = (username, callback) => {
  return async () => {
    try {
      const res = await axios.get(getTokenApi(username))
      toast({
        type: 'success',
        title: 'Success',
        description: res.data,
        animation: 'fade up',
        icon: 'check',
        time: 4000
      })
      callback(res.data)
    } catch (err) {
      callback(err.response.data.errors.username[0])
    }
  }
}

export const verifyToken = (token, successCallback, errCallback) => {
  return async () => {
    try {
      const res = await axios.get(verifyTokenApi(token))
      successCallback(res.data)
    } catch (err) {
      errCallback(err)
    }
  }
}
