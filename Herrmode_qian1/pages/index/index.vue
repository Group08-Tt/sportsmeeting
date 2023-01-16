<template>
	<view>
		<basics v-if="PageCur=='basics'" ref="child"></basics>
		<components v-if="PageCur=='component'" ref="conref1"></components>
		<!-- <plugin v-if="PageCur=='plugin'"></plugin> -->
		<datalistt v-if="PageCur=='dataliastt'"></datalistt>
		<my v-if="PageCur=='personal'"></my>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">主页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">排名榜</view>
			</view>
			<!-- 		<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">视频</view>
			</view> -->

			<view class="action" @click="NavChange" data-cur="dataliastt">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/dataliastt' + [PageCur == 'dataliastt'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='dataliastt'?'text-green':'text-gray'">数据</view>
			</view>

			<view class="action" @click="NavChange" data-cur="personal">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/personal' + [PageCur == 'personal'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='personal'?'text-green':'text-gray'">个人中心</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				PageCur: 'basics',
			}
		},
		onShow() {

		},
		onLoad(e) {
			//这里可以验证自动登录的状态
			//如果有设置的时间，获取其他情况的话这里是可以直接让他去登录的，每个验证都是如此，
			// 但是每个接口都会去验证对应的数据的
			// let token =  this.$http.getToken();
			// if(!token){
			// 	this.$http.uni_redirectTo("/pages/login/login")
			// 	return
			// }
			// this.$http.request({
			// 	url:this.$api.account_login_register_find.Email_login_voluntarily,
			// }).then(res=>{
			// 	if(res.start === 1){ //说明自动登录成功了
			// 		let userinfo = res.userinfo;
			// 		app.globalData.userinfo = userinfo
			// 		return
			// 	}
			// 	this.$http.uni_redirectTo("/pages/login/login")
			// })
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>
	.text-gray,
	.line-gray,
	.lines-gray {
		color: #aaaaaa;
	}

	.text-green,
	.line-green,
	.lines-green {
		color: #00FF66;
	}

	.cu-bar.tabbar .action [class*="cuIcon-"] {
		width: 100upx;
		position: relative;
		display: block;
		height: auto;
		margin: 0 auto 10upx;
		text-align: center;
		font-size: 40upx;
	}

	.cu-bar.tabbar button.action::after {
		border: 0;
	}

	.cu-bar.tabbar .action .cuIcon-cu-image {
		margin: 0 auto;
	}

	.cu-bar.tabbar .action .cuIcon-cu-image image {
		width: 50upx;
		height: 50upx;
		display: inline-block;
	}

	.cu-bar.tabbar .action {
		font-size: 22upx;
		position: relative;
		flex: 1;
		text-align: center;
		padding: 0;
		display: block;
		height: auto;
		line-height: 1;
		margin: 0;
		background-color: inherit;
		overflow: initial;
	}

	.cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}

	.cu-bar.tabbar {
		padding: 0;
		height: calc(100upx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	}

	.bg-white {
		background-color: #ffffff;
		color: #666666;
	}

	.cu-bar.foot {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 -1upx 6upx rgba(0, 0, 0, 0.1);
	}

	.shadow[class*="-red"] {
		box-shadow: 6upx 6upx 8upx rgba(204, 69, 59, 0.2);
	}

	.shadow[class*="-orange"] {
		box-shadow: 6upx 6upx 8upx rgba(217, 109, 26, 0.2);
	}

	.shadow[class*="-yellow"] {
		box-shadow: 6upx 6upx 8upx rgba(224, 170, 7, 0.2);
	}

	.shadow[class*="-olive"] {
		box-shadow: 6upx 6upx 8upx rgba(124, 173, 55, 0.2);
	}

	.shadow[class*="-green"] {
		box-shadow: 6upx 6upx 8upx rgba(48, 156, 63, 0.2);
	}

	.shadow[class*="-cyan"] {
		box-shadow: 6upx 6upx 8upx rgba(28, 187, 180, 0.2);
	}

	.shadow[class*="-blue"] {
		box-shadow: 6upx 6upx 8upx rgba(0, 102, 204, 0.2);
	}

	.shadow[class*="-purple"] {
		box-shadow: 6upx 6upx 8upx rgba(88, 48, 156, 0.2);
	}

	.shadow[class*="-mauve"] {
		box-shadow: 6upx 6upx 8upx rgba(133, 33, 150, 0.2);
	}

	.shadow[class*="-pink"] {
		box-shadow: 6upx 6upx 8upx rgba(199, 50, 134, 0.2);
	}

	.shadow[class*="-brown"] {
		box-shadow: 6upx 6upx 8upx rgba(140, 88, 53, 0.2);
	}

	.shadow[class*="-grey"] {
		box-shadow: 6upx 6upx 8upx rgba(114, 130, 138, 0.2);
	}

	.shadow[class*="-gray"] {
		box-shadow: 6upx 6upx 8upx rgba(114, 130, 138, 0.2);
	}

	.shadow[class*="-black"] {
		box-shadow: 6upx 6upx 8upx rgba(26, 26, 26, 0.2);
	}

	.shadow[class*="-white"] {
		box-shadow: 6upx 6upx 8upx rgba(26, 26, 26, 0.2);
	}
</style>
