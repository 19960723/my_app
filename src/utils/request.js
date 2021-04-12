import config from '@/config/index'
import {StoreToken} from './wxstore'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
let pending = {}
// 错误请求
export const errorHandle = res => {
  if (res.statusCode === 401) {
    wx.navigateTo({url: '/pages/auth'})
    return ''
  }
  // 日志处理 -> 全局错误提示
  wx.showToast({
    title: res.data && res.data.msg ? res.data.msg : '请求异常',
    icon: 'none',
    duration: 2000,
    mask: false,
    success: (result) => {

    },
    fail: () => {},
    complete: () => {}
  })
}
// 成功请求
export const isHttpSuccess = status => {
  return status >= 200 && status < 300
}

export const request = async (options = {}) => {
  // 考虑与微信的接口进行兼容
  const key = options.url + '&' + (options.method || 'GET')
  // 调整执行位置
  if (pending[key]) {
    pending[key].abort() // 中断请求任务
  }
  // 接口白名单
  let isPublic = false
  let header = {}
  config.publicPath.map(path => {
    isPublic = isPublic || path.test(options.url)
  })
  // 注意处理 token 为空的情况
  const token = await StoreToken.get()
  if (!isPublic && token) {
    header = Object.assign({
      Authorization: 'Bearer ' + token
    }, options.header)
  }
  // 请求路径完整
  options.url = baseUrl + options.url
  const result = new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中'
    })
    pending[key] = wx.request(
      Object.assign({}, options, {
        header,
        success: (res) => {
          // 避免重复请求
          delete pending[key]
          // 请求成功 http status 状态码判断
          if (isHttpSuccess(res.statusCode)) {
            resolve(res.data)
          } else {
            errorHandle(res)
            reject(res)
          }
        },
        fail: (err) => {
          delete pending[key]
          errorHandle(err)
          reject(err)
        },
        complete: () => { wx.hideLoading() }
      })
    )
  })
  return result
}

export const axios = {
  get (url, data, options = {}) {
    return request({
      url,
      data,
      method: 'GET',
      ...options
    })
  },
  post (url, data, options = {}) {
    return request({
      url,
      data,
      method: 'POST',
      ...options
    })
  }
}
