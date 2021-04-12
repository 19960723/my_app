<template>
  <van-tabs class="custom-tab" :active="active" @change="onChange">
    <van-tab v-for="(item, index) in tabList" :key="index" :title="item.name" ></van-tab>
  </van-tabs>
</template>

<script>
import store from '@/pages/index/store'
export default {
  name: 'tabs',
  data () {
    return {
      active: 0,
      tabList: [
        {
          key: '',
          name: '首页'
        },
        {
          key: 'ask',
          name: '提问'
        },
        {
          key: 'advise',
          name: '建议'
        },
        {
          key: 'share',
          name: '分享'
        },
        {
          key: 'discuss',
          name: '讨论'
        }
      ]
    }
  },
  computed: {
    catalog () {
      return store.state.catalog
    }
  },
  watch: {
    catalog (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.tabList.map((item, index) => {
          if (item.key === newVal) {
            this.active = index
          }
        })
      }
    }
  },
  methods: {
    onChange (e) {
      this.active = e.mp.detail.index
      store.commit('setCatalog', this.tabList[this.active].key)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tab {
  --tabs-default-color: #02d199;
  --tabs-bottom-bar-color: #02d199;
  --tab-active-text-color: #02d199;
  --tab-text-color: #666666;
}
</style>
