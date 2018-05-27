<template>
  <div class="topic-content" ref="topicContent" @scroll="showGoTop($event)">
    <div class="content-block">
      <h3 class="title">{{ topicContent.title }}</h3>
      <div class="info-wrapper content">
        <div class="info">
          <router-link class="user" :to="{name: 'userInfo', params: {loginname: topicContent.author && topicContent.author.loginname}}">
            <div class="avatar">
              <img :src="topicContent.author && topicContent.author.avatar_url">
            </div>
            <span>{{ topicContent.author && topicContent.author.loginname }}</span>
          </router-link>
          <span>{{ topicContent.create_at | dateFormat }}</span>
          <span>{{ types[topicContent.tab]}}</span>
          <span>{{ topicContent.reply_count + '/' + topicContent.visit_count }}</span>
        </div>
        <div class="operation">
          <i class="iconfont icon-comment" @click="focusComment"></i>
          <i class="iconfont" :class="{'icon-collect-active': topicContent.is_collect, 'icon-collect': !topicContent.is_collect}" @click="toggleCollect"></i>
        </div>
      </div>
      <div v-html="topicContent.content"></div>
    </div>
    <div class="reply-block">
      <span class="count">{{ topicContent.reply_count }}条回复</span>
      <ul>
        <li v-for="(reply, index) of topicContent.replies" class="reply-cell">
          <div class="info-wrapper reply">
            <div class="info">
              <router-link class="user" :to="{name: 'userInfo', params: {loginname: reply.author.loginname}}">
                <div class="avatar">
                  <img :src="reply.author.avatar_url">
                </div>
                <span>{{ reply.author.loginname }}</span>
              </router-link>
              <span>{{ reply.create_at | dateFormat }}</span>
              <span>{{ index + 1 }}楼</span>
            </div>
            <div class="operation">
              <i class="iconfont icon-reply" @click="toggleReply(index)"></i>
              <i class="iconfont" :class="{'icon-up-active': reply.is_uped, 'icon-up': !reply.is_uped}" @click="toggleUp(reply)"></i>
              <span>{{ reply.ups.length }}</span>
            </div>
          </div>
          <div v-html="reply.content"></div>
          <div class="input-block reply" v-show="currentReplyIndex === index">
            <input type="text" placeholder="请输入回复..." ref="reply" v-model="replyContent">
            <div class="operation">
              <mt-button type="primary" size="small" @click="commentOrReply(reply)">回复</mt-button>
              <mt-button size="small" @click="toggleReply(-1)">取消</mt-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="input-block comment">
      <textarea placeholder="请输入评论..." ref="comment" v-model="commentContent"></textarea>
      <div class="operation">
        <mt-button type="primary" size="small" @click="commentOrReply('')">评论</mt-button>
      </div>
    </div>
    <div class="go-top" v-if="isShowGoTop" @click="goTop()">返回顶部</div>
  </div>
</template>

<script>
export default {
  name: 'topicContent',
  data() {
    return {
      id: this.$route.params.id,
      topicContent: {
        reply_count: 0,
        visit_count: 0
      },
      commentContent: '',
      replyContent: '',
      currentReplyIndex: null,
      isShowGoTop: false
    }
  },
  created() {
    this.getTopicContent();
  },
  beforeRouteUpdate(to, from, next) { // 响应路由参数的变化 获取对应话题内容
    next();
    this.id = this.$route.params.id;
    this.getTopicContent();
  },
  computed: {
    accessToken() {
      return this.$store.state.accessToken;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    types() {
      return this.$store.state.types;
    }
  },
  methods: {
    // 获取话题内容
    getTopicContent() {
      this.$store.commit('toggleBack', {isShowBack: true}); // 显示返回按钮
      this.$indicator.open({
        spinnerType: 'double-bounce'
      });
      this.$axios.get(`https://cnodejs.org/api/v1/topic/${this.id}`)
        .then(response => {
          this.$indicator.close();
          this.topicContent = response.data.data;
        })
        .catch(error => {
          this.$indicator.close();
          if(error.response) {
            this.$toast(error.response.data.error_msg);
          }else {
            this.$toast('请求失败 ' + error);
          }
        });
    },
    // 收藏或取消收藏
    toggleCollect() {
      if(!this.accessToken) { // 判断登录状态
        this.$store.commit('toggleUserLogin', {isShowUserLogin: true});
        return;
      }
      let _urlStr, _successMsg, _errorMsg;
      if(this.topicContent.is_collect) { // 判断收藏状态
        _urlStr = 'de_collect';
        _errorMsg = '取消收藏失败，请稍后重试';
      }else {
        _urlStr = 'collect';
        _errorMsg = '收藏失败，请稍后重试';
      }
      this.$axios.post(`https://cnodejs.org/api/v1/topic_collect/${_urlStr}`, {
        accesstoken: this.accessToken,
        topic_id: this.topicContent.id,
      })
        .then(response => {
          if(response.data.success) {
            this.topicContent.is_collect = !this.topicContent.is_collect;
          }else {
            this.$toast(_errorMsg);
          }
        })
        .catch(error => {
          if(error.response) {
            this.$toast(error.response.data.error_msg);
          }else {
            this.$toast('请求失败 ' + error);
          }
        });
    },
    // 点赞或取消点赞
    toggleUp(reply) {
      if(!this.accessToken) { // 判断登录状态
        this.$store.commit('toggleUserLogin', {isShowUserLogin: true});
        return;
      }
      if(reply.author.loginname === this.userInfo.loginname) { // 判断点赞目标
        this.$toast('不能帮自己点赞');
        return;
      }
      let _successMsg, _errorMsg;
      if(reply.is_uped) { // 判断点赞状态
        _errorMsg = '取消点赞失败，请稍后重试';
      }else {
        _errorMsg = '点赞失败，请稍后重试';
      }
      this.$axios.post(`https://cnodejs.org/api/v1/reply/${reply.id}/ups`, {
        accesstoken: this.accessToken
      })
        .then(response => {
          if(response.data.success) {
            if(response.data.action === 'up') {
              reply.ups.length++;
            }else if(response.data.action === 'down') {
              reply.ups.length--;
            }
            reply.is_uped = !reply.is_uped;
          }else {
            this.$toast(_errorMsg);
          }
        })
        .catch(error => {
          if(error.response) {
            this.$toast(error.response.data.error_msg);
          }else {
            this.$toast('请求失败 ' + error);
          }
        });
    },
    // 显示或隐藏回复面板
    toggleReply(index) {
      if(index > -1) { // 显示
        this.currentReplyIndex = index;
        this.$refs.reply[index].focus();
      }else { // 隐藏
        this.replyContent = '';
        this.currentReplyIndex = null;
      }
    },
    // 获取评论面板焦点
    focusComment() {
      this.$refs.comment.focus();
    },
    // 评论或回复
    commentOrReply(reply) {
      if(!this.accessToken) { // 判断登录状态
        this.$store.commit('toggleUserLogin', {isShowUserLogin: true});
        return;
      }
      let _content, _id, _successMsg;
      if(reply) { // 回复
        _content = `@${reply.author.loginname} ${this.replyContent}`;
        _id = reply.id;
      }else { // 评论
        _content = this.commentContent;
        _id = '';
      }
      this.$axios.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
        accesstoken: this.accessToken,
        content: _content,
        reply_id: _id
      })
        .then(response => {
          if(response.data.success) {
            this.getTopicContent(); // 重新获取话题内容
          }
        })
        .then(() => {
          // 初始化
          if(reply) {
            this.replyContent = '';
            this.currentReplyIndex = null;
          }else {
            this.commentContent = '';
          }
        })
        .catch(error => {
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
      if(this.$refs.topicContent.scrollTop <= 0) {
        return;
      }
      let timer = setInterval(() => {
        if(this.$refs.topicContent.scrollTop <= 0) {
          clearInterval(timer);
        }
        this.$refs.topicContent.scrollTop -= 300;
      }, 3);
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-size: 20px;

.topic-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  text-align: left;
  overflow-x: hidden;
  overflow-y: auto;
  > div {
    width: 100%;
    flex-shrink: 0;
    padding: 0 10px;
    background: $primary-bg;
  }
  .content-block {
    margin-top: 10px;
    .title {
      flex: 1;
      margin: 15px 0;
      word-break: break-all;
    }
  }
  .reply-block {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    .count {
      margin: 15px 0;
      font-size: 12px;
    }
    .reply-cell {
      border-bottom: 1px solid $border-color;
      margin-bottom: 15px;
      &:last-child {
        border-bottom: 0 none;
      }
    }
  }
  .info-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    line-height: $primary-size;
    margin-bottom: 15px;
    &.content {
      margin: 15px 0;
    }
    .info {
      display: flex;
      align-items: center;
      color: $info-color;
      .user {
        display: flex;
        align-items: center;
        .avatar {
          @include rounded-avatar($primary-size);
        }
      }
      span {
        margin-left: 10px;
      }
    }
    .operation {
      display: flex;
      line-height: $primary-size;
      * {
        margin-left: 5px;
      }
      .iconfont {
        width: $primary-size;
        height: $primary-size;
        font-size: $primary-size;
      }
    }
  }
  .input-block {
    display: flex;
    flex-direction: column;
    padding: 10px;
    &.comment {
      margin-bottom: 10px;
    }
    textarea {
      height: 75px;
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid $border-color;
      border-radius: 5px;
    }
    input {
      height: 30px;
      width: 100%;
      padding: 0 5px;
      margin-bottom: 10px;
      border: 1px solid $border-color;
      border-radius: 5px;
    }
    .operation {
      text-align: right;
      button {
        padding: 0px 10px;
        margin-left: 10px;
        height: 25px;
      }
    }
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
