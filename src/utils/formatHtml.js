import faces from '@/assets/js/face'
import { formtImg } from '@/utils'

const formatHtml = (val = '') => {
  if (!val) return
  let result = val
  // 替换表情
  const face = /\sface\[\W{1,}]/g
  if (face.test(result)) {
    const group = result.match(face)
    group.map(item => {
      const key = item.match(/\[\S+\]/g)[0]
      result = result.replace(item, `<img style="width: 22px; height: 22px;" src="${faces[key]}" />`)
    })
  }

  // 替换图片
  const img = /img\[\S+\]/g
  if (img.test(result)) {
    const group = result.match(img)
    group.map(item => {
      let url = formtImg(item.substr(4, item.length - 5))
      result = result.replace(item, `<img src="${url}" />`)
    })
  }

  // 替换链接 a(链接)[标题]
  const link = /\sa\(\S+\]/g
  if (link.test(result)) {
    const group = result.match(link)
    const title = /\((.+)\)/
    const linkName = /\[(.+)\]/
    group.map(item => {
      const nameGroup = item.match(linkName)
      let name = ''
      if (nameGroup.length > 0) {
        name = nameGroup[1]
      }
      const linkGroup = item.match(title)
      let link = ''
      if (linkGroup.length > 0) {
        link = linkGroup[1]
      }
      result = result.replace(item, `<a href="${link}">${name}</a>`)
    })
  }

  // 引用替换
  result = result.replace(/\[quote\]/g, '<blockquote>')
  result = result.replace(/\[\/quote\]/g, '</blockquote>')

  // 代码块替换
  const code = /(\[\/?pre(.+?)[^\]]*\])|\[[^\]]*\]/g
  if (code.test(result)) {
    result = result.replace(/\[pre\]/g, '<pre><code class="language-css">')
    result = result.replace(/\[\/pre\]/g, '</code></pre>')
  }

  // hr 替换
  result = result.replace(/\[hr\]/g, '<hr>')

  // 回车换行的替换
  // result = result.replace(/\r\n/g, '<br>')
  // result = result.replace(/\n/g, '<br>')
  return result
}
export default formatHtml
