<template>
  <div class="topic-list" ref="topicList" v-infinite-scroll="getMoreTopics" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" @scroll="showGoTop($event)">
    <ul>
      <transition-group name="fade">
        <li v-for="(topic, index) of topics" :key="index">
          <div class="avatar">
            <img :src="topic.author.avatar_url">
          </div>
          <div class="detail">
            <div class="title-block">
              <span class="tag" :class="topic.top ? 'top' : (topic.good ? 'good' : '')">{{ (topic.top ? '置顶' : '') || (topic.good ? '精华' : '') || types[topic.tab] }}</span>
              <router-link class="title" :to="{name: 'topicContent', params: {id: topic.id}}">{{ topic.title }}</router-link>
            </div>
            <div class="info-block">
              <span class="count">{{ topic.reply_count + '/' + topic.visit_count }}</span>
              <span class="date">{{ topic.last_reply_at | dateFormat }}</span>
            </div>
          </div>
        </li>
      </transition-group>
    </ul>
    <div class="spinner" v-show="isShowSpinner">
      <mt-spinner type="triple-bounce" color="#409eff" :size="40"></mt-spinner>
    </div>
    <div class="go-top" v-if="isShowGoTop" @click="goTop()">返回顶部</div>
  </div>
</template>

<script>
export default {
  name: 'topicList',
  data() {
    return {
      isShowSpinner: false,
      isShowGoTop: false
    }
  },
  created() {
    this.getTopics();
  },
  computed: {
    types() {
      return this.$store.state.types;
    },
    activeTab() {
      return this.$store.state.activeTab;
    },
    page() {
      return this.$store.state.page;
    },
    topics() {
      return this.$store.state.topics;
    }
  },
  methods: {
    // 获取主题
    getTopics() {
      this.$indicator.open({
        spinnerType: 'double-bounce'
      });
      this.$store.commit('toggleBack', {isShowBack: false}); // 隐藏返回按钮
      this.$axios.get(`https://cnodejs.org/api/v1/topics?tab=${this.activeTab}`)
        .then(response => {
          this.$store.commit('getTopics', {topics: response.data.data});
          this.$indicator.close();
        })
        .catch(error => {
          if(error.response) {
            this.$toast(error.response.data.error_msg);
          }else {
            this.$toast('请求失败 ' + error);
          }
          this.$indicator.close();
        });
    },
    // 获取更多主题
    getMoreTopics() {
      this.isShowSpinner = true; // 显示获取更多主题的加载动画
      this.loading = true; // 获取更多主题过程中无限滚动不会被触发
      this.$store.commit('setPage');
      this.$axios.get(`https://cnodejs.org/api/v1/topics?page=${this.page}&tab=${this.activeTab}`)
        .then(response => {
          this.loading = false;
          this.isShowSpinner = false;
          this.$store.commit('getTopics', {topics: this.topics.concat(response.data.data)});
        })
        .catch(error => {
          this.loading = false;
          this.isShowSpinner = false;
          if(error.response) {
            this.$toast(error.response.data.error_msg);
          }else {
            this.$toast('请求失败 ' + error);
          }
        });
    },
    // 显示返回顶部按钮
    showGoTop(event) {
      if(event.target.scrollTop >= event.target.clientHeight) {
        this.isShowGoTop = true;
      }else {
        this.isShowGoTop = false;
      }
    },
    // 返回顶部
    goTop() {
      if(this.$refs.topicList.scrollTop <= 0) {
        return;
      }
      let timer = setInterval(() => {
        if(this.$refs.topicList.scrollTop <= 0) {
          clearInterval(timer);
        }
        this.$refs.topicList.scrollTop -= 300;
      }, 3);
    }
  }
}
</script>

<style lang="scss" scoped>
.topic-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  background: $primary-bg;
  ul {
    width: 95%;
    li {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid $border-color;
      .avatar {
        @include rounded-avatar(45px);
      }
      .detail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding-left: 3%;
        overflow: hidden;
        height: 45px;
        .title-block {
          display: flex;
          font-size: 14px;
          .tag {
            margin-right: 10px;
            background-color: rgba(64,158,255,.1);
            border: 1px solid rgba(64,158,255,.2);
            color: #409eff;
            height: 20px;
            padding: 0 5px;
            line-height: 18px;
            font-size: 12px;
            border-radius: 4px;
            white-space: nowrap;
            &.top {
              background-color: rgba(245,108,108,.1);
              border-color: rgba(245,108,108,.2);
              color: #f56c6c;
            }
            &.good {
              background-color: rgba(103,194,58,.1);
              border-color: rgba(103,194,58,.2);
              color: #67c23a;
            }
          }
          .title {
            flex: 1;
            color: $text-color;
            text-align: left;
            @include text-overflow;
          }
        }
        .info-block {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: $info-color;
          font-size: 12px;
        }
      }
    }
  }
  .spinner {
    padding: 10px 0;
  }
  .go-top {
    position: fixed;
    right: 0;
    bottom: 20%;
    width: 30px;
    font-size: 12px;
    border-radius: 5px 0 0 5px;
    background: rgba(38, 162, 255, .7);
    color: rgba(255, 255, 255, .8);
    padding: 10px;
  }
}
</style>
