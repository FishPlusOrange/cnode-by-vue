<template>
  <transition name="pop">
    <div class="new-topic" v-show="isShowNewTopic">
      <mt-header title="新建主题">
        <mt-button icon="back" slot="left" @click="hideNewTopic"></mt-button>
      </mt-header>
      <div class="form-block">
        <div class="form-part type">
          <span@click="toggleTypePicker(true)">{{ type.label }}</span>
        </div>
        <div class="form-part title">
          <input type="text" placeholder="请输入标题..." v-model="title">
        </div>
        <div class="form-part content">
          <textarea rows="10" placeholder="请输入内容..." v-model="content"></textarea>
        </div>
      </div>
      <div class="btn-part">
        <mt-button type="primary" size="large" @click="publishNewTopic">发布</mt-button>
      </div>
      <transition name="pop">
        <div class="type-picker-wrapper" v-if="isShowTypePicker">
          <div class="mask"></div>
          <div class="type-picker">
            <div class="btn-bar">
              <span class="cancel" @click="toggleTypePicker(false)">取消</span>
              <span class="ensure" @click="ensureType">确定</span>
            </div>
            <mt-picker :slots="types" :valueKey="'label'" :visibleItemCount="3" :itemHeight="50"  @change="changeType"></mt-picker>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'newTopic',
  data() {
    return {
      type: {
        label: '分享',
        value: 'share'
      },
      storageType: {},
      title: '',
      content: '',
      types: [
        {
          values: [
            {
              label: '分享',
              value: 'share'
            },
            {
              label: '问答',
              value: 'ask'
            },
            {
              label: '招聘',
              value: 'job'
            },
            {
              label: '测试',
              value: 'dev'
            }
          ]
        }
      ],
      isShowTypePicker: false
    }
  },
  computed: {
    accessToken() {
      return this.$store.state.accessToken;
    },
    isShowNewTopic() {
      return this.$store.state.isShowNewTopic;
    }
  },
  methods: {
    // 切换类别
    changeType(picker, values) {
      this.storageType = values[0];
    },
    // 确定类别
    ensureType() {
      this.type = this.storageType;
      this.isShowTypePicker = false;
    },
    // 发布主题
    publishNewTopic() {
      this.$indicator.open({
        spinnerType: 'double-bounce'
      });
      this.$axios.post('https://cnodejs.org/api/v1/topics', {
        accesstoken: this.accessToken,
        title: this.title,
        tab: this.type.value,
        content: this.content
      })
        .then(response => {
          this.$indicator.close();
          if(response.data && response.data.success) {
            this.$store.commit('toggleNewTopic', {isShowNewTopic: false});
            this.$store.commit('toggleSideBar', {isShowSideBar: false});
            this.$router.push({name: 'topicContent', params: {id: response.data.topic_id}});
          }else {
            this.$toast('发布失败，请稍后重试');
          }
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
    // 显示或隐藏类别选择器
    toggleTypePicker(status) {
      this.isShowTypePicker = status;
    },
    // 隐藏新建主题界面
    hideNewTopic() {
      this.$store.commit('toggleNewTopic', {isShowNewTopic: false});
    }
  }
}
</script>

<style lang="scss" scoped>
.new-topic {
  @include absolute-panel;
  background: $primary-bg;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
  font-size: 14px;
  .form-block {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 30px;
    .form-part {
      &.type {
        margin-bottom: 15px;
        span {
          display: block;
          line-height: 30px;
          height: 30px;
          padding: 0 10px;
          border-bottom: 1px solid $border-color;
        }
      }
      &.title {
        margin-bottom: 15px;
      }
      &.content {
        flex: 1;
      }
      text-align: left;
      input[type="text"] {
        width: 100%;
        height: 30px;
        border-bottom: 1px solid $border-color;
        padding: 0 10px;
        border-radius: 0;
      }
      textarea {
        width: 100%;
        height: 100%;
        border: 1px solid $border-color;
        padding: 10px;
        border-radius: 5px;
      }
    }
  }
  .btn-part {
    padding: 30px;
  }
  .type-picker-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    .mask {
      flex: 1;
    }
    .type-picker {
      background: $primary-bg;
      padding: 10px 30px;
      box-shadow: 0 0 15px #808080;
      .btn-bar {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
