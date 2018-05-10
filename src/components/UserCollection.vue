<template>
  <transition name="pop">
    <div class="user-collection" v-show="isShowUserCollection">
      <mt-header class="header" title="我的收藏">
        <mt-button icon="back" slot="left" @click="hideUserCollection"></mt-button>
      </mt-header>
      <div class="content">
        <ul class="cell-wrapper">
          <li class="cell" v-for="(collection, index) of collections">
            <div class="title">
              <span class="tag">{{ types[collection.tab] }}</span>
              <router-link class="link" :to="{name: 'topicContent', params: {id: collection.id}}" @click.native="hideAll">{{ collection.title }}</router-link>
            </div>
            <div class="info">
              <span>{{ collection.create_at | dateFormat }}</span>
              <span>{{ collection.reply_count + '/' + collection.visit_count }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'userCollection',
  data() {
    return {
      collections: []
    }
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
    },
    isShowUserCollection() {
      return this.$store.state.isShowUserCollection;
    },
    isShowSideBar() {
      return this.$store.state.isShowSideBar;
    }
  },
  created() {
    this.getUserCollection();
  },
  watch: {
    accessToken(val, oldVal) { // 监听登录状态 更新用户收藏数据
      this.getUserCollection();
    }
  },
  methods: {
    // 获取用户收藏
    getUserCollection() {
      if(!this.accessToken) { // 判断当前登录状态
        this.collections = [];
        return;
      }
      this.$axios.get(`https://cnodejs.org/api/v1/topic_collect/${this.userInfo.loginname }`)
        .then(response => this.collections = response.data.data)
        .catch(error => {
          if(error.response) {
            this.$toast(error.response.data.error_msg);
          }else {
            this.$toast('请求失败 ' + error);
          }
        });
    },
    // 隐藏用户收藏界面
    hideUserCollection() {
      this.$store.commit('toggleUserCollection', {isShowUserCollection: false});
    },
    // 全部隐藏
    hideAll() {
      this.$store.commit('toggleUserCollection', {isShowUserCollection: false});
      this.$store.commit('toggleSideBar', {isShowSideBar: false});
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-gap: 10px;

.user-collection {
  @include absolute-panel;
  background: $basic-bg;
  display: flex;
  flex-direction: column;
  z-index: 1;
  .content {
    flex: 1;
    .cell-wrapper {
      margin: $primary-gap 0;
      .cell {
        display: flex;
        flex-direction: column;
        padding: $primary-gap;
        background: $primary-bg;
        margin-bottom: $primary-gap;
        &:last-child {
          margin-bottom: 0;
        }
        .title {
          display: flex;
          font-size: 14px;
          margin-bottom: $primary-gap;
          .tag {
            margin-right: $primary-gap;
            background-color: rgba(64,158,255,.1);
            border: 1px solid rgba(64,158,255,.2);
            color: #409eff;
            height: 20px;
            padding: 0 5px;
            line-height: 18px;
            font-size: 12px;
            border-radius: 4px;
            white-space: nowrap;
          }
          .link {
            flex: 1;
            color: $text-color;
            text-align: left;
            @include text-overflow;
          }
        }
        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: $info-color;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
