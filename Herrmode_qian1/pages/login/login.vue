<template>
	<view class="login-root">
		<view v-if="!is_weixn">
			<view class="avatar">
				<image class="avatar-img" :src="logo_img" mode="" v-if="logo_img"></image>
				<image class="avatar-img"
					src="https://jx.shuzixiangdao.com/web//uploads/images/original/20210820/%E5%A4%B4%E5%83%8F-1629426033489.png"
					mode="" v-else></image>
			</view>
			<block v-if="tabs_index == 0">
				<view class="login-content">
					<view class="common">
						<view class="iconCss iconfont icon-shouji"></view>
						<input class="com-inp" type="text" v-model="dataForm.username" placeholder="请输入您的邮箱" />
					</view>
				<view class="common code">
					<view class="code-left" style="margin-left: 20rpx;">
						<view class="iconCss iconfont icon-yanzhengma"></view>
						<input class="com-inp" type="number" v-model="dataForm.captcha" placeholder="验证码" />
					</view>
					<view v-if="is_show_code" class="code-right" @tap="getCode">
						获取验证码
					</view>
					<view v-else class="code-right">
						{{countDown}}
					</view>
				</view>
					<view class="common login-btn" @tap="pwdLogin" :style="{ background: textColor }">登录56</view>
					<view class="otherSelect">
						<view @tap="goRes">用户注册</view>
					</view>
				</view>
			</block>
			<block v-if="tabs_index == 1">
				<view class="login-content">
					<view class="common">
						<view class="iconCss iconfont icon-shouji"></view>
						<input class="com-inp" type="text" v-model="dataForm.username" placeholder="请输入您的邮箱" />
					</view>
					<view class="common">
						<view class="iconCss iconfont icon-mima"></view>
						<input class="com-inp" type="password" v-model="dataForm.password" placeholder="请输入账号密码" />
					</view>
<!-- 					<view class="common">
						<view class="iconCss iconfont icon-mima"></view>
						<input class="com-inpcode" type="text" v-model="dataForm.captcha" placeholder="输入验证码" />
						<view class="svghtml" v-html="codeimgsvg" @tap="Email_login_avgverification"></view>
					</view> -->
					<view class="common login-btn" @tap="pwdLogin" :style="{ background: textColor }">登录</view>
					<view class="otherSelect">
						<!-- 勾选用户协议 -->
						<!-- #ifdef APP-PLUS -->
						<!-- 				<view class="agreement-box" style="display: flex; align-items: center" @click="cutover">
							<view class="agreement-btn" style="margin-right: 10rpx">
								<view class="iconfont icon-dagou1 agreement-icon" v-if="isShow"
									:style="{ color: textColor }"></view>
							</view>
							阅读并同意
							<text class="agreement" @click.stop="goAgreement"
								:style="{ color: textColor }">《用户协议》</text>
						</view> -->
						<!-- #endif -->
						<view @tap="goRes">用户注册</view>
						<view @tap="forget">忘记密码</view>
					</view>
				</view>
			</block>

			
		</view>
		<view class="center" v-else>
			<view class="load-container load">
				<div class="loader">登录中~~~</div>
			</view>
			<view class="desc">正在登录中，请稍等~</view>
		</view>
	</view>
</template>

<script>
	import {
		forceLogin
	} from '@/libs/util.js';

	import {
		isWeChat,
		isNullOrEmpty,
		isMobile
	} from '@/libs/util.js';
	import {
		checkEmail
	} from '@/commen/js/util.js'
	export default {
		data() {
			return {
				codeimgsvg: "", //密码登录时候的code
				avgceshi: "", //对应的code的值
				img_url: "",
				dataForm: {
					username: '',
					password: '',
					captcha: '124564',
				},
				is_weixn: false,
				textColor: '',
				is_show_code: true,
				countdown: 60,
				logo_img: '',
				// #ifdef APP-PLUS
				isShow: true,
				// #endif
				tabs_arr: ['验证码登录', '密码登录'],
				tabs_index: 1,
				canIUseGetUserProfile: false,
				codes: '',
				bind_mobile: false,
				login_info: '',
				loginRes: ''
			};
		},
		computed: {
			getMallName() {
				return getApp().globalData.mall_name;
			}
		},
		onLoad() {
			this.Email_login_avgverification()
		},
		onShow() {

		},
		destroyed() {

		},
		methods: {
			login(key) {
				
			},
			
			// 邮箱登录更新验证码
			Email_login_avgverification() {
				this.$http.request({
					url: this.$api.account_login_register_find.Email_login_avgverification,
				}).then(res => {
					this.codeimgsvg = res.imgsvg;
					this.avgceshi = res.code
				})
			},
			ongetapi() {
				console.log(this.$api.account_login_register_find.Email_login)
			},
			//切换导航栏的
			switchTab(index) {
				this.tabs_index = index;
				if (this.tabs_index == 0) {
					this.dataForm.password = '';
				} else {
					this.dataForm.captcha = '';
				}
			},
			//获取对应的验证码
			getCode() {
				var that = this;
				this.is_show_code = false;
				var timer = setInterval(() => {
					that.countdown--;
					if (that.countdown <= 0) {
						that.countdown = 60;
						that.is_show_code = true;
						clearInterval(timer);
					}
				}, 1000)
			},
			forget() {
				uni.navigateTo({
					url: '/pages/login/forgetlogin'
				});
			},
			getUserInfos() { //获取个人信息
				this.$http.request({
					url: this.$api.user.userInfo,
					method: 'POST',
					showLoading: true,
				}).then(res => {
					if (res.code == 0) {
						uni.setStorageSync('userInfo', JSON.stringify(res.data));
					} else {
						uni.removeStorageSync('userInfo');
					}
				});
			},
			//去用户注册
			goRes() {
				// #ifdef APP-PLUS
				uni.redirectTo({
					url: '/pages/login/registered'
				});
				// #endif

				// #ifndef APP-PLUS
				uni.navigateTo({
					url: '/pages/login/registered'
				});
				// #endif
			},

			//密码登录
			login_password() {
				this.$http.request({
					url: this.$api.account_login_register_find.Email_login,
					method: "post",
					data: {
						mail: this.dataForm.username,
						password: this.dataForm.password,
						code: this.dataForm.captcha
					},
				}).then((res) => {
					//提示对应的成功或者错误的信息
					this.$http.toast(res.msg);
					if (res.start == 1) { //说明登录成功
						let userinfo = res.userdata
						let token = userinfo.token
						// 需要存储对应的用户信息和对应的token信息
						this.$http.setToken(token);
						this.$http.setStorage_userinfo(userinfo)
						//跳转对应的首页
						this.$http.uni_reLaunch("/pages/index/index");
					}
				})
			},
			//在app和h5端点击登录
			pwdLogin() {
				if (this.tabs_index == 1) { //密码登录
					let ischeckEmail = checkEmail(this.dataForm.username);
					console.log(ischeckEmail)
					if (!ischeckEmail) {
						this.$http.toast("邮箱格式错误")
						return
					} else if (!this.dataForm.password) {
						this.$http.toast("请输入密码")
						return
					} else if (!this.dataForm.captcha) {
						this.$http.toast("验证码");
						return
					}
					this.login_password();
				} else if (this.tabs_index == 0) { //验证码登录

				}
			},
			cutover() {
				this.isShow = !this.isShow;
			},
			goAgreement() {
				uni.navigateTo({
					url: '/pages/user/privacyPolicy/privacyPolicy'
				})
			},
		}
	};
</script>

<style scoped>
	.flex-y-center {
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: center;
	}

	.wx-box {
		position: relative;
	}

	.wx-login-btn {
		position: relative;
	}

	.wx-login-btn-icon {
		color: #fff;
		font-size: 52rpx;
		position: absolute;
		left: 31%;
		top: 20rpx;
		z-index: 9;
		line-height: 50rpx;
	}

	.jx-info {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 540rpx;
		height: 84rpx;
		line-height: 84rpx;
		font-size: 30rpx;
		letter-spacing: 1px;
		padding-left: 80rpx;
		/* opacity: 0; */
	}

	.login-root {
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}

	page {
		background: #ffffff !important;
	}

	.avatar {
		text-align: center;
		padding: 10rpx 0 20rpx;
	}

	.avatar-img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.login-content {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.fixed {
		position: fixed;
		min-width: 100%;
		display: flex;
		justify-content: center;
	}

	.fixed .iconfont {
		color: #2ba246;
		font-size: 24pt;
		line-height: 100%;
	}

	.common {
		height: 90rpx;
		border: 2rpx solid #f3f3f3;
		border-radius: 45rpx;
		padding: 0rpx 42rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-bottom: 50rpx;
	}

	.iconCss {
		font-size: 16pt;
		color: #797979;
		margin-right: 18rpx;
	}

	.com-inp {
		font-size: 10pt;
		letter-spacing: 2rpx;
		width: 90%;
		flex: 1;
	}

	.com-inpcode {
		font-size: 10pt;
		letter-spacing: 2rpx;
		width: 50%;
		flex: 1;
	}

	.get-code {
		background: #f5f5f5;
		font-size: 26rpx;
		letter-spacing: 1px;
		color: #ffffff;
		padding: 4rpx 20rpx;
		border-radius: 30rpx;
	}

	.get-code2 {
		background: transparent;
		padding: 0;
	}

	.login-btn {
		background: #bc0100;
		border: 0;
		color: #ffffff;
		justify-content: center;
		font-size: 10pt;
		letter-spacing: 4rpx;
		margin-bottom: 28rpx;
	}

	.otherSelect {
		display: flex;
		justify-content: space-between;
		font-size: 9pt;
		color: #8a8a8a;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	/* 微信公众号授权登录 */
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f7f7f7;
		flex-direction: column;
		flex: 1;
	}

	.center .desc {
		color: #7f7f7f;
		font-size: 13pt;
		font-weight: 500;
	}

	.load .loader {
		margin: 4em auto;
		font-size: 20px;
		width: 1em;
		height: 1em;
		border-radius: 50%;
		position: relative;
		text-indent: -9999em;
		-webkit-animation: load 1.1s infinite ease;
		animation: load 1.1s infinite ease;
	}

	@-webkit-keyframes load {

		0%,
		100% {
			box-shadow: 0em -2.6em 0em 0em #f04a4a,
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(247, 182, 182);
		}

		12.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(247, 182, 182),
				1.8em -1.8em 0 0em #f04a4a, 2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		25% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(247, 182, 182), 2.5em 0em 0 0em #f04a4a,
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		37.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(247, 182, 182),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		50% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(247, 182, 182), 0em 2.5em 0 0em #f04a4a,
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		62.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(247, 182, 182), -1.8em 1.8em 0 0em #f04a4a,
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		75% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(247, 182, 182), -2.6em 0em 0 0em #f04a4a,
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		87.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(247, 182, 182), -1.8em -1.8em 0 0em #f04a4a;
		}
	}

	@keyframes load {

		0%,
		100% {
			box-shadow: 0em -2.6em 0em 0em #f04a4a,
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(247, 182, 182);
		}

		12.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(247, 182, 182),
				1.8em -1.8em 0 0em #f04a4a, 2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		25% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(247, 182, 182), 2.5em 0em 0 0em #f04a4a,
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		37.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(247, 182, 182),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		50% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(247, 182, 182), 0em 2.5em 0 0em #f04a4a,
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		62.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(247, 182, 182), -1.8em 1.8em 0 0em #f04a4a,
				-2.6em 0em 0 0em rgba(244, 216, 214),
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		75% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(247, 182, 182), -2.6em 0em 0 0em #f04a4a,
				-1.8em -1.8em 0 0em rgba(244, 216, 214);
		}

		87.5% {
			box-shadow: 0em -2.6em 0em 0em rgba(244, 216, 214),
				1.8em -1.8em 0 0em rgba(244, 216, 214),
				2.5em 0em 0 0em rgba(244, 216, 214),
				1.75em 1.75em 0 0em rgba(244, 216, 214),
				0em 2.5em 0 0em rgba(244, 216, 214),
				-1.8em 1.8em 0 0em rgba(244, 216, 214),
				-2.6em 0em 0 0em rgba(247, 182, 182), -1.8em -1.8em 0 0em #f04a4a;
		}
	}

	.shop-name {
		text-align: center;
		font-size: 36rpx;
		color: #000000;
		letter-spacing: 1px;
	}

	.line {
		background: #dcdcdc;
		height: 1px;
		width: 620rpx;
		margin: 30rpx auto 40rpx;
	}

	.login-tips {
		width: 620rpx;
		margin: auto;
		padding: 0 30rpx;
		color: #000000;
		box-sizing: border-box;
	}

	.login-tips2 {
		padding-left: 20rpx;
		color: #a0a0a0;
		font-size: 28rpx;
		margin: 20rpx 0 50rpx;
	}

	.agreement-btn {
		border: 2rpx solid #8a8a8a;
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
		margin-right: 16rpx;
		position: relative;
	}

	.agreement-icon {
		position: absolute;
		top: 14rpx;
		left: -2rpx;
		line-height: 0;
		color: #bc0100;
	}

	.tabs-box {
		margin: 20rpx 0 50rpx;
	}

	.tabs-item {
		margin-right: 60rpx;
		font-size: 32rpx;
		color: #999999;
	}

	.tabs-item_active {
		color: #333;
		font-size: 36rpx;
		font-weight: 600;
	}

	.tabs-item:last-child {
		margin-right: 0;
	}

	.svghtml {
		width: 200rpx;
		height: 60rpx;
	}
</style>
