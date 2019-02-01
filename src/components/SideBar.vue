<template>
  <transition name="slide">
    <div class="side-bar" v-show="isShowSideBar">
      <div class="menu">
        <div class="main-block">
          <div @click="showUserLogin">
            <mt-cell class="user" :title="userInfo.loginname || '登录'" is-link>
              <img slot="icon" :src="userInfo.avatar_url || ''" width="24" height="24" v-show="accessToken">
            </mt-cell>
          </div>
          <div @click="showNewTopic">
            <mt-cell title="新建话题" is-link></mt-cell>
          </div>
          <div @click="showUserCollection">
            <mt-cell title="我的收藏" is-link></mt-cell>
          </div>
          <div @click="showMsgCenter">
            <mt-cell title="消息中心" is-link>
              <mt-badge size="small" type="error" v-show="realMsgNum">{{ realMsgNum }}</mt-badge>
            </mt-cell>
          </div>
        </div>
        <div class="exit-block" @click="doLogout" v-if="accessToken">
          <mt-cell title="退出登录"></mt-cell>
        </div>
      </div>
      <div class="mask" @click="hideSideBar"></div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'SideBar',
  computed: {
    ...mapState([
      'accessToken',
      'userInfo',
      'msgNum',
      'isShowSideBar'
    ]),
    realMsgNum() {
      return this.msgNum <= 99 ? this.msgNum : '99+';
    }
  },
  created() {
    this.getMsgNum();
  },
  watch: {
    accessToken(val, oldVal) { // 监听登录状态 更新未读消息数
      this.getMsgNum();
    }
  },
  methods: {
    ...mapMutations([
      'setMsgNum',
      'toggleSideBar',
      'toggleUserLogin',
      'toggleNewTopic',
      'toggleUserCollection',
      'toggleMsgCenter',
      'updateAccessToken',
      'updateUserInfo'
    ]),
    // 获取未读消息数
    getMsgNum() {
      if(!this.accessToken) { // 判断登录状态
        this.setMsgNum({msgNum: 0});
        return;
      }
      this.$axios.get(`https://cnodejs.org/api/v1/message/count?accesstoken=${this.accessToken}`)
        .then(reponse => this.setMsgNum({msgNum: reponse.data.data}))
        .catch(error => {
          if(error.response) {
            this.$toast(error.response.data.error_msg);
          }else {
            this.$toast('请求失败 ' + error);
          }
        });
    },
    // 显示用户登录界面
    showUserLogin() {
      if(this.userInfo.success) { // 判断当前登录状态
        this.$router.push({name: 'UserInfo', params: {loginname: this.userInfo.loginname}}); // 若处于登录状态则显示本人用户信息
        this.toggleSideBar({isShowSideBar: false});
        return;
      }
      this.toggleUserLogin({isShowUserLogin: true});
    },
    // 显示新建话题界面
    showNewTopic() {
      if(!this.accessToken) {
        this.toggleUserLogin({isShowUserLogin: true});
        return;
      }
      this.toggleNewTopic({isShowNewTopic: true});
    },
    // 显示用户收藏界面
    showUserCollection() {
      if(!this.accessToken) {
        this.toggleUserLogin({isShowUserLogin: true});
        return;
      }
      this.toggleUserCollection({isShowUserCollection: true});
    },
    // 显示消息中心界面
    showMsgCenter() {
      if(!this.accessToken) {
        this.toggleUserLogin({isShowUserLogin: true});
        return;
      }
      this.toggleMsgCenter({isShowMsgCenter: true});
    },
    // 退出登录
    doLogout() {
      this.$messagebox.confirm('确定退出登录吗?', '').then(action => {
        this.updateAccessToken({accessToken: ''});
        this.updateUserInfo({userInfo: ''});
        this.toggleSideBar({isShowSideBar: false});
        // 清除 localStorage 中 accesstoken 和对应用户信息
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
      }, () => {});
    },
    // 隐藏左侧操作面板
    hideSideBar() {
      this.toggleSideBar({isShowSideBar: false});
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar {
  @include absolute-panel;
  display: flex;
  .menu {
    width: 250px;
    background: $primary-bg;
    box-shadow: 0 0 15px #808080;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20%;
    .main-block {
      text-align: left;
      > div {
        margin-bottom: 15px;
        .user {
          img {
            margin-right: 5px;
            border-radius: 12px;
          }
        }
      }
    }
    .exit-block {
      color: #f56c6c;
    }
  }
  .mask {
    flex: 1;
  }
}
</style>
