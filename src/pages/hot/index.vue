<template>
  <div>
    hot
    <my-tabs :active="2"></my-tabs>
  </div>
</template>

<script>
import VantTabs from '@/components/tabbar/vant'
export default {
  name: 'tab',
  components: {
    'my-tabs': VantTabs
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
