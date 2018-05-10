<template>
  <mt-header class="main-header" title="CNode">
    <mt-button icon="back" slot="left" v-show="isShowBack" @click="$router.go(-1)">返回</mt-button>
    <mt-button icon="more" slot="right" @click="showSideBar"></mt-button>
  </mt-header>
</template>

<script>
export default {
  name: 'mainHeader',
  data() {
    return {}
  },
  computed: {
    isShowBack() {
      return this.$store.state.isShowBack;
    }
  },
  methods: {
    // 显示左侧操作面板
    showSideBar() {
      this.$store.commit('toggleSideBar', {isShowSideBar: true});
    }
  }
}
</script>

<style lang="scss" scoped></style>
