import config from '../config.json'

//  Frontend Url's

export const getAuthUrl = () => {
  return config.baseUrl
}

export const getLoginUrl = () => {
  return `${getAuthUrl()}/login`
}

export const getLogoutUrl = () => {
  return `${getAuthUrl()}/logout`
}

export const getForgotPasswordUrl = () => {
  return `${getAuthUrl()}/forgot_password`
}

//  Backend API's

export const getUserLoginUrlApi = () => {
  return '/session_auth/login/'
}

export const getUserLogoutUrlApi = () => {
  return '/session_auth/logout/'
}

export const illustrationRouletteUrlApi = () => {
  return '/session_auth/illustration_roulette/'
}

export const getGuestUserLoginUrlApi = () => {
  return '/guest_auth/login/'
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

export const illustrationUrl = (name) => {
  return `/static/illustrations/${name}.svg`
}

export const getTokenApi = (username) => {
  return `/base_auth/recover_password/?username=${username}`
}

export const resetPasswordUrl = () => {
  return `/auth/reset_password/`
}

export const verifyTokenApi = (token) => {
  return `/base_auth/verify/?recovery_token=${token}`
}
export const resetPasswordApi = () => {
  return `/base_auth/recover_password/`
}