<template>
  <div>
    <div class="grey">
      <div class="bg"></div>
      <div class="wrapper">
        <div class="profile">
          <div class="info">
            <img class="avatar" :src="isLogin ? user.avatar : '/static/images/header.jpg'" />
            <div class="user">
              <p class="name">{{isLogin ? user.username : '请登录'}}</p>
              <p class="fav">
                <van-icon name="fav2" class-prefix="iconfont" size="14"></van-icon>
                积分: {{user && user.favs ? user.favs : 0}}
              </p>
            </div>
            <navigator class="link">个人主页 ></navigator>
          </div>
          <ul class="stats">
            <li class="item">
              <navigator>
                <p>{{countMyPost}}</p>
                <p class="title">我的帖子</p>
              </navigator>
            </li>
            <li class="item">
              <navigator>
                <p>{{countMyCollect}}</p>
                <p class="title">收藏夹</p>
              </navigator>
            </li>
            <li class="item">
              <navigator>
                <p>{{countMyHistory}}</p>
                <p class="title">最近浏览</p>
              </navigator>
            </li>
          </ul>
        </div>
      </div>
      <div class="center-wrapper">
        <ul class="center-list first">
          <li v-for="(item, index) in lists" :key="index" @click="goTo(item.routeName)">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </li>
        </ul>
        <ul class="center-list">
          <li v-for="(item, index) in routes" :key="index" @click="navTo(item)">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <my-tabs :active="3">

    </my-tabs>
  </div>
</template>

<script>
import VantTabs from '@/components/tabbar/vant'
import { checkAuth } from '@/utils/checkAuth'
import { StoreUser } from '@/utils/wxstore'
import store from '@/pages/index/store'
export default {
  data () {
    return {
      user: {},
      isLogin: false,
      countMyPost: 0,
      countMyCollect: 0,
      countMyHistory: 0,
      lists: [
        {
          name: '我的帖子',
          icon: 'icon-teizi',
          routeName: 'mypost'
        },
        {
          name: '修改设置',
          icon: 'icon-setting',
          routeName: 'settings'
        },
        {
          name: '修改密码',
          icon: 'icon-lock2',
          routeName: 'passwd'
        },
        {
          name: '签到中心',
          icon: 'icon-qiandao',
          routeName: 'sign'
        },
        {
          name: '购买记录',
          icon: 'icon-qiandao',
          routeName: '404'
        },
        {
          name: '赞助商',
          icon: 'icon-jiangbei',
          routeName: '404'
        }
      ],
      routes: [
        {
          name: '提问',
          icon: 'icon-question',
          tab: 'ask'
        },
        {
          name: '分享',
          icon: 'icon-share',
          tab: 'share'
        },
        {
          name: '讨论',
          icon: 'icon-taolun',
          tab: 'discuss'
        },
        {
          name: '建议',
          icon: 'icon-advise',
          tab: 'advise'
        }
      ]
    }
  },
  components: {
    'my-tabs': VantTabs
  },
  async onShow () {
    this.isLogin = await checkAuth()
    const user = await StoreUser.get()
    if (user) {
      this.user = user
    }
  },
  methods: {
    goTo (url) {},
    navTo (item) {
      store.commit('setCatalog', item.tab)
      wx.switchTab({
        url: '/pages/index/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.grey{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 30;
  .bg{
    width: 100%;
    height: 280px;
    position: relative;
    left: 0;
    top: 0;
    z-index: 100;
    // background-image: url('http://');
    background-color: #02d199;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 0 0;
  }
  .wrapper{
    width: 100%;
    height: 370px;
    padding: 25px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    box-sizing: border-box;
    color: #333;
    .profile{
      width: 100%;
      height: 100%;
      padding: 30px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      .info{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        .avatar{
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
        .user{
          flex: 1;
          padding-left: 20px;
          .name{
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 10px;
            margin-top: 0;
          }
          .fav{
            display: inline-block;
            padding: 8px 12px;
            background: rgba(2, 209, 153, 0.16);
            border-radius: 12px;
            color: #02d199;
            margin: 0;
            font-size: 22px;
          }
        }
        .link{
          font-size: 24px;
          color: #999;
        }
      }
      .stats{
        display: flex;
        flex-flow: row nowrap;
        // justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        justify-content: space-around;
        .item{
          text-align: center;
          position: relative;
          &::after{
            content: '';
            width: 2px;
            height: 80px;
            background: #ddd;
            position: absolute;
            right: -60px;
            top: 20px;
          }
          &:last-child{
            &::after{
              width: 0;
            }
          }
          p{
            margin-top: 14px;
            margin-bottom: 0;
          }
          .title{
            color: #666;
          }
        }
      }
    }
  }
  .center-wrapper{
    width: 100%;
    z-index: 10;
    position: absolute;
    top: 370px;
    left: 0;
    background: #f6f5f8;
    .center-list{
      background: #fff;
      margin-bottom: 30px;
      display: flex;
      flex-flow: wrap;
      padding-top: 40px;
      li{
        width: 25%;
        text-align: center;
        color: #666;
        margin-bottom: 40px;
        font-size: 26px;
        i{
          display: block;
          margin: 0 auto;
          font-size: 40px;
          width: 56px;
          height: 56px;
          margin-bottom: 20px;
          color: #888;
          background-size: contain;
        }
      }
    }
    .first{


    }
  }
}
</style>
