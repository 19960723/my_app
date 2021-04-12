import {axios} from '@/utils/request'
import {StoreToken} from '@/utils/wxstore'
// 获取文章中的评论列表
export const getComments = async (params) => {
  let token
  try {
    token = await StoreToken.get()
  } catch (e) {
    throw e
  }
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }
  return axios.get('/public/comments', params, headers)
}
