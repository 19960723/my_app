<template>
  <div class="comments">
    <div class="title">评论</div>
    <ul class="comments-lists">
      <li class="item" v-for="(item, index) in finalList" :key="index">
        <div class="detail-info-head">
          <div class="user">
            <div class="avatar"><img :src="item.avatar" alt=""></div>
            <div class="cont">
              <p class="name">{{item.cuid && item.cuid.username ? item.cuid.username : '未设置昵称'}}</p>
              <p class="time">{{item.created}} 评论了帖子</p>
            </div>
          </div>
          <div class="hands" @click="hand(item)">
            <van-icon name="zan" size="16" class-prefix="iconfont" :color="item.handed === '1' ? '#02d199' : ''"></van-icon>
            <span :style="{'color': item.handed === '1' ? '#02d199' : ''}">{{item.hands}}</span>
          </div>
        </div>
        <mp-html :content="item.content"></mp-html>
      </li>
    </ul>
    <div class="info" v-if="comments.length === 0">暂无评论，赶紧来抢沙发吧~~~</div>
    <div class="info" v-if="isEnd && comments.length !== 0">没有更多了~~~</div>
  </div>
</template>

<script>
import { fromNow } from '@/utils/moment'
import { formtImg } from '@/utils'
import formatHtml from '@/utils/formatHtml'
export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  onShow () {
    // console.log(this.comments)
  },
  computed: {
    finalList () {
      return this.comments.map(item => {
        item.created = fromNow(item.created)
        item.content = formatHtml(item.content)
        if (item.cuid && item.cuid.avatar) {
          item.avatar = formtImg(item.cuid.avatar)
        } else {
          item.avatar = '/static/images/header.jpg'
        }
        return item
      })
    }
  },
  methods: {
    hand (item) {
      this.$emit('hand', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.comments{
  padding: 20px 30px 100px 30px;
  background: #fff;
  position: relative;
  z-index: 0;
  .title{
    font-weight: bold;
    padding-bottom: 30px;
  }
  .comments-lists{
    .item{
      padding:  10px 0 28px 0;
      color: #333;
      .detail-info-head{
        background-color: #fff;
        font-size: 25px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user{
          display: flex;
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
              font-size: 22px;
              color: #999;
            }
          }
        }
        .hands{
          font-size: 28px;
          padding-right: 12px;
          color: #999;
        }
      }
    }
  }
  .info{
    color: #999;
    font-size: 24px;
    text-align: center;
    padding: 30px;
  }
}
</style>
