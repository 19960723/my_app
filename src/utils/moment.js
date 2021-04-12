import dayjs from 'dayjs'
// 导相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)

export const fromNow = (date) => {
  let result
  if (dayjs(date).isBefore(dayjs().subtract(7, 'days'))) {
    result = dayjs(date).format('YYYY-MM-DD')
  } else {
    // 1小时 xx小时前 x天前
    result = dayjs(date).locale('zh-cn').from(dayjs())
  }
  return result
}
