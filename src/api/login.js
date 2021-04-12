import {axios} from '@/utils/request'

/**
 * 微信登录
 * @param {*} options
 */
export const wxLogin = options => {
  return axios.post('/login/wxLogin', options)
}
/**
 * wx 获取订阅模板消息id
 */
export const getSubIds = () => axios.get('/public/getSubIds')
