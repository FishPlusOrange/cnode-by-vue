webpackJsonp([1],{"+Ew0":function(t,e){},"7F9b":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("7+uW"),n=s("Dd8w"),i=s.n(n),a=s("NYxO"),c={name:"MainHeader",computed:i()({},Object(a.c)(["isShowBack"])),methods:i()({},Object(a.b)(["toggleSideBar"]),{showSideBar:function(){this.toggleSideBar({isShowSideBar:!0})}})},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("mt-header",{staticClass:"main-header",attrs:{title:"CNode"}},[s("mt-button",{directives:[{name:"show",rawName:"v-show",value:t.isShowBack,expression:"isShowBack"}],attrs:{slot:"left",icon:"back"},on:{click:function(e){t.$router.go(-1)}},slot:"left"},[t._v("返回")]),t._v(" "),s("mt-button",{attrs:{slot:"right",icon:"more"},on:{click:t.showSideBar},slot:"right"})],1)},staticRenderFns:[]};var l=s("VU/8")(c,r,!1,function(t){s("xOAs")},"data-v-5f5f96c5",null).exports,p={name:"NewTopic",data:function(){return{type:{label:"分享",value:"share"},storageType:{},title:"",content:"",types:[{values:[{label:"分享",value:"share"},{label:"问答",value:"ask"},{label:"招聘",value:"job"},{label:"测试",value:"dev"}]}],isShowTypePicker:!1}},computed:i()({},Object(a.c)(["accessToken","isShowNewTopic"])),methods:i()({},Object(a.b)(["toggleNewTopic","toggleSideBar"]),{changeType:function(t,e){this.storageType=e[0]},ensureType:function(){this.type=this.storageType,this.isShowTypePicker=!1},publishNewTopic:function(){var t=this;this.$indicator.open({spinnerType:"double-bounce"}),this.$axios.post("https://cnodejs.org/api/v1/topics",{accesstoken:this.accessToken,title:this.title,tab:this.type.value,content:this.content}).then(function(e){t.$indicator.close(),e.data&&e.data.success?(t.toggleNewTopic({isShowNewTopic:!1}),t.toggleSideBar({isShowSideBar:!1}),t.$router.push({name:"TopicContent",params:{id:e.data.topic_id}})):t.$toast("发布失败，请稍后重试")}).catch(function(e){t.$indicator.close(),e.response?t.$toast(e.response.data.error_msg):t.$toast("请求失败 "+e)})},toggleTypePicker:function(t){this.isShowTypePicker=t},hideNewTopic:function(){this.toggleNewTopic({isShowNewTopic:!1})}})},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"pop"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowNewTopic,expression:"isShowNewTopic"}],staticClass:"new-topic"},[s("mt-header",{attrs:{title:"新建话题"}},[s("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.hideNewTopic},slot:"left"})],1),t._v(" "),s("div",{staticClass:"form-block"},[s("div",{staticClass:"form-part type"},[s("span",{on:{click:function(e){t.toggleTypePicker(!0)}}},[t._v(t._s(t.type.label))])]),t._v(" "),s("div",{staticClass:"form-part title"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{type:"text",placeholder:"请输入标题..."},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"form-part content"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{rows:"10",placeholder:"请输入内容..."},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"btn-part"},[s("mt-button",{attrs:{type:"primary",size:"large"},on:{click:t.publishNewTopic}},[t._v("发布")])],1),t._v(" "),s("transition",{attrs:{name:"pop"}},[t.isShowTypePicker?s("div",{staticClass:"type-picker-wrapper"},[s("div",{staticClass:"mask"}),t._v(" "),s("div",{staticClass:"type-picker"},[s("div",{staticClass:"btn-bar"},[s("span",{staticClass:"cancel",on:{click:function(e){t.toggleTypePicker(!1)}}},[t._v("取消")]),t._v(" "),s("span",{staticClass:"ensure",on:{click:t.ensureType}},[t._v("确定")])]),t._v(" "),s("mt-picker",{attrs:{slots:t.types,valueKey:"label",visibleItemCount:3,itemHeight:50},on:{change:t.changeType}})],1)]):t._e()])],1)])},staticRenderFns:[]};var h=s("VU/8")(p,u,!1,function(t){s("UkVt")},"data-v-3f542882",null).exports,d=s("mvHQ"),g=s.n(d),v={name:"userLogin",data:function(){return{loginVal:""}},computed:i()({},Object(a.c)(["accessToken","userInfo","isShowUserLogin"])),created:function(){this.loginVal=this.accessToken},methods:i()({},Object(a.b)(["updateAccessToken","updateUserInfo","toggleUserLogin"]),{doLogin:function(){var t=this;this.loginVal?this.$axios.post("https://cnodejs.org/api/v1/accesstoken",{accesstoken:this.loginVal}).then(function(e){200===e.status&&(t.$toast("登录成功"),t.updateAccessToken({accessToken:t.loginVal}),t.updateUserInfo({userInfo:e.data}),t.toggleUserLogin({isShowUserLogin:!1}),localStorage.accessToken=t.accessToken,localStorage.userInfo=g()(t.userInfo))}).catch(function(e){e.response?t.$toast(e.response.data.error_msg):t.$toast("请求失败 "+e)}):this.$toast("accessToken 不能为空")},hideUserLogin:function(){this.toggleUserLogin({isShowUserLogin:!1})}})},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"pop"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowUserLogin,expression:"isShowUserLogin"}],staticClass:"user-login"},[s("div",{staticClass:"form"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.loginVal,expression:"loginVal"}],attrs:{type:"password",placeholder:"请输入 accessToken"},domProps:{value:t.loginVal},on:{input:function(e){e.target.composing||(t.loginVal=e.target.value)}}}),t._v(" "),s("mt-button",{attrs:{type:"primary",size:"large"},on:{click:t.doLogin}},[t._v("登录")]),t._v(" "),s("mt-button",{attrs:{type:"primary",size:"large",plain:""},on:{click:t.hideUserLogin}},[t._v("取消")]),t._v(" "),s("div",{staticClass:"copyright"},[s("a",{attrs:{href:"https://github.com/FishPlusOrange",target:"_blank"}},[t._v("By FishPlusOrange")])])],1)])])},staticRenderFns:[]};var f=s("VU/8")(v,m,!1,function(t){s("+Ew0")},"data-v-3f39eaf0",null).exports,_={name:"UserCollection",data:function(){return{collections:[]}},computed:i()({},Object(a.c)(["accessToken","userInfo","types","isShowUserCollection","isShowSideBar"])),created:function(){this.getUserCollection()},watch:{accessToken:function(t,e){this.getUserCollection()}},methods:i()({},Object(a.b)(["toggleUserCollection","toggleSideBar"]),{getUserCollection:function(){var t=this;this.accessToken?this.$axios.get("https://cnodejs.org/api/v1/topic_collect/"+this.userInfo.loginname).then(function(e){return t.collections=e.data.data}).catch(function(e){e.response?t.$toast(e.response.data.error_msg):t.$toast("请求失败 "+e)}):this.collections=[]},hideUserCollection:function(){this.toggleUserCollection({isShowUserCollection:!1})},hideAll:function(){this.toggleUserCollection({isShowUserCollection:!1}),this.toggleSideBar({isShowSideBar:!1})}})},w={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"pop"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowUserCollection,expression:"isShowUserCollection"}],staticClass:"user-collection"},[s("mt-header",{staticClass:"header",attrs:{title:"我的收藏"}},[s("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.hideUserCollection},slot:"left"})],1),t._v(" "),s("div",{staticClass:"content"},[s("ul",{staticClass:"cell-wrapper"},t._l(t.collections,function(e,o){return s("li",{staticClass:"cell"},[s("div",{staticClass:"title"},[s("span",{staticClass:"tag"},[t._v(t._s(t.types[e.tab]))]),t._v(" "),s("router-link",{staticClass:"link",attrs:{to:{name:"TopicContent",params:{id:e.id}}},nativeOn:{click:function(e){return t.hideAll(e)}}},[t._v(t._s(e.title))])],1),t._v(" "),s("div",{staticClass:"info"},[s("span",[t._v(t._s(t._f("dateFormat")(e.create_at)))]),t._v(" "),s("span",[t._v(t._s(e.reply_count+"/"+e.visit_count))])])])}))])],1)])},staticRenderFns:[]};var C=s("VU/8")(_,w,!1,function(t){s("orIP")},"data-v-e6098b7c",null).exports,k={name:"MsgCenter",data:function(){return{active:"unread",msgs:{hasnot_read_messages:[],has_read_messages:[]}}},computed:i()({},Object(a.c)(["accessToken","msgNum","isShowMsgCenter"])),created:function(){this.getMsg()},watch:{accessToken:function(t,e){this.getMsg()}},methods:i()({},Object(a.b)(["setMsgNum","toggleMsgCenter","toggleSideBar"]),{getMsg:function(){var t=this;if(!this.accessToken)return this.msgs.hasnot_read_messages=[],void(this.msgs.has_read_messages=[]);this.$axios.get("https://cnodejs.org/api/v1/messages?accesstoken="+this.accessToken).then(function(e){return t.msgs=e.data.data}).catch(function(e){e.response?t.$toast(e.response.data.error_msg):t.$toast("请求失败 "+e)})},markSingleRead:function(t){var e=this;this.$axios.post("https://cnodejs.org/api/v1/message/mark_one/"+t,{accesstoken:this.accessToken}).then(function(t){t.data.success?(e.getMsg(),e.setMsgNum()):e.$toast("单条消息标记已读失败")}).catch(function(t){t.response?e.$toast(t.response.data.error_msg):e.$toast("请求失败 "+t)}),this.hideAll()},hideMegCenter:function(){this.toggleMsgCenter({isShowMsgCenter:!1})},hideAll:function(){this.toggleMsgCenter({isShowMsgCenter:!1}),this.toggleSideBar({isShowSideBar:!1})}})},b={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"pop"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowMsgCenter,expression:"isShowMsgCenter"}],staticClass:"msg-center"},[s("mt-header",{staticClass:"header",attrs:{title:"消息中心"}},[s("mt-button",{attrs:{slot:"left",icon:"back"},on:{click:t.hideMegCenter},slot:"left"})],1),t._v(" "),s("mt-navbar",{staticClass:"tab",model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[s("mt-tab-item",{attrs:{id:"unread"}},[t._v("未读消息 "),s("mt-badge",{directives:[{name:"show",rawName:"v-show",value:t.msgs.hasnot_read_messages.length,expression:"msgs.hasnot_read_messages.length"}],attrs:{type:"error",size:"small"}},[t._v(t._s(t.msgs.hasnot_read_messages.length))])],1),t._v(" "),s("mt-tab-item",{attrs:{id:"read"}},[t._v("已读消息 "),s("mt-badge",{directives:[{name:"show",rawName:"v-show",value:t.msgs.has_read_messages.length,expression:"msgs.has_read_messages.length"}],attrs:{type:"success",size:"small"}},[t._v(t._s(t.msgs.has_read_messages.length))])],1)],1),t._v(" "),s("mt-tab-container",{staticClass:"content",model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[s("mt-tab-container-item",{attrs:{id:"unread"}},[t.msgs.hasnot_read_messages.length?s("ul",{staticClass:"cell-wrapper"},t._l(t.msgs.hasnot_read_messages,function(e,o){return s("li",{staticClass:"cell"},[s("div",{staticClass:"info"},[e.author.loginname?s("router-link",{staticClass:"user",attrs:{to:{name:"UserInfo",params:{loginname:e.author.loginname}}},nativeOn:{click:function(e){return t.hideAll(e)}}},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:e.author.avatar_url}})]),t._v(" "),s("span",{staticClass:"name"},[t._v(t._s(e.author.loginname+"："))])]):t._e(),t._v(" "),s("div",{staticClass:"date"},[t._v(t._s(t._f("dateFormat")(e.reply.create_at)))])],1),t._v(" "),s("div",{staticClass:"content",domProps:{innerHTML:t._s(e.reply.content)}}),t._v(" "),s("div",{staticClass:"topic"},[t._v("话题："),s("router-link",{attrs:{to:{name:"TopicContent",params:{id:e.topic.id}}},nativeOn:{click:function(s){t.markSingleRead(e.id)}}},[t._v(t._s(e.topic.title))])],1)])})):t._e(),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:!t.msgs.hasnot_read_messages.length,expression:"!msgs.hasnot_read_messages.length"}],staticClass:"no-data"},[t._v("暂无消息")])]),t._v(" "),s("mt-tab-container-item",{attrs:{id:"read"}},[s("ul",{directives:[{name:"show",rawName:"v-show",value:t.msgs.has_read_messages.length,expression:"msgs.has_read_messages.length"}],staticClass:"cell-wrapper"},t._l(t.msgs.has_read_messages,function(e,o){return s("li",{staticClass:"cell"},[s("div",{staticClass:"info"},[e.author.loginname?s("router-link",{staticClass:"user",attrs:{to:{name:"UserInfo",params:{loginname:e.author.loginname}}},nativeOn:{click:function(e){return t.hideAll(e)}}},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:e.author.avatar_url}})]),t._v(" "),s("span",{staticClass:"name"},[t._v(t._s(e.author.loginname+"："))])]):t._e(),t._v(" "),s("div",{staticClass:"date"},[t._v(t._s(t._f("dateFormat")(e.reply.create_at)))])],1),t._v(" "),s("div",{staticClass:"content",domProps:{innerHTML:t._s(e.reply.content)}}),t._v(" "),s("div",{staticClass:"topic"},[t._v("话题："),s("router-link",{attrs:{to:{name:"TopicContent",params:{id:e.topic.id}}},nativeOn:{click:function(e){return t.hideAll(e)}}},[t._v(t._s(e.topic.title))])],1)])})),t._v(" "),t.msgs.has_read_messages.length?t._e():s("span",{staticClass:"no-data"},[t._v("暂无消息")])])],1)],1)])},staticRenderFns:[]};var j=s("VU/8")(k,b,!1,function(t){s("fWgF")},"data-v-336547fe",null).exports,T={name:"SideBar",computed:i()({},Object(a.c)(["accessToken","userInfo","msgNum","isShowSideBar"]),{realMsgNum:function(){return this.msgNum<=99?this.msgNum:"99+"}}),created:function(){this.getMsgNum()},watch:{accessToken:function(t,e){this.getMsgNum()}},methods:i()({},Object(a.b)(["setMsgNum","toggleSideBar","toggleUserLogin","toggleNewTopic","toggleUserCollection","toggleMsgCenter","updateAccessToken","updateUserInfo"]),{getMsgNum:function(){var t=this;this.accessToken?this.$axios.get("https://cnodejs.org/api/v1/message/count?accesstoken="+this.accessToken).then(function(e){return t.setMsgNum({msgNum:e.data.data})}).catch(function(e){e.response?t.$toast(e.response.data.error_msg):t.$toast("请求失败 "+e)}):this.setMsgNum({msgNum:0})},showUserLogin:function(){if(this.userInfo.success)return this.$router.push({name:"UserInfo",params:{loginname:this.userInfo.loginname}}),void this.toggleSideBar({isShowSideBar:!1});this.toggleUserLogin({isShowUserLogin:!0})},showNewTopic:function(){this.accessToken?this.toggleNewTopic({isShowNewTopic:!0}):this.toggleUserLogin({isShowUserLogin:!0})},showUserCollection:function(){this.accessToken?this.toggleUserCollection({isShowUserCollection:!0}):this.toggleUserLogin({isShowUserLogin:!0})},showMsgCenter:function(){this.accessToken?this.toggleMsgCenter({isShowMsgCenter:!0}):this.toggleUserLogin({isShowUserLogin:!0})},doLogout:function(){var t=this;this.$messagebox.confirm("确定退出登录吗?","").then(function(e){t.updateAccessToken({accessToken:""}),t.updateUserInfo({userInfo:""}),t.toggleSideBar({isShowSideBar:!1}),localStorage.removeItem("accessToken"),localStorage.removeItem("userInfo")},function(){})},hideSideBar:function(){this.toggleSideBar({isShowSideBar:!1})}})},S={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"slide"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSideBar,expression:"isShowSideBar"}],staticClass:"side-bar"},[s("div",{staticClass:"menu"},[s("div",{staticClass:"main-block"},[s("div",{on:{click:t.showUserLogin}},[s("mt-cell",{staticClass:"user",attrs:{title:t.userInfo.loginname||"登录","is-link":""}},[s("img",{directives:[{name:"show",rawName:"v-show",value:t.accessToken,expression:"accessToken"}],attrs:{slot:"icon",src:t.userInfo.avatar_url||"",width:"24",height:"24"},slot:"icon"})])],1),t._v(" "),s("div",{on:{click:t.showNewTopic}},[s("mt-cell",{attrs:{title:"新建话题","is-link":""}})],1),t._v(" "),s("div",{on:{click:t.showUserCollection}},[s("mt-cell",{attrs:{title:"我的收藏","is-link":""}})],1),t._v(" "),s("div",{on:{click:t.showMsgCenter}},[s("mt-cell",{attrs:{title:"消息中心","is-link":""}},[s("mt-badge",{directives:[{name:"show",rawName:"v-show",value:t.realMsgNum,expression:"realMsgNum"}],attrs:{size:"small",type:"error"}},[t._v(t._s(t.realMsgNum))])],1)],1)]),t._v(" "),t.accessToken?s("div",{staticClass:"exit-block",on:{click:t.doLogout}},[s("mt-cell",{attrs:{title:"退出登录"}})],1):t._e()]),t._v(" "),s("div",{staticClass:"mask",on:{click:t.hideSideBar}})])])},staticRenderFns:[]};var y={name:"App",components:{MainHeader:l,NewTopic:h,UserLogin:f,UserCollection:C,MsgCenter:j,SideBar:s("VU/8")(T,S,!1,function(t){s("axO8")},"data-v-067bd7eb",null).exports}},U={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("main-header"),this._v(" "),e("router-view"),this._v(" "),e("new-Topic"),this._v(" "),e("user-login"),this._v(" "),e("user-collection"),this._v(" "),e("msg-center"),this._v(" "),e("side-bar")],1)},staticRenderFns:[]};var N=s("VU/8")(y,U,!1,function(t){s("sb1I")},null,null).exports,$=s("/ocq"),x={name:"TopicTab",computed:i()({},Object(a.c)(["types","activeTab"])),methods:i()({},Object(a.b)(["setTab","setTopics"]),{switchTab:function(t){var e=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.$indicator.open({spinnerType:"double-bounce"}),this.setTab({activeTab:t,page:1,topics:[]}),this.$axios.get("https://cnodejs.org/api/v1/topics?page="+s+"&tab="+this.activeTab).then(function(t){e.$indicator.close(),e.setTopics({topics:t.data.data})}).catch(function(t){e.$indicator.close(),t.response?e.$toast(t.response.data.error_msg):e.$toast("请求失败 "+t)})}})},I={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"topic-tab"},[s("ul",t._l(t.types,function(e,o){return s("li",{class:{active:t.activeTab===o},on:{click:function(e){t.switchTab(o)}}},[s("router-link",{attrs:{to:"/"}},[t._v(t._s(e))])],1)}))])},staticRenderFns:[]};var B={name:"MainContent",components:{TopicTab:s("VU/8")(x,I,!1,function(t){s("7F9b")},"data-v-090d24d0",null).exports}},L={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"main-content"},[e("topic-tab"),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var M=s("VU/8")(B,L,!1,function(t){s("xQm5")},"data-v-51487388",null).exports,O={name:"TopicList",data:function(){return{isShowSpinner:!1,isShowGoTop:!1}},created:function(){this.getTopics()},computed:i()({},Object(a.c)(["types","activeTab","page","topics"])),methods:i()({},Object(a.b)(["toggleBack","setTopics","setPage"]),{getTopics:function(){var t=this;this.$indicator.open({spinnerType:"double-bounce"}),this.toggleBack({isShowBack:!1}),this.$axios.get("https://cnodejs.org/api/v1/topics?tab="+this.activeTab).then(function(e){t.setTopics({topics:e.data.data}),t.$indicator.close()}).catch(function(e){e.response?t.$toast(e.response.data.error_msg):t.$toast("请求失败 "+e),t.$indicator.close()})},getMoreTopics:function(){var t=this;this.isShowSpinner=!0,this.loading=!0,this.setPage(),this.$axios.get("https://cnodejs.org/api/v1/topics?page="+this.page+"&tab="+this.activeTab).then(function(e){t.loading=!1,t.isShowSpinner=!1,t.setTopics({topics:t.topics.concat(e.data.data)})}).catch(function(e){t.loading=!1,t.isShowSpinner=!1,e.response?t.$toast(e.response.data.error_msg):t.$toast("请求失败 "+e)})},showGoTop:function(t){t.target.scrollTop>=t.target.clientHeight?this.isShowGoTop=!0:this.isShowGoTop=!1},goTop:function(){var t=this;if(!(this.$refs.topicList.scrollTop<=0))var e=setInterval(function(){t.$refs.topicList.scrollTop<=0&&clearInterval(e),t.$refs.topicList.scrollTop-=300},3)}})},z={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.getMoreTopics,expression:"getMoreTopics"}],ref:"topicList",staticClass:"topic-list",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"10","infinite-scroll-immediate-check":"false"},on:{scroll:function(e){t.showGoTop(e)}}},[s("ul",[s("transition-group",{attrs:{name:"fade"}},t._l(t.topics,function(e,o){return s("li",{key:o},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:e.author.avatar_url}})]),t._v(" "),s("div",{staticClass:"detail"},[s("div",{staticClass:"title-block"},[s("span",{staticClass:"tag",class:e.top?"top":e.good?"good":""},[t._v(t._s((e.top?"置顶":"")||(e.good?"精华":"")||t.types[e.tab]))]),t._v(" "),s("router-link",{staticClass:"title",attrs:{to:{name:"TopicContent",params:{id:e.id}}}},[t._v(t._s(e.title))])],1),t._v(" "),s("div",{staticClass:"info-block"},[s("span",{staticClass:"count"},[t._v(t._s(e.reply_count+"/"+e.visit_count))]),t._v(" "),s("span",{staticClass:"date"},[t._v(t._s(t._f("dateFormat")(e.last_reply_at)))])])])])}))],1),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowSpinner,expression:"isShowSpinner"}],staticClass:"spinner"},[s("mt-spinner",{attrs:{type:"triple-bounce",color:"#409eff",size:40}})],1),t._v(" "),t.isShowGoTop?s("div",{staticClass:"go-top",on:{click:function(e){t.goTop()}}},[t._v("返回顶部")]):t._e()])},staticRenderFns:[]};var F=s("VU/8")(O,z,!1,function(t){s("aNr0")},"data-v-a28ebe6a",null).exports,R={name:"TopicContent",data:function(){return{id:this.$route.params.id,topicContent:{reply_count:0,visit_count:0},commentContent:"",replyContent:"",currentReplyIndex:null,isShowGoTop:!1}},created:function(){this.getTopicContent()},beforeRouteUpdate:function(t,e,s){s(),this.id=this.$route.params.id,this.getTopicContent()},computed:i()({},Object(a.c)(["accessToken","userInfo","types"])),methods:i()({},Object(a.b)(["toggleBack","toggleUserLogin"]),{getTopicContent:function(){var t=this;this.toggleBack({isShowBack:!0}),this.$indicator.open({spinnerType:"double-bounce"}),this.$axios.get("https://cnodejs.org/api/v1/topic/"+this.id).then(function(e){t.$indicator.close(),t.topicContent=e.data.data}).catch(function(e){t.$indicator.close(),e.response?t.$toast(e.response.data.error_msg):t.$toast("请求失败 "+e)})},toggleCollect:function(){var t=this;if(this.accessToken){var e=void 0,s=void 0;this.topicContent.is_collect?(e="de_collect",s="取消收藏失败，请稍后重试"):(e="collect",s="收藏失败，请稍后重试"),this.$axios.post("https://cnodejs.org/api/v1/topic_collect/"+e,{accesstoken:this.accessToken,topic_id:this.topicContent.id}).then(function(e){e.data.success?t.topicContent.is_collect=!t.topicContent.is_collect:t.$toast(s)}).catch(function(e){e.response?t.$toast(e.response.data.error_msg):t.$toast("请求失败 "+e)})}else this.toggleUserLogin({isShowUserLogin:!0})},toggleUp:function(t){var e=this;if(this.accessToken)if(t.author.loginname!==this.userInfo.loginname){var s=void 0;s=t.is_uped?"取消点赞失败，请稍后重试":"点赞失败，请稍后重试",this.$axios.post("https://cnodejs.org/api/v1/reply/"+t.id+"/ups",{accesstoken:this.accessToken}).then(function(o){o.data.success?("up"===o.data.action?t.ups.length++:"down"===o.data.action&&t.ups.length--,t.is_uped=!t.is_uped):e.$toast(s)}).catch(function(t){t.response?e.$toast(t.response.data.error_msg):e.$toast("请求失败 "+t)})}else this.$toast("不能帮自己点赞");else this.toggleUserLogin({isShowUserLogin:!0})},toggleReply:function(t){t>-1?(this.currentReplyIndex=t,this.$refs.reply[t].focus()):(this.replyContent="",this.currentReplyIndex=null)},focusComment:function(){this.$refs.comment.focus()},commentOrReply:function(t){var e=this;if(this.accessToken){var s=void 0,o=void 0;t?(s="@"+t.author.loginname+" "+this.replyContent,o=t.id):(s=this.commentContent,o=""),this.$axios.post("https://cnodejs.org/api/v1/topic/"+this.id+"/replies",{accesstoken:this.accessToken,content:s,reply_id:o}).then(function(t){t.data.success&&e.getTopicContent()}).then(function(){t?(e.replyContent="",e.currentReplyIndex=null):e.commentContent=""}).catch(function(t){t.response?e.$toast(t.response.data.error_msg):e.$toast("请求失败 "+t)})}else this.toggleUserLogin({isShowUserLogin:!0})},showGoTop:function(t){t.target.scrollTop>=t.target.clientHeight?this.isShowGoTop=!0:this.isShowGoTop=!1},goTop:function(){var t=this;if(!(this.$refs.topicContent.scrollTop<=0))var e=setInterval(function(){t.$refs.topicContent.scrollTop<=0&&clearInterval(e),t.$refs.topicContent.scrollTop-=300},3)}})},P={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"topicContent",staticClass:"topic-content",on:{scroll:function(e){t.showGoTop(e)}}},[s("div",{staticClass:"content-block"},[s("h3",{staticClass:"title"},[t._v(t._s(t.topicContent.title))]),t._v(" "),s("div",{staticClass:"info-wrapper content"},[s("div",{staticClass:"info"},[t.topicContent.author&&t.topicContent.author.loginname?s("router-link",{staticClass:"user",attrs:{to:{name:"UserInfo",params:{loginname:t.topicContent.author&&t.topicContent.author.loginname}}}},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:t.topicContent.author&&t.topicContent.author.avatar_url}})]),t._v(" "),s("span",[t._v(t._s(t.topicContent.author&&t.topicContent.author.loginname))])]):t._e(),t._v(" "),s("span",[t._v(t._s(t._f("dateFormat")(t.topicContent.create_at)))]),t._v(" "),s("span",[t._v(t._s(t.types[t.topicContent.tab]))]),t._v(" "),s("span",[t._v(t._s(t.topicContent.reply_count+"/"+t.topicContent.visit_count))])],1),t._v(" "),s("div",{staticClass:"operation"},[s("i",{staticClass:"iconfont icon-comment",on:{click:t.focusComment}}),t._v(" "),s("i",{staticClass:"iconfont",class:{"icon-collect-active":t.topicContent.is_collect,"icon-collect":!t.topicContent.is_collect},on:{click:t.toggleCollect}})])]),t._v(" "),s("div",{domProps:{innerHTML:t._s(t.topicContent.content)}})]),t._v(" "),s("div",{staticClass:"reply-block"},[s("span",{staticClass:"count"},[t._v(t._s(t.topicContent.reply_count)+"条回复")]),t._v(" "),s("ul",t._l(t.topicContent.replies,function(e,o){return s("li",{staticClass:"reply-cell"},[s("div",{staticClass:"info-wrapper reply"},[s("div",{staticClass:"info"},[e.author.loginname?s("router-link",{staticClass:"user",attrs:{to:{name:"UserInfo",params:{loginname:e.author.loginname}}}},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:e.author.avatar_url}})]),t._v(" "),s("span",[t._v(t._s(e.author.loginname))])]):t._e(),t._v(" "),s("span",[t._v(t._s(t._f("dateFormat")(e.create_at)))]),t._v(" "),s("span",[t._v(t._s(o+1)+"楼")])],1),t._v(" "),s("div",{staticClass:"operation"},[s("i",{staticClass:"iconfont icon-reply",on:{click:function(e){t.toggleReply(o)}}}),t._v(" "),s("i",{staticClass:"iconfont",class:{"icon-up-active":e.is_uped,"icon-up":!e.is_uped},on:{click:function(s){t.toggleUp(e)}}}),t._v(" "),s("span",[t._v(t._s(e.ups.length))])])]),t._v(" "),s("div",{domProps:{innerHTML:t._s(e.content)}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.currentReplyIndex===o,expression:"currentReplyIndex === index"}],staticClass:"input-block reply"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.replyContent,expression:"replyContent"}],ref:"reply",refInFor:!0,attrs:{type:"text",placeholder:"请输入回复..."},domProps:{value:t.replyContent},on:{input:function(e){e.target.composing||(t.replyContent=e.target.value)}}}),t._v(" "),s("div",{staticClass:"operation"},[s("mt-button",{attrs:{type:"primary",size:"small"},on:{click:function(s){t.commentOrReply(e)}}},[t._v("回复")]),t._v(" "),s("mt-button",{attrs:{size:"small"},on:{click:function(e){t.toggleReply(-1)}}},[t._v("取消")])],1)])])}))]),t._v(" "),s("div",{staticClass:"input-block comment"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.commentContent,expression:"commentContent"}],ref:"comment",attrs:{placeholder:"请输入评论..."},domProps:{value:t.commentContent},on:{input:function(e){e.target.composing||(t.commentContent=e.target.value)}}}),t._v(" "),s("div",{staticClass:"operation"},[s("mt-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.commentOrReply("")}}},[t._v("评论")])],1)]),t._v(" "),t.isShowGoTop?s("div",{staticClass:"go-top",on:{click:function(e){t.goTop()}}},[t._v("返回顶部")]):t._e()])},staticRenderFns:[]};var V=s("VU/8")(R,P,!1,function(t){s("qgJv")},"data-v-73dfac83",null).exports,E={name:"UserInfo",data:function(){return{loginname:this.$route.params.loginname,userInfo:{}}},created:function(){this.getUserInfo()},beforeRouteUpdate:function(t,e,s){s(),this.loginname=this.$route.params.loginname,this.getUserInfo()},methods:i()({},Object(a.b)(["toggleBack"]),{getUserInfo:function(){var t=this;this.toggleBack({isShowBack:!0}),this.$indicator.open({spinnerType:"double-bounce"}),this.$axios.get("https://cnodejs.org/api/v1/user/"+this.loginname).then(function(e){t.$indicator.close(),t.userInfo=e.data.data}).catch(function(e){t.$indicator.close(),e.response?t.$toast(e.response.data.error_msg):t.$toast("请求失败 "+e)})}})},H={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"user-info"},[s("div",{staticClass:"cell user"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:t.userInfo.avatar_url}})]),t._v(" "),s("div",{staticClass:"info"},[s("span",[t._v("用户名："+t._s(t.userInfo.loginname))]),t._v(" "),s("span",[t._v("GitHub："),s("a",{attrs:{href:"https://github.com/"+t.userInfo.githubUsername,target:"_blank"}},[t._v(t._s(t.userInfo.githubUsername))])]),t._v(" "),s("span",[t._v("积分："+t._s(t.userInfo.score))]),t._v(" "),s("span",[t._v("注册于"+t._s(t.userInfo.create_at&&t.userInfo.create_at.substr(0,10)))])])]),t._v(" "),s("div",{staticClass:"cell topic"},[s("span",{staticClass:"title"},[t._v("最近创建的话题：")]),t._v(" "),s("ul",t._l(t.userInfo.recent_topics,function(e,o){return s("li",[s("router-link",{attrs:{to:{name:"TopicContent",params:{id:e.id}}}},[t._v(t._s(e.title))])],1)}))]),t._v(" "),s("div",{staticClass:"cell reply"},[s("span",{staticClass:"title"},[t._v("最近参与的话题：")]),t._v(" "),s("ul",t._l(t.userInfo.recent_replies,function(e,o){return s("li",[s("router-link",{attrs:{to:{name:"TopicContent",params:{id:e.id}}}},[t._v(t._s(e.title))])],1)}))])])},staticRenderFns:[]};var q=s("VU/8")(E,H,!1,function(t){s("pRS3")},"data-v-5ab422e8",null).exports;o.default.use($.a);var A=new $.a({routes:[{path:"/",component:M,children:[{path:"",name:"TopicList",component:F},{path:"topicContent/:id",name:"TopicContent",component:V}]},{path:"/userInfo/:loginname",name:"UserInfo",component:q}]});o.default.use(a.a);var G=new a.a.Store({state:{accessToken:localStorage.accessToken||"",userInfo:localStorage.accessToken&&JSON.parse(localStorage.userInfo)||{avatar_url:"",id:"",loginname:"",success:!1},types:{all:"全部",good:"精华",share:"分享",ask:"问答",job:"招聘",dev:"测试"},activeTab:"all",topics:[],page:1,msgNum:0,isShowNewTopic:!1,isShowUserLogin:!1,isShowUserCollection:!1,isShowMsgCenter:!1,isShowSideBar:!1,isShowBack:!1,isShowGoTop:!1},mutations:{updateAccessToken:function(t,e){t.accessToken=e.accessToken},updateUserInfo:function(t,e){t.userInfo=e.userInfo},setTopics:function(t,e){t.topics=e.topics},setTab:function(t,e){t.activeTab=e.activeTab,t.page=e.page,t.topics=e.topics},setPage:function(t,e){t.page++},setMsgNum:function(t,e){e?t.msgNum=e.msgNum:t.msgNum--},toggleNewTopic:function(t,e){t.isShowNewTopic=e.isShowNewTopic},toggleUserLogin:function(t,e){t.isShowUserLogin=e.isShowUserLogin},toggleUserCollection:function(t,e){t.isShowUserCollection=e.isShowUserCollection},toggleMsgCenter:function(t,e){t.isShowMsgCenter=e.isShowMsgCenter},toggleSideBar:function(t,e){t.isShowSideBar=e.isShowSideBar},toggleBack:function(t,e){t.isShowBack=e.isShowBack}}}),W=s("Au9i"),X=s.n(W),J=(s("d8/S"),s("mtWM")),D=s.n(J),K=s("PJh5"),Q=s.n(K);o.default.use(X.a),o.default.prototype.$axios=D.a,o.default.prototype.$moment=Q.a,o.default.filter("dateFormat",function(t){return t?Q()(t).fromNow().replace(/\s/g,"").replace(/\ban?/,"1").replace("fewseconds","分钟").replace(/minutes?/,"分钟").replace(/hours?/,"小时").replace(/days?/,"天").replace(/months?/,"个月").replace(/years?/,"年").replace("ago","前"):""}),o.default.config.productionTip=!1,new o.default({el:"#app",router:A,store:G,components:{App:N},template:"<App/>"})},UkVt:function(t,e){},aNr0:function(t,e){},axO8:function(t,e){},"d8/S":function(t,e){},fWgF:function(t,e){},orIP:function(t,e){},pRS3:function(t,e){},qgJv:function(t,e){},sb1I:function(t,e){},uslO:function(t,e,s){var o={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function n(t){return s(i(t))}function i(t){var e=o[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}n.keys=function(){return Object.keys(o)},n.resolve=i,t.exports=n,n.id="uslO"},xOAs:function(t,e){},xQm5:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.6832d2b0d6f2e52d097c.js.map