<template>
  <div class="main-content">
    <TopicTab></TopicTab>
    <router-view/>
  </div>
</template>

<script>
import TopicTab from './TopicTab'
export default {
  name: 'mainContent',
  data() {
    return {}
  },
  components: {
    TopicTab
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>