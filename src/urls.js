import config from '../config.json'

//  Frontend Url's

export const getAuthUrl = () => {
  return config.baseUrl
}

export const getLoginUrl = () => {
  return `${getAuthUrl()}/login`
}

export const getForgotPasswordUrl = () => {
  return `${getAuthUrl()}/change/password`
}

//  Backend API's

export const getUserLoginUrlApi = () => {
  return '/session_auth/login/'
}

export const getWhoAmIApi = () => {
  return '/kernel/who_am_i/'
}

export const getQuestionApi = username => {
  return `/base_auth/verify_secret_answer/?username=${username}`
}

export const getVerifyAnswerApi = username => {
  return `/base_auth/verify_secret_answer/?username=${username}`
}

export const changePasswordApi = () => {
  return '/base_auth/reset_password/'
}
