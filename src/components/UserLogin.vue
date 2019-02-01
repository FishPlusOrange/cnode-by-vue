<template>
  <transition name="pop">
    <div class="user-login" v-show="isShowUserLogin">
      <div class="form">
        <input type="password" placeholder="请输入 accessToken" v-model="loginVal">
        <mt-button type="primary" size="large" @click="doLogin">登录</mt-button>
        <mt-button type="primary" size="large" plain @click="hideUserLogin">取消</mt-button>
        <div class="copyright">
          <a href="https://github.com/FishPlusOrange" target="_blank">By FishPlusOrange</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'userLogin',
  data() {
    return {
      loginVal: ''
    }
  },
  computed: {
    ...mapState([
      'accessToken',
      'userInfo',
      'isShowUserLogin'
    ])
  },
  created() {
    this.loginVal = this.accessToken;
  },
  methods: {
    ...mapMutations([
      'updateAccessToken',
      'updateUserInfo',
      'toggleUserLogin'
    ]),
    // 登录
    doLogin() {
      if(!this.loginVal) { // 非空判断
        this.$toast('accessToken 不能为空');
        return;
      }
      this.$axios.post('https://cnodejs.org/api/v1/accesstoken', {accesstoken: this.loginVal})
        .then(response => {
          if(response.status === 200) {
            this.$toast('登录成功');
            this.updateAccessToken({accessToken: this.loginVal});
            this.updateUserInfo({userInfo: response.data});
            this.toggleUserLogin({isShowUserLogin: false});
            // 将 accesstoken 和对应用户信息存入 localStorage
            localStorage.accessToken = this.accessToken;
            localStorage.userInfo = JSON.stringify(this.userInfo);
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
    // 隐藏用户登录界面
    hideUserLogin() {
      this.toggleUserLogin({isShowUserLogin: false});
    }
  }
}
</script>

<style lang="scss" scoped>
.user-login {
  @include absolute-panel;
  background: $primary-bg;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .form {
    width: 80%;
    > input {
      width: 100%;
      height: 41px;
      border-radius: 4px;
      padding: 0 10px;
      margin-bottom: 105px;
      background-color: $basic-bg;
      border: 1px solid $border-color;
      transition: border-color 1s ease;
      &:focus {
        border-color: #26a2ff;
      }
    }
    > button {
      margin-bottom: 15px;
    }
    .copyright {
      margin-top: 125px;
      a {
        font-size: 14px;
        color: $info-color;
      }
    }
  }
}
</style>
