import axios from 'axios'

import { getUserLoginUrl } from 'services/auth/src/urls'

export const userLogin = (data, callback) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(getUserLoginUrl(), data)
      dispatch({ type: 'LOG_IN', payload: res.data })
      callback(res.data.data.attributes.text)
    } catch (err) {
      callback(err.response.data.errors.non_field_errors[0])
    }
  }
}

export const whoami = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get('/kernel/who_am_i')
      dispatch({
        type: 'LOG_IN',
        payload: res.data
      })
    } catch (err) {
      getState()
      dispatch({
        type: 'LOG_OUT'
      })
    }
  }
}
