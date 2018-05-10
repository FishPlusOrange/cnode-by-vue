<template>
  <div class="topic-tab">
    <ul>
      <li v-for="(type, key) of types" @click="switchTab(key)" :class="{active: activeTab === key}"><router-link to="/">{{ type }}</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'topicTab',
  data() {
    return {}
  },
  computed: {
    types() {
      return this.$store.state.types;
    },
    activeTab() {
      return this.$store.state.activeTab;
    }
  },
  methods: {
    // 切换标签页
    switchTab(type, page = 1) {
      this.$indicator.open({
        spinnerType: 'double-bounce'
      });
      this.$store.commit('switchTab', {activeTab: type, page: 1, topics: []});
      this.$axios.get(`https://cnodejs.org/api/v1/topics?page=${page}&tab=${this.activeTab}`)
        .then(response => {
          this.$indicator.close();
          this.$store.commit('getTopics', {topics: response.data.data});
        })
        .catch(error => {
          this.$indicator.close();
          if(error.response) {
            this.$toast(error.response.data.error_msg);
          }else {
            this.$toast('请求失败 ' + error);
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-tab {
  background: $primary-color;
  height: 35px;
  ul {
    height: 100%;
    display: flex;
    li {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &::after {
        content: "";
        width: 100%;
        height: 3px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #f56c6c;
        transform: scaleX(0);
      }
      &.active {
        font-weight: 600;
        &::after {
          transform: scaleX(1);
          transition: .3s ease-in-out;
        }
      }
      a {
        color: #fff;
      }
    }
  }
}
</style>
