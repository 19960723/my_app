import config from '@/config'
import {StoreToken} from '@/utils/wxstore'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const uploadImg = async (file) => {
  try {
    const token = await StoreToken.get()
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: baseUrl + '/content/wxUpload', // 仅为示例，非真实的接口地址
        // url: baseUrl + '/public/test1',
        filePath: file.url,
        name: 'file',
        formData: { file },
        header: { 'Authorization': 'Bearer ' + token },
        success (res) {
          if (res.statusCode === 200) {
            resolve(JSON.parse(res.data))
          }
        },
        fail (err) {
          reject(err)
        }
      })
    })
    // if (upTask.statusCode === 200) {
    //   return JSON.parse(upTask.data)
    // }
  } catch (error) {
    console.log('UploadImg -> error', error)
  }
}
