const dayjs = require('dayjs')
import router from '@/router'

export function formatDateTime(date) {
  return dayjs(date).format('ddd, MMM D, YYYY h:mm A')
}

export function routePush(path) {
  router.push(path)
}