<template>
	<view class="login-root">
		<view>
			<view class="avatar">
				<image class="avatar-img"
					src="https://jx.shuzixiangdao.com/web//uploads/images/original/20210820/%E5%A4%B4%E5%83%8F-1629426033489.png"
					mode=""></image>
			</view>
			<view class="login-content">
				<view class="common">
					<view class="iconCss"></view>
					<input class="com-inp" type="text" v-model="dataForm.mobile" placeholder="请输入您的邮箱" />
				</view>
				<view class="common code">
					<view class="code-left">
						<view class="iconCss iconfont icon-yanzhengma"></view>
						<input class="com-inp" type="number" v-model="dataForm.captcha" placeholder="验证码" />
					</view>
					<view v-if="!countDown" class="code-right" @tap="getCode">
						获取验证码
					</view>
					<view v-else class="code-right">
						{{countDown}}
					</view>
				</view>
				<view class="common" v-if="is_invite_register == 1">
					<view class="iconCss iconfont icon-shouji"></view>
					<input class="com-inp" type="number" v-model="dataForm.invite_mobile" placeholder="请输入推荐人的手机号" />
				</view>
				<view class="common">
					<view class="iconCss iconfont icon-mima"></view>
					<input class="com-inp" type="password" v-model="dataForm.password" placeholder="请输入您的密码" />
				</view>
				<view class="common">
					<view class="iconCss iconfont icon-mima"></view>
					<input class="com-inp" type="password" v-model="dataForm.confirm_password" placeholder="请再次确认密码" />
				</view>
				<view class="common login-btn" @tap="submit">
					立即修改
				</view>
				<view class="otherSelect">
					<view class="agreement-box" @tap="cutover"> 
						<view class="agreement-btn" v-if="!isShow"></view>
						<view class="agreement-btn2"  v-else></view>
						阅读并同意 <text class="agreement" @tap.stop="goAgreement">《用户协议》</text>
					</view>
					<view @tap="goLogin">我知道密码了</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {checkEmail,isequality} from '@/commen/js/util.js'
	export default {
		onLoad() {
			
		},
		data() {
			return {
				img_url: this.$api.img_url,
				textColor: '#ff0066',
				logo_img: '',
				dataForm: {
					mobile: '', //手机号
					password: '', //密码
					confirm_password: '', //确认密码
					captcha: '', //手机验证码
					invite_mobile: '', // 推荐人手机号
				},
				isShow: false,
				countDown: '',
				is_invite_register: 0,
			}
		},
		methods: {
			goRes() {
				uni.navigateTo({
					url: '/pages/public/registered'
				})
			},
			goLogin() {
				// #ifdef APP-PLUS
				uni.redirectTo({
					url: '/pages/login/login'
				})
				// #endif

				// #ifndef APP-PLUS
				uni.navigateTo({
					url: '/pages/login/login'
				})
				// #endif
			},
			submit() {
				let dataForm = this.dataForm //对应的数据
				let  isokquery =  isequality(dataForm.password,dataForm.confirm_password); //判断两个值是否相等
				let ischeckEmail = checkEmail(dataForm.mobile);
				if(!isokquery || !ischeckEmail || !this.isShow){
					if(!ischeckEmail){ //意思是邮箱错误
						this.showMsg("邮箱错误")
						return
					}else if (!isokquery){ //不能为空
					this.showMsg("两次密码不符合")
						return
					}else if(!this.isShow){
						this.showMsg("请同意用户协议")
						return
					}
				}
				//下面验证信息 ：  两次密码验证、
				this.$http.request({
					url:this.$api.account_login_register_find.Email_find,
					data:{
						mail:dataForm.mobile, //用户的邮箱
						password:dataForm.password, //用户的密码
						code:dataForm.captcha, //用户输入的验证码
					},
					method: 'POST'
				}).then(res=>{
					console.log(res)
					if(res.start === 1){ //说明修改成功了
						this.$http.toast(res.msg);
						this.$http.uni_redirectTo("/pages/login/login");
					}else if(res.start === 0){ //说明验证码错误
						this.$http.toast(res.msg);
					}
				})
			},
			getCode() {
				if (!checkEmail(this.dataForm.mobile)) {
					this.showMsg('邮箱格式错误！');
					return;
				}
				let _self = this;
				_self.countDown = 60;
				let temp = setInterval(() => {
					_self.countDown--
					if (_self.countDown <= 0) {
						clearInterval(temp);
					}
				}, 1000)

				this.$http.request({
					url: this.$api.account_login_register_find.Email_find_emverrigin,
					data: {
						mail: this.dataForm.mobile
					},
					showLoading:false,
					method: 'POST'
				}).then((res) => {
					this.$http.toast(res.msg);
				}).catch(err => {
					console.log(err);
				})
			},
			goAgreement() {
				/* this.$http.toast('跳转用户协议'); */
				uni.navigateTo({
					url: '/pages/user/privacyPolicy'
				})
			},
			cutover() {
				this.isShow = !this.isShow;
			},
			showMsg(msg) {
				uni.showToast({
					icon: 'none',
					title: msg
				})
			},
		}
	}
</script>

<style scoped>
	page {
		background: #FFFFFF !important;
	}

	.avatar {
		text-align: center;
		padding: 10rpx 0 57rpx;
	}

	.avatar-img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.login-content {
		padding: 0 30rpx 100rpx;
		box-sizing: border-box;
	}

	.common {
		height: 90rpx;
		border: 2rpx solid #F3F3F3;
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
		flex: 1;
	}

	.login-btn {
		background: #BC0100;
		border: 0;
		color: #FFFFFF;
		justify-content: center;
		font-size: 10pt;
		letter-spacing: 4rpx;
		margin-bottom: 28rpx;
	}

	.otherSelect {
		display: flex;
		justify-content: space-between;
		font-size: 9pt;
		color: #8A8A8A;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.agreement {
		color: #BC0100;
	}

	.code {
		justify-content: space-between;
	}

	.code-left {
		display: flex;
		align-items: center;
	}

	.code-right {
		/* font-size: 10pt; */
		font-size: 26rpx;
		color: #8A8A8A;
		letter-spacing: 2rpx;
		width: 220rpx;
		text-align: right;
	}

	.agreement-box {
		display: flex;
		align-items: center;
	}

	.agreement-btn {
		border: 2rpx solid #8A8A8A;
		width: 32rpx;
		height: 32rpx;
		border-radius: 50%;
		margin-right: 16rpx;
		position: relative;
	}

	.agreement-btn2 {
		width: 32rpx;
		height: 32rpx;
		line-height: 32rpx;
		font-size: 32rpx;
		margin-right: 16rpx;
		position: relative;
		border-radius: 50%;
		background-color: #007AFF;
		border: 2rpx solid #007AFF;
	}

	.agreement-icon {
		position: absolute;
		top: 14rpx;
		left: -2rpx;
		line-height: 0;
		color: #BC0100;
	}

	.show {
		display: block;
	}

	.hide {
		display: none;
	}
</style>
