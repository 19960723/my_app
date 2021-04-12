import config from '@/config'
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export const formtImg = (url) => {
  let result
  if (url.startsWith('http') || url.startsWith('https')) {
    result = url
  } else {
    const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
    result = baseUrl + url
  }
  return result
}
