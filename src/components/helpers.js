const dayjs = require('dayjs')

export function formatDateTime(date) {
    return dayjs(date).format('ddd, MMM D, YYYY h:mm A')
}