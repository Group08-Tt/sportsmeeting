(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/load-refresh/load-refresh"],{252:function(t,e,n){"use strict";n.r(e);var r=n(253),i=n(255);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n(257);var s,a=n(11),u=Object(a["default"])(i["default"],r["render"],r["staticRenderFns"],!1,null,"2cb7ba04",null,!1,r["components"],s);u.options.__file="components/load-refresh/load-refresh.vue",e["default"]=u.exports},253:function(t,e,n){"use strict";n.r(e);var r=n(254);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},254:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return s})),n.d(e,"recyclableRender",(function(){return o})),n.d(e,"components",(function(){return r}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=!1,s=[];i._withStripped=!0},255:function(t,e,n){"use strict";n.r(e);var r=n(256),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},256:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"loadRefresh",props:{isRefresh:{type:Boolean,default:!0},refreshType:{type:String,default:"hollowDots"},fixedHeight:{type:String,default:"0"},heightReduce:{type:String,default:"0"},color:{type:String,default:"#04C4C4"},backgroundCover:{type:String,default:"white"},currentPage:{type:Number,default:0},totalPages:{type:Number,default:0}},data:function(){return{startY:0,moveY:0,updating:!1,updateType:!0,moving:!1,scrollTop:-1,coverTransform:"translateY(0px)",coverTransition:"0s",playState:!1}},computed:{getHeight:function(){if(Number(this.fixedHeight))return"height: ".concat(this.fixedHeight,"rpx;");var e=t.getSystemInfoSync().windowHeight-t.upx2px(0+this.heightReduce);return"height: ".concat(e,"px;")},loadText:function(){var t=this.currentPage,e=this.totalPages,n=this.updating,r=this.updateType;return!r&&n?"客观别急马上来...":t<e?"上拉加载更多":"已经到底啦~"}},methods:{loadMore:function(){var t=this.currentPage,e=this.totalPages;!this.updating&&t<e&&(this.updating=!0,this.updateType=!1,this.$emit("loadMore"))},coverTouchstart:function(t){this.isRefresh&&(this.coverTransition="transform .1s linear",this.startY=t.touches[0].clientY)},coverTouchmove:function(t){if(this.isRefresh&&!this.updating){this.moveY=t.touches[0].clientY;var e=this.moveY-this.startY;e<=50&&(this.coverTransform="translateY(".concat(e,"px)")),this.moving=e>=50}},coverTouchend:function(){this.isRefresh&&!this.updating&&(this.moving?this.runRefresh():(this.coverTransition="transform 0.3s cubic-bezier(.21,1.93,.53,.64)",this.coverTransform="translateY(0px)"))},runRefresh:function(){this.scrollTop=0,this.coverTransition="transform .1s linear",this.coverTransform="translateY(50px)",this.playState=!0,this.updating=!0,this.updateType=!0,this.$emit("refresh")},completed:function(){var t=this;this.updateType&&(this.moving=!1,this.scrollTop=-1,this.coverTransition="transform 0.3s cubic-bezier(.21,1.93,.53,.64)",this.coverTransform="translateY(0px)",setTimeout((function(){t.playState=!1}),300)),this.updating=!1}}};e.default=n}).call(this,n(1)["default"])},257:function(t,e,n){"use strict";n.r(e);var r=n(258),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},258:function(t,e,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/load-refresh/load-refresh.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/load-refresh/load-refresh-create-component',
    {
        'components/load-refresh/load-refresh-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(252))
        })
    },
    [['components/load-refresh/load-refresh-create-component']]
]);