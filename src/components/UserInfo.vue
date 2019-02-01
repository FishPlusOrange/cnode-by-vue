<template>
  <div class="user-info">
    <div class="cell user">
      <div class="avatar">
        <img :src="userInfo.avatar_url">
      </div>
      <div class="info">
        <span>用户名：{{ userInfo.loginname }}</span>
        <span>GitHub：<a :href="`https://github.com/${userInfo.githubUsername}`" target="_blank">{{ userInfo.githubUsername }}</a></span>
        <span>积分：{{ userInfo.score }}</span>
        <span>注册于{{ userInfo.create_at && userInfo.create_at.substr(0, 10) }}</span>
      </div>
    </div>
    <div class="cell topic">
      <span class="title">最近创建的话题：</span>
      <ul>
        <li v-for="(topic, index) of userInfo.recent_topics"><router-link :to="{name: 'topicContent', params: {id: topic.id}}">{{ topic.title }}</router-link></li>
      </ul>
    </div>
    <div class="cell reply">
      <span class="title">最近参与的话题：</span>
      <ul>
        <li v-for="(reply, index) of userInfo.recent_replies"><router-link :to="{name: 'topicContent', params: {id: reply.id}}">{{ reply.title }}</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'UserInfo',
  data() {
    return {
      loginname: this.$route.params.loginname,
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo();
  },
  beforeRouteUpdate(to, from, next) { // 响应路由参数的变化 获取对应用户信息
    next();
    this.loginname = this.$route.params.loginname;
    this.getUserInfo();
  },
  methods: {
    ...mapMutations([
      'toggleBack'
    ]),
    // 获取用户信息
    getUserInfo() {
      this.toggleBack({isShowBack: true}); // 显示返回按钮
      this.$indicator.open({
        spinnerType: 'double-bounce'
      });
      this.$axios.get(`https://cnodejs.org/api/v1/user/${this.loginname}`)
        .then(response => {
          this.$indicator.close();
          this.userInfo = response.data.data;
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
$primary-gap: 10px;

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 14px;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  .cell {
    width: 100%;
    display: flex;
    padding: $primary-gap;
    background: $primary-bg;
    margin: $primary-gap 0;
    flex-shrink: 0;
    font-size: 12px;
    &:first-child {
      margin-bottom: 0;
    }
    &:last-child {
      margin-top: 0;
    }
    &.user {
      .avatar {
        overflow: hidden;
        @include rounded-avatar;
      }
      .info {
        flex: 1;
        padding-left: 25px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 14px;
      }
    }
    &.topic,
    &.reply {
      flex-direction: column;
      .title {
        font-weight: 600;
        padding-bottom: $primary-gap;
        border-bottom: 1px solid $border-color;
      }
      ul {
        li {
          margin-top: $primary-gap;
          @include text-overflow;
        }
      }
    }
  }
}
</style>
