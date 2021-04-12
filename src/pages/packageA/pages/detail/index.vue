<template>
  <div>
    <div class="wrapper">
      <div class="detail-head">{{postDetail.title}}</div>
      <div class="detail-info">
        <div class="detail-info-head">
          <div class="avatar">
            <img :src="postDetail.avatar" alt="">
          </div>
          <div class="cont">
            <p class="name">
              {{postDetail.uid && postDetail.uid.username ? postDetail.uid.username : '未设置用户昵称'}}
            </p>
            <p class="time">{{postDetail.created}}</p>
          </div>
          <div class="subscribe">
            <van-button @click="subscribe()" size="small" class="sub">订阅</van-button>
          </div>
        </div>
        <div class="detail-info-body">
          <mp-html :content="postDetail.content"></mp-html>
        </div>
        <div class="detail-info-foot">{{postDetail.reads}} 阅读</div>
      </div>
      <my-comments @han="handleHand" :comments="comments" :isEnd="isEnd"></my-comments>
    </div>
    <div class="detail-bottom" :class="{fixed: isFocus || faceStatus, on: faceStatus}">
      <div class="bottom-input-wrap">
        <van-icon name="advice" class-prefix="iconfont" size="17"></van-icon>
        <div class="input">
          <input type="text" @confirm="focus()" placeholder="写评论...">
        </div>
        <div @click="showFace()">
          <van-icon name="smile" class-prefix="iconfont" size="17"></van-icon>
        </div>
      </div>
      <ul class="bottom-right">
        <li :class="{row: !showText}">
          <van-icon name="bianji" class-prefix="iconfont" size="14"></van-icon>
          <p>
            <span v-show="showText">评论</span>
            {{postDetail.answer}}
          </p>
        </li>
        <li :class="{row: !showText}" @click="setFav()">
          <van-icon name="shoucang" class-prefix="iconfont" size="16"></van-icon>
          <p>
            <span v-show="showText">{{postDetail.isFav ? '取消收藏' : '收藏'}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="detail-face" :class="{on: faceStatus}">
      <scroll-view scroll-y>
        <div class="detail-face-item" v-for="(value, key) in faces" :key="key">
          <img :src="value"  mode="widthFix" />
        </div>
      </scroll-view>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import { getDetail } from '@/api/content'
import { getComments } from '@/api/comments'
import { fromNow } from '@/utils/moment'
import { formtImg } from '@/utils'
import formatHtml from '@/utils/formatHtml'
import faces from '@/assets/js/face'
import { confirmAuth, checkAuth } from '@/utils/checkAuth'
// import wxParse from 'mpvue-wxparse'
import Comments from './comments'
export default {
  data () {
    return {
      postDetail: {},
      isFocus: false,
      faceStatus: false,
      showText: true,
      faces: faces,
      comments: [],
      isEnd: false,
      page: 0,
      limit: 10,
      isLogin: false
    }
  },
  components: {
    // 'my-wxparse': wxParse
    'my-comments': Comments
  },
  async onLoad () {
    Object.assign(this.$data, this.$options.data())
    this._getDetail()
    this._getComments()
  },
  async onShow () {
    this.isLogin = await checkAuth()
  },
  methods: {
    showFace () {
      this.faceStatus = !this.faceStatus
    },
    focus () {
      // 当用户准备发送评论
      this.confirmLogin()
    },
    handleHand (item) {
      // 给该条评论点赞
      this.confirmLogin()
      this.subscribe()
    },
    setFav () {
      // 设置收藏
      this.confirmLogin()
      this.subscribe()
    },
    confirmLogin () {
      if (!this.isLogin) {
        confirmAuth()
      }
    },
    subscribe () {
      // 订阅
      if (!this.isLogin) {
        confirmAuth()
        // 判断用户是否已经登录, 登录之后给用户推订阅消息
        return ''
      }
      const arr = [
        'UaXYegaiPl-59XfaLeTqLMXecFybtZqVU2PuFBk7xow'
      ]
      var tmplIds = getApp().globalData.tmplIds.filter((item) => arr.indexOf(item) !== -1)
      wx.requestSubscribeMessage({
        tmplIds: tmplIds,
        success (res) {
          if (res) {
            getApp().globalData.tmplIds = getApp().globalData.tmplIds.filter(item => {
              // 过滤掉已经订阅了的ids, 保存未订阅未设置的ID
              return Object.keys(res).indexOf(item) === -1
            })
          }
        }
      })
    },
    _getDetail () {
      getDetail(this.$mp.query.id).then(res => {
        if (res.code === 200) {
          this.postDetail = res.data
          if (res.data.uid && res.data.uid.avatar) {
            this.postDetail.avatar = formtImg(res.data.uid.avatar)
          } else {
            this.postDetail.avatar = '/static/images/header.jpg'
          }
          this.postDetail.content = formatHtml(res.data.content)
          this.postDetail.created = fromNow(res.data.created)
        }
      })
    },
    _getComments () {
      if (this.isEnd) return
      getComments({
        tid: this.$mp.query.id,
        page: this.page,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          if (res.data.length < this.limit) {
            // 最后一页了
            this.isEnd = true
          }
          if (this.comments.length === 0) {
            this.comments = res.data
          } else {
            this.comments = this.comments.concat(res.data)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  background-color: #f6f6f6;
  .detail-head{
    font-size: 36px;
    color: #333;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.1);
    background-color:#fff;
    margin-bottom: 20px;
    padding: 0 30px 20px 30px;
    z-index: 10;
    position: relative;
  }
  .detail-info{
    background-color: #fff;
    padding:  20px 30px 20px 30px;
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);
    .detail-info-head{
      background-color: #fff;
      display: flex;
      align-items: center;
      font-size: 24px;
      padding-bottom: 20px;
      .avatar{
        margin-right: 20px;
        img{
          width: 72px;
          height: 72px;
          border-radius: 100%;
        }
      }
      .cont{
        flex: 1;
        .name{
          font-size: 26px;
          color: #333;
          margin-bottom: 10px;
        }
        .time{
          color: #999;
          font-size: 22px;
        }
      }
      .subscribe{
        .sub{
          --button-border-radius: 6px;
          --button-default-color: #fff;
          --button-default-background-color: #02d199;
        }
      }
    }
    .detail-info-body{}
    .detail-info-foot{
      color: #ccc;
      font-size: 26px;
    }
  }
}
.detail-bottom{
  height: 100px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  // iOS 11的场景
  padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
  z-index: 10;
  border-top: 1px solid #f6f6f6;
  background-color: #fff;
  box-shadow: 0 -4px 10px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.5s;
  &.fixed{
    padding-bottom: 0;
  }
  &.on{
    transform: translateY(-600px);
  }
  .bottom-input-wrap{
    width: 200px;
    height: 64px;
    color: #ccc;
    font-size: 28px;
    padding: 0 20px;
    margin: 0 20px;
    background-color: #f3f3f3;
    flex:  1;
    display: flex;
    align-items: center;
    border-radius: 50px;
    .input{
      margin-right: 20px;
      flex: 1;
      input{
        border: 0;
        background-color: transparent;
        outline: 0;
      }
    }
  }
  .bottom-right{
    display: flex;
    // margin-right: 20px;
    font-size: 26px;
    li{
      flex: 1;
      padding: 0 10px;
      text-align: center;
      white-space: nowrap;
      color: #999;
      &.row{
        flex-flow: row nowrap;
        display: flex;
        align-items: center;
        p{
          margin-left: 8px;
        }
      }
    }
  }
}
.detail-face{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 600px;
  background: #fff;
  transform: translateY(600px);
  z-index: 10;
  transition: all 0.5s;
  visibility: hidden;
  overflow-y: scroll;
  border-bottom: 1px solid #dcdcdc;
  &.on{
    transform: translateY(0);
    visibility: visible;
  }
  .detail-face-item{
    float: left;
    width: 12.5%;
    text-align: center;
    padding: 12px 0;
    img{
      width: 54px;
    }
  }
}
</style>
