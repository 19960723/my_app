<template>
  <div>
    <my-tabs :active="1"></my-tabs>
  </div>
</template>

<script>
import VantTabs from '@/components/tabbar/vant'
export default {
  components: {
    'my-tabs': VantTabs
  }
}
</script>

<style lang="scss" scoped>

</style>
