<template>
  <mt-header class="main-header" title="CNode">
    <mt-button icon="back" slot="left" v-show="isShowBack" @click="$router.go(-1)">返回</mt-button>
    <mt-button icon="more" slot="right" @click="showSideBar"></mt-button>
  </mt-header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MainHeader',
  computed: {
    ...mapState([
      'isShowBack'
    ])
  },
  methods: {
    ...mapMutations([
      'toggleSideBar'
    ]),
    // 显示左侧操作面板
    showSideBar() {
      this.toggleSideBar({isShowSideBar: true});
    }
  }
}
</script>

<style lang="scss" scoped></style>
