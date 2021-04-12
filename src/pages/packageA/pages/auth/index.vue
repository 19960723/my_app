<template>
  <div class="flex">
    <div class="logo">
      <img :src="logoFil" mode="widthFix" alt="">
    </div>
    <van-button class="btn" type="primary" size="large" open-type="getUserInfo" @getuserinfo="_wxLogin">
      <div class="row">
        <div class="icon">
          <van-icon name="weixin" size="22" class-prefix="iconfont"></van-icon>
        </div>
        <div>微信登录</div>
      </div>
    </van-button>
  </div>
</template>

<script>
import {wxLogin} from '@/api/login'
import { StoreToken, StoreUser } from '@/utils/wxstore'
import { formtImg } from '@/utils'
export default {
  name: 'auth',
  data () {
    return {
      code: ''
    }
  },
  onLoad () {
    this.getWxCode()
  },
  computed: {
    logoFil () {
      let logo = '/static/logo.jpg'
      return formtImg(logo)
    }
  },
  methods: {
    async _wxLogin (e) {
      const user = e.mp.detail
      const result = await wxLogin({code: this.code, user: user})
      if (result.code === 200) {
        await StoreToken.set(result.token)
        await StoreUser.set(result.data)
        wx.navigateBack()
      }
    },
    async getWxCode () {
      const result = await wx.login()
      if (result.code) {
        this.code = result.code
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.flex{
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  width: 100vw;
  height:100vh;
  top: 120px;
  left: 0;
  .logo{
    width: 240px;
    height: 240px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 100px;
    img{
      width: 100%;
    }
  }
  .btn{
    width: 90%;
    overflow: hidden;
    border-radius: 12px;
    color: #02d199;
    .row{
      flex-flow: row nowrap;
      display: flex;
      .icon{
        margin-right: 20px;
      }
    }
  }
}
</style>
