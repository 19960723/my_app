import { uploadImg } from '@/utils/upload';
<template>
  <div class="container">
    <van-field placeholder="请输入帖子标题" clearable :value="title" border="true"></van-field>
    <van-field placeholder="请输入帖子内容" type="textarea" :value="content" class="edit-content" ></van-field>
    <div class="upload-img">
      <van-uploader :file-list="fileList" @afterRead="afterRead" @delete="deleteImg"></van-uploader>
    </div>
    <picker @change="changePostType" :value="block[blockIndex]" :range="block" class="picker">
      <van-field disabled input-align="right" label="发帖类型" placeholder="请选择"  :value="block[blockIndex]" ></van-field>
    </picker>
    <picker @change="changeFavs" :value="favs[favsIndex]" :range="favs" class="picker">
      <van-field disabled input-align="right" label="奖励积分" placeholder="请选择"  :value="favs[favsIndex]" ></van-field>
    </picker>
    <div class="btn-wrap">
      <van-button size="large" type="primary" @click="submit()">发布</van-button>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/utils/upload'
export default {
  data () {
    return {
      block: ['请选择', '提问', '分享', '讨论', '建议'],
      blockIndex: 0,
      favs: [20, 30, 50, 60, 80],
      favsIndex: '',
      fileList: []
    }
  },
  methods: {
    changePostType (e) {
      this.blockIndex = e.target.value
    },
    changeFavs (e) {
      this.favsIndex = e.target.value
    },
    submit () {},
    afterRead (e) {
      const file = e.mp.detail.file
      uploadImg(file).then(res => {
        if (res.code === 200) {
          this.fileList.push(file)
          wx.showToast({
            title: '上传成功',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '上传失败, 原因: ' + res.errmsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    deleteImg (e) {
      this.fileList.splice(e.mp.detail.index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-img{
  padding: 30px;
}
.edit-content{
  --field-text-area-min-height: 350px;

}
.label-class{
  --field-label-color: #ccc;
}
</style>
