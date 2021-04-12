<template>
  <van-tabbar :active="active" @change="onChange" active-color="#07c160" inactive-color="#ccc" class="tabsbar">
    <van-tabbar-item class="item" >
      <van-icon name="home" size="28" class-prefix="iconfont"></van-icon>
      <p>首页</p>
    </van-tabbar-item>
    <van-tabbar-item class="item" small>
      <van-icon name="msg" size="22" class-prefix="iconfont"></van-icon>
      <p>消息</p>
    </van-tabbar-item>
    <van-tabbar-item class="item" small>
      <van-icon name="faved" size="22" class-prefix="iconfont"></van-icon>
      <p>热门</p>
    </van-tabbar-item>
    <van-tabbar-item class="item" >
      <van-icon name="person" size="28" class-prefix="iconfont"></van-icon>
      <p>我的</p>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    props: ['active'],
    data () {
      return {
        list: ['/pages/index/main', '/pages/msg/main', '/pages/hot/main', '/pages/center/main']
      }
    },
    methods: {
      onChange (e) {
        const index = e.mp.detail
        wx.switchTab({
          url: this.list[index]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.tabsbar{
  position: relative;
  z-index: 100;
}
.item{
  text-align: center;
}
</style>
