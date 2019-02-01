<template>
  <transition name="pop">
    <div class="msg-center" v-show="isShowMsgCenter">
      <mt-header class="header" title="消息中心">
        <mt-button icon="back" slot="left" @click="hideMegCenter"></mt-button>
      </mt-header>
      <mt-navbar class="tab" v-model="active">
        <mt-tab-item id="unread">未读消息 <mt-badge type="error" size="small" v-show="msgs.hasnot_read_messages.length">{{ msgs.hasnot_read_messages.length }}</mt-badge></mt-tab-item>
        <mt-tab-item id="read">已读消息 <mt-badge type="success" size="small" v-show="msgs.has_read_messages.length">{{ msgs.has_read_messages.length }}</mt-badge></mt-tab-item>
      </mt-navbar>
      <mt-tab-container class="content" v-model="active">
        <mt-tab-container-item id="unread">
          <ul class="cell-wrapper" v-if="msgs.hasnot_read_messages.length">
            <li class="cell" v-for="(msg, index) of msgs.hasnot_read_messages">
              <div class="info">
                <router-link class="user" :to="{name: 'UserInfo', params: {loginname: msg.author.loginname}}" @click.native="hideAll" v-if="msg.author.loginname">
                  <div class="avatar">
                    <img :src="msg.author.avatar_url">
                  </div>
                  <span class="name">{{ msg.author.loginname + '：' }}</span>
                </router-link>
                <div class="date">{{ msg.reply.create_at | dateFormat }}</div>
              </div>
              <div class="content" v-html="msg.reply.content"></div>
              <div class="topic">话题：<router-link :to="{name: 'TopicContent', params: {id: msg.topic.id}}" @click.native="markSingleRead(msg.id)">{{ msg.topic.title }}</router-link></div>
            </li>
          </ul>
          <span class="no-data" v-show="!msgs.hasnot_read_messages.length">暂无消息</span>
        </mt-tab-container-item>
        <mt-tab-container-item id="read">
          <ul class="cell-wrapper" v-show="msgs.has_read_messages.length">
            <li class="cell" v-for="(msg, index) of msgs.has_read_messages">
              <div class="info">
                <router-link class="user" :to="{name: 'UserInfo', params: {loginname: msg.author.loginname}}" @click.native="hideAll" v-if="msg.author.loginname">
                  <div class="avatar">
                    <img :src="msg.author.avatar_url">
                  </div>
                  <span class="name">{{ msg.author.loginname + '：' }}</span>
                </router-link>
                <div class="date">{{ msg.reply.create_at | dateFormat }}</div>
              </div>
              <div class="content" v-html="msg.reply.content"></div>
              <div class="topic">话题：<router-link :to="{name: 'TopicContent', params: {id: msg.topic.id}}" @click.native="hideAll">{{ msg.topic.title }}</router-link></div>
            </li>
          </ul>
          <span class="no-data" v-if="!msgs.has_read_messages.length">暂无消息</span>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MsgCenter',
  data() {
    return {
      active: 'unread',
      msgs: {
        hasnot_read_messages: [],
        has_read_messages: []
      }
    }
  },
  computed: {
    ...mapState([
      'accessToken',
      'msgNum',
      'isShowMsgCenter'
    ])
  },
  created() {
    this.getMsg();
  },
  watch: {
    accessToken(val, oldVal) { // 监听登录状态 更新消息数据
      this.getMsg();
    }
  },
  methods: {
    ...mapMutations([
      'setMsgNum',
      'toggleMsgCenter',
      'toggleSideBar'
    ]),
    // 获取消息
    getMsg() {
      if(!this.accessToken) {
        this.msgs.hasnot_read_messages = [];
        this.msgs.has_read_messages = [];
        return;
      }
      this.$axios.get(`https://cnodejs.org/api/v1/messages?accesstoken=${this.accessToken}`)
        .then(response => this.msgs = response.data.data)
        .catch(error => {
          if(error.response) {
            this.$toast(error.response.data.error_msg);
          }else {
            this.$toast('请求失败 ' + error);
          }
        });
    },
    // 单条消息标记已读
    markSingleRead(id) {
      this.$axios.post(`https://cnodejs.org/api/v1/message/mark_one/${id}`, {
        accesstoken: this.accessToken
      })
        .then(response => {
          if(response.data.success) {
            this.getMsg(); // 获取消息
            this.setMsgNum(); // 更新未读消息数
          }else {
            this.$toast('单条消息标记已读失败');
          }
        })
        .catch(error => {
          if(error.response) {
            this.$toast(error.response.data.error_msg);
          }else {
            this.$toast('请求失败 ' + error);
          }
        });
      // 隐藏全部
      this.hideAll();
    },
    // 隐藏消息中心界面
    hideMegCenter() {
      this.toggleMsgCenter({isShowMsgCenter: false});
    },
    // 隐藏全部
    hideAll() {
      this.toggleMsgCenter({isShowMsgCenter: false});
      this.toggleSideBar({isShowSideBar: false});
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-gap: 10px;

.msg-center {
  @include absolute-panel;
  background: $basic-bg;
  display: flex;
  flex-direction: column;
  z-index: 1;
  .header {
    flex-shrink: 0;
  }
  .tab {
    flex-shrink: 0;
    a.is-selected {
      margin-bottom: 0;
    }
  }
  .content {
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    font-size: 14px;
    .cell-wrapper {
      margin: $primary-gap 0;
      .cell {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding: $primary-gap;
        background: $primary-bg;
        margin-bottom: $primary-gap;
        &:last-child {
          margin-bottom: 0;
        }
        .info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: $info-color;
          font-size: 12px;
          margin-bottom: 15px;
          .user {
            display: flex;
            align-items: center;
            color: $text-color;
            .avatar {
              @include rounded-avatar(20px);
            }
            .name {
              margin-left: $primary-gap;
            }
          }
        }
        .topic {
          @include text-overflow;
          font-size: 12px;
        }
      }
    }
    .no-data {
      display: block;
      color: $info-color;
      padding: $primary-gap 0;
    }
  }
}
</style>
