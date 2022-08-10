const dayjs = require('dayjs')

export function formatDateTime(date) {
  return dayjs(date).format('ddd, MMM D, YYYY h:mm A')
}

export function setSessionData(key, value) {
  sessionStorage.setItem(key, value)
}

export function getSessionData(key) {
  return JSON.parse(sessionStorage.getItem(key))
}