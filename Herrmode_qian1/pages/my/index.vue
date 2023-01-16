<template name="datalistt">
	<view class="content">
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">个人中心</block>
		</cu-custom>
		<view class="Idhermode_herder">
			<view class="herderimageavd">
				<image :src=" httpurl +userinfo.avatarUrl"></image>
			</view>
			<view class="allStudentId">
				<view class="StudentId">学号:{{userinfo.studentid}}</view>
				<view class="StudentId">学院:{{userinfo.college}}</view>
			</view>
		</view>
		<view class="menu-list" @tap="qiandao" :data-sign="userinfo.sign">
			<view class="menu-item">
				<view class="menu-left">
					<image class="menu-icon" src="/static/ico/ico_bian.png" ></image>
					<view v-if="userinfo.sign == 0" class="menu-title">签到</view>
					<view v-if="userinfo.sign == 1" class="menu-title">已签到</view>
				</view>
				<view class="menu-right">
					<view class="menu-content">
						<!-- <image style="width: 30rpx;height: 30rpx;" src="../../static/image_ico/ico_right.png"></image> -->
					</view>
				</view>
			</view>
		</view>

		<view class="menu-list" @tap="ontoxiupassword">
			<view class="menu-item">
				<view class="menu-left">
					<image class="menu-icon" src="/static/ico/xiupassword.png"></image>
					<view class="menu-title">修改密码</view>
				</view>
				<view class="menu-right"> 
					<view class="menu-content">
						<image style="width: 30rpx;height: 30rpx;" src="../../static/image_ico/ico_right.png"></image>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	const {REQUEST_API} = require('@/commen/serve/env.js')
	const app = getApp()
	export default {
		data() {
			return {
				userinfo:{},
				httpurl:"",
			}
		},
		created() {
			var that = this;
			this.httpurl = 	REQUEST_API;
			//这里可以验证自动登录的状态
			//如果有设置的时间，获取其他情况的话这里是可以直接让他去登录的，每个验证都是如此，
			// 但是每个接口都会去验证对应的数据的
			let token = this.$http.getToken();
			if (!token) {
				this.$http.uni_redirectTo("/pages/login/login")
				return
			}
			this.$http.request({
				url: this.$api.account_login_register_find.Email_login_voluntarily,
			}).then(res => {
				if (res.start === 1) { //说明自动登录成功了
					let userinfo = res.userinfo;
					//app.globalData.userinfo = userinfo;
					that.userinfo = userinfo
					return
				}
				this.$http.uni_redirectTo("/pages/login/login")
			})
		},
		methods: {
			
			signinfun(local){
				var that = this;
				this.$http.request({
					url: this.$api.tabberdata.signin,
					method:"POST",
					showLoading: true,
					data:{
						token:this.userinfo.token,
						local
					}
				}).then((res) => {
					if (res.start == 1) { //获取成功
					that.userinfo.sign = 1
					}
					uni.showToast({
						title: res.msg,
						duration: 2000,
						icon:"none"
					});
				})
				
			},
			/*点击的是签到的按钮*/
			qiandao(e){
				var that = this;
				let sign = e.currentTarget.dataset.sign;
				if(sign == 0){
					uni.getLocation({
						type: 'wgs84',
						success: function (res) {
							let local = res.latitude + "%2C" + res.longitude;
							that.signinfun(local)
						}
					});
					return ;
				}
				uni.showToast({
					title: '已签到,请勿重复签到',
					duration: 2000,
					icon:"none"
				});
				
			},
			ontoxiupassword(){
				var that = this;
				this.$http.uni_navigateTo("/pages/user/changepassword?token=" + this.userinfo.token)
			}
		}
	}
</script>


<style lang="scss" scoped>
	page .content {
		height: calc(90vh);
		background-color: #e7e7e7;
	}

	.content {
		// padding-top: 80rpx;
		// display: flex;
	}

	.Idhermode_herder {
		width: 94%;
		margin-top: 20rpx;
		background-image: url("http://yqinyuan.top:4010/aver/bgmode.jpg");
		height: 400rpx;
		background-size: 102%;
		margin-left: 3%;
		padding-top: 120rpx;
		border-radius: 20rpx;
		display: flex;
		box-shadow: 1rpx 1rpx 10rpx 1rpx #787878;
		justify-content: space-between;

		.herderimageavd {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			margin-left: 30rpx;

			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
			}
		}

		.allStudentId {
			width: 350rpx;
			height: 120rpx;
			// border: 1px solid #FF9700;
			margin-top: 150rpx;

			.StudentId {
				margin-top: 10rpx;
				color: #3a3a3a;
				font-weight: 600;
			}
		}

	}

	.menu-list {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		flex-direction: column;
		-webkit-box-align: center;
		align-items: center;
		margin-top: 15rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.menu-list,
	.menu-list .menu-item {
		display: flex;
	}

	.menu-list .menu-item {
		-webkit-box-pack: justify;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 10rpx;
		width: 100%;
		font-size: 26rpx;
		margin-top: 15rpx;
	}

	.menu-list .menu-item .menu-left,
	.menu-list .menu-item .menu-right {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		margin: 20rpx 40rpx;
	}

	.menu-list .menu-item .menu-right .menu-content {
		font-size: 24rpx;
		color: #999;
	}

	.menu-list .menu-item .menu-right .arror-right {
		width: 15rpx;
		height: 15rpx;
		border-top: 3rpx solid #a9acb3;
		border-right: 3rpx solid #a9acb3;
		transform: rotate(45deg);
	}

	.menu-list .menu-item .menu-icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 10rpx;
	}

	.quit {
		margin-top: 150rpx;
		position: relative;
		left: 45%;
		font-size: 28rpx;
		color: #fa6868;
	}
</style>
