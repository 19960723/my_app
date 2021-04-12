<template>
  <!-- List -->
  <ul class="container" :style="{'padding-top': offsetTop + 'px'}">
    <li class="list-box" v-if="finalList.length > 0" v-for="(item, index) in finalList" :key="index" @click="showDetail(item._id)">
      <div class="list-head">
        <div class="title">
          <span class="type" :class="'type-' + item.catalog" v-if="item.catalog === 'ask'">提问</span>
          <span class="type" :class="'type-' + item.catalog" v-else-if="item.catalog === 'advise'">建议</span>
          <span class="type" :class="'type-' + item.catalog" v-else-if="item.catalog === 'discuss'">交流</span>
          <span class="type" :class="'type-' + item.catalog" v-else-if="item.catalog === 'share'">分享</span>
          <span class="type" :class="'type-' + item.catalog" v-else-if="item.catalog === 'logs'">动态</span>
          <span class="type" :class="'type-' + item.catalog" v-else-if="item.catalog === 'notice'">公告</span>
          <span class="ellipsis">{{item.title}}</span>
        </div>
      </div>
      <div class="author">
        <div style="display: inline-block">
          <img class="head" :src="item.avatar" alt="">
          <span class="name">{{item.uid.username || '未知用户'}}</span>
          <i class="vip" v-show="item.uid.isVip !== '0'">VIP{{item.uid.isVip}}</i>
        </div>
      </div>
      <div class="list-body">
        <div class="info">{{item.content}}</div>
        <!-- <img v-show="item.snapshot" :src="item.snapshot" alt="" class="fmt"> -->
      </div>
      <div class="list-footer">
        <div class="left">
          <span class="reply-num">{{item.answer}}回复</span>
          <span class="timer">{{item.created}}</span>
        </div>
      </div>
    </li>
    <li v-if="finalList.length === 0">
      <van-empty description="暂无数据" />
    </li>
    <li v-if="isEnd" class="nomore">没有更多了</li>
  </ul>
</template>

<script>
import { fromNow } from '@/utils/moment'
import { formtImg } from '@/utils'
export default {
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    lists: {
      type: Array,
      default: () => []
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    finalList () {
      return this.lists.map(item => {
        item.created = fromNow(item.created)
        if (item.uid && item.uid.avatar) {
          // 网络图片 -> http 服务器图片 -> img
          item.avatar = formtImg(item.uid.avatar)
        }
        return item
      })
    }
  },
  methods: {
    showDetail (id) {
      wx.navigateTo({
        url: '/pages/packageA/pages/detail/main?id=' + id,
        success: (result) => {},
        fail: (err) => { console.log('addPost -> err', err) }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  background: #f5f6f7;
  padding-bottom: 100px;
  .nomore{
    text-align: center;
    padding: 15px 0 25px 0;
    color: #999;
    font-size: 24px;
  }
  li{
    list-style: none;
    &.list-box{
      background: #FFF;
      padding: 30px;
      margin-bottom: 20px;
      .list-head{
        margin-bottom: 18px;
        .title{
          color: #333;
          font-size: 32px;
          line-height: 44px;
          font-weight: bold;
          display: flex;
          flex-flow: row nowrap;
          align-item: center;
          .type{
            display: inline-block;
            height: 36px;
            width: 72px;
            text-align: center;
            line-height: 36px;
            white-space: nowrap;
            margin-right: 10px;
            font-size: 24px;
            border-radius: 18px;
            border-bottom-left-radius: 0;
            color: #fff;
            position: relative;
            top: 4px;
            align-self: flex-start;
            transform: scale(0.9);
            min-width: 40px;
            background-color: #feb21e;
            &.type-ask{
              background-color: #02d199;
            }
            &.type-advise{
              background-color: #0166f8;
            }
            &.type-discuss{
              background-color: #fe1e1e;
            }
            &.type-share{
              background-color: #feb21e;
            }
            &.type-logs{}
            &.type-notice{}
          }
          .ellipsis{
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
      .author{
        display: flex;
        align-item: center;
        font-size: 24px;
        margin-right: 30px;
        margin-bottom: 18px;
        color: #666;
        .head{
          width: 40px;
          height: 40px;
          border-radius: 100%;
          margin-right: 10px;
          vertical-align: middle;
          position: relative;
          top: -4px;
        }
      }
      .list-body{
        display: flex;
        margin-bottom: 30px;
        .info{
          font-size: 28px;
          color: #666;
          max-height: 94px;
          flex: 1;
          margin-right: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .fmt{
          width: 192px;
          height: 122px;
          border-radius: 8px;
        }
      }
      .list-footer{
        color: #999;
        font-size: 24px;
        display: flex;
        align-item: center;
        .left{
          flex: 1;
          display: flex;
          align-item: center;
          .svg-icon{
            margin-right: 5px;
          }
          .timer{
            margin-left: 20px;
          }
        }
      }
    }
  }
}
</style>
