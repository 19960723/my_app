import {axios} from '@/utils/request'
import {StoreToken} from '@/utils/wxstore'
/**
 *  读取文章列表
 * @param {*} options  读取文章列表接口参数
 */
export const getList = options => axios.get('/public/list', options)

/**
 * 获取文章详情
 * @param {*} id 文章id
 */
export const getDetail = async (id) => {
  const token = await StoreToken.get()
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }
  return axios.get('/public/content/detail', {tid: id}, headers)
}
