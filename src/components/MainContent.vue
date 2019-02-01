<template>
  <div class="main-content">
    <topic-tab/>
    <router-view/>
  </div>
</template>

<script>
import TopicTab from './TopicTab'
export default {
  name: 'MainContent',
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