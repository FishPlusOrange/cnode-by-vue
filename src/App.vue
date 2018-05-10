<template>
  <div id="app">
    <MainHeader></MainHeader>
    <router-view/>
    <NewTopic></NewTopic>
    <UserLogin></UserLogin>
    <UserCollection></UserCollection>
    <MsgCenter></MsgCenter>
    <SideBar></SideBar>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'
import NewTopic from '@/components/NewTopic'
import UserLogin from '@/components/UserLogin'
import UserCollection from '@/components/UserCollection'
import MsgCenter from '@/components/MsgCenter'
import SideBar from '@/components/SideBar'
export default {
  name: 'App',
  components: {
    MainHeader,
    NewTopic,
    UserLogin,
    UserCollection,
    MsgCenter,
    SideBar
  }
}
</script>

<style lang="scss">
@import '../static/iconfont/iconfont.css';
@import './assets/css/base';
@import './assets/css/common';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
