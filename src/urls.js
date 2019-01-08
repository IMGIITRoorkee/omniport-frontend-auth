import config from '../config.json'

export function getAuthUrl () {
  return config.baseUrl
}

export function getLoginUrl () {
  return `${getAuthUrl()}/login`
}

export function getForgotPasswordUrl () {
  return `${getAuthUrl()}/forgot/password`
}

export function getLinkStorageUrl () {
  return `${getAuthUrl()}/storage`
}

export function getChangePasswordUrl () {
  return `${getAuthUrl()}/forgot/password/new`
}

export function getUserLoginUrl () {
  return '/session_auth/login/'
}
