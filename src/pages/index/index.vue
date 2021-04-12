<template>
  <div>
    <div class="fixed">
      <my-search></my-search>
      <my-nav></my-nav>
    </div>
    <my-content :offsetTop="offsetTop" :lists="lists" :isEnd="isEnd"></my-content>
    <my-tabs :active="0"></my-tabs>
    <img @click="addPost()" mode="widthFix" src="/static/images/add-post.png" class="addBtn" />
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import VantTabs from '@/components/tabbar/vant'
import SearchBar from '@/components/search/index'
import NavTab from '@/components/navTab/index'
import Content from '@/components/content/index'
import store from './store'
import { getList } from '@/api/content'
import { getSubIds } from '@/api/login'
import { checkAuth, confirmAuth } from '@/utils/checkAuth'
export default {
  data () {
    return {
      value: '',
      lists: [],
      page: 0,
      limit: 6,
      isRepeat: false,
      isEnd: false,
      isLogin: false
    }
  },
  components: {
    'my-tabs': VantTabs,
    'my-search': SearchBar,
    'my-nav': NavTab,
    'my-content': Content
  },
  computed: {
    offsetTop () {
      return store.state.contentOffset
    },
    catalog () {
      return store.state.catalog
    }
  },
  watch: {
    catalog (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.init()
        this._getList()
      }
    }
  },
  onLoad () {
    this.getSettings()
  },
  async onShow () {
    this._getList()
    this.isLogin = await checkAuth()
  },
  onPullDownRefresh () {
    this.init()
    this._getList()
  },
  onReachBottom () {
    this.page++
    this._getList()
  },
  methods: {
    init () {
      this.page = 0
      this.isEnd = false
      this.isRepeat = false
    },
    async getSettings () {
      // 1. 订阅内容通过getSettings返回
      // 2. 订阅列表接口中的tmplIds, 必须为用户未订阅的内容。如果为数组, 则显示列表订阅
      // 3. 可以通过openSetting打开用户的设置页面, 引导用户进行订阅设置
      // 4. 如果用户的订阅总开关是关闭的, 即mainSwitch为false, requestSubscribeMessage无法触发弹窗
      const result = await getSubIds()
      let arr = []
      if (result.code === 200) {
        arr = result.data
      }
      wx.getSetting({
        withSubscriptions: true,
        success (res) {
          const app = getApp()
          app.globalData.subscriptionsSetting = res.subscriptionsSetting

          // 获取用户已经订阅的消息
          const keys = res.subscriptionsSetting.itemSettings
          // 2. 获取服务订阅消息的模板Id -> restful -> array
          // 3. 对比服务器已有消息模块 -> globalData
          // 3.1 用户未开启订阅消息 -> return
          if (!res.subscriptionsSetting.mainSwitch) {
            return
          }
          if (!keys) {
            // 3.2 用户开启订阅消息 -> 未设置任何订阅消息
            app.globalData.tmplIds = arr
          } else {
            // 3.3 用户开启订阅消息 -> 已经有了部分设置 -> reject, accept
            const keysArr = Object.keys(keys)
            app.globalData.tmplIds = arr.filter(item => keysArr.indexOf(item) === -1)
          }
          // 4. 等待用户的订阅 -> requestSubscribeMessage
        },
        fail: () => {},
        complete: () => {}
      })
    },
    addPost () {
      if (!this.isLogin) {
        confirmAuth()
        // 判断用户是否已经登录, 登录之后给用户推订阅消息
        return ''
      }
      // 校验用户是否登录
      wx.navigateTo({
        url: '/pages/packageA/pages/newPost/main',
        success: (result) => {},
        fail: (err) => { console.log('addPost -> err', err) }
      })
    },
    _getList () {
      if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      getList({
        page: this.page,
        limit: this.limit,
        catalog: this.catalog
      }).then(res => {
        wx.stopPullDownRefresh()
        // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
        this.isRepeat = false
        if (res.code === 200) {
          // 判断res.data的长度，如果小于20条，则是最后页
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.page === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch(err => {
        wx.stopPullDownRefresh() // 下拉刷新完成
        this.isRepeat = false
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #fff;
}
.addBtn{
  width: 150px;
  height: 150px;
  position: fixed;
  bottom: 110px;
  right: 10px;
}
</style>
