<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">修改密码</block>
		</cu-custom>
		<view class="cu-form-group" style="margin-left: 30rpx;">
			<view class="title">密码:</view>
			<input type="password" v-model="onepassword" placeholder="请输入密码" name="input"></input>
		</view>

		<view class="cu-form-group" style="margin-left: 30rpx;">
			<view class="title">再次输入密码:</view>
			<input type="password" v-model="twopassword" placeholder="请再一次输入密码" name="input"></input>
		</view>
		<!-- <button class="cu-btn block bg-blue margin-tb-sm lg"><text class="cuIcon-loading2 cuIconfont-spin"></text> 加载</button> -->
		<button @tap="setpassword" class="cu-btn block bg-blue margin-tb-sm lg"
			style="width: 80%;margin-left: 10%;">更改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: "",
				onepassword: "",
				twopassword: "",
			}
		},
		onLoad(e) {
			let token = e.token;
			this.token = token;
		},
		methods: {
			setpassword() {
				if (this.onepassword == "" || this.twopassword == "") {
					this.$http.toast("输入信息不能为空");
					return;
				}

				if (this.onepassword != this.twopassword) {
					this.$http.toast("两次密码不相同");
					return;
				}


				var that = this;
				this.$http.request({
					url: this.$api.tabberdata.modificationpassword,
					showLoading: true,
					method:"POST",
					data: {
						token: that.token,
						password: that.onepassword
					}
				}).then((res) => {
					that.onepassword = "";
					that.twopassword = "" ;
					if(res.start == 1){ //更新成功
						this.$http.toast(res.msg);
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							});
						},2000)
					}else{
						this.$http.toast("修改失败");
					}
					
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	page .content {
		height: calc(90vh);
		background-color: #FFFFFF;
	}
</style>
