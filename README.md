# CNode by Vue

基于 [Vue](https://github.com/vuejs/vue) 和 [CNode API](http://cnodejs.org/api) 实现的 CNode 社区。

## Preview

在线预览：https://fishplusorange.github.io/cnode-by-vue/dist

源代码：https://github.com/FishPlusOrange/cnode-by-vue

## Features

已实现的功能：

- [x] 用户登录和退出：通过验证用户 accessToken  登录 CNode 社区或退出登录
- [x] 查看话题列表和话题内容：查看不同类别的话题列表和话题内容，类别包括全部、精华、分享、问答、招聘和测试
- [x] 评论功能：对话题进行评论
- [x] 回复功能：对评论进行回复
- [x] 点赞功能：点赞评论或取消点赞
- [x] 收藏功能：收藏话题或取消收藏
- [x] 新建话题：新建相应类别的话题
- [x] 消息中心：未读消息数提示，查看所有未读和已读消息
- [x] 我的收藏：查看所有收藏话题
- [x] 用户信息：查看用户基本信息，包括个人信息、最近创建的话题和最近参与的话题

## Technology

主要用到的技术：

- Vue：MVVM 框架，用于构建前端界面
- Vue CLI：Vue 脚手架，用于快速搭建 Vue 项目
- Vue Router：Vue 路由管理器，用于实现路由组件切换、参数传递等
- Vuex：Vue 状态管理模式，采用集中式存储管理所有组件的状态，实现不同组件间的状态共享
- Axios：基于 Promise 的 HTTP 库，用于发送异步请求
- ES6：采用 ES6 语法，如箭头函数、Promise、模板字符串等
- Mint UI：基于 Vue 的移动端组件库
- Sass：CSS 预处理器，采用 Sass3 的语法规则 SCSS，提供变量、计算、嵌套、Mixin、函数等
- CSS3：使用 CSS3 新特性，比如过渡动画等
- Flex：弹性布局，简单适配移动端和 PC 端
- Moment.js：JavaScript 日期处理类库，用于对日期进行格式化
- Webpack：Vue CLI 搭建的项目基于 Webpack，在 Vue CLI 所提供的基础配置上，做了相应调整，比如 Sass 相关配置

## Start

```bash
# clone with Git Bash
git clone https://github.com/FishPlusOrange/cnode-by-vue.git

# change directory
cd cnode-by-vue

# install dependencies
npm install

# serve with hot reload at localhost:8686
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## License

[MIT](https://github.com/FishPlusOrange/cnode-by-vue/blob/master/LICENSE)

Copyright (c) 2018-present FishPlusOrange
