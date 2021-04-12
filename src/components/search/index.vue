<template>
  <div class="search" :style="{'padding-top': barHeight + 'px'}">
    <van-search :value="value" shape="round" placeholder="请输入搜索关键词" />
  </div>
</template>

<script>
import store from '@/pages/index/store'
export default {
  name: 'searchCom',
  data () {
    return {
      value: '',
      barHeight: 0
    }
  },
  onLoad () {
    this.getNavBarHeight()
  },
  methods: {
    getNavBarHeight () {
      wx.getSystemInfo({
        success: e => {
          // let statusBarHeight = e.statusBarHeight
          let info = wx.getMenuButtonBoundingClientRect()
          let CustomBar = info.bottom + info.top - e.statusBarHeight + 50
          // console.log(info)
          this.barHeight = info.top
          // console.log(CustomBar)
          // 储存至store中
          store.commit('setContentOffset', CustomBar)
        },
        fail: () => {},
        complete: () => {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: 70%;
  --search-padding: 0;
  padding-left: 25px;
  padding-bottom: 8px;
  // padding-left: 25px;
  @media (max-width: 320px) {
    width: 60%;
  }
}
</style>
