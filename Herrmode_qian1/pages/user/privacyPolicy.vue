<template name="component">
	<!-- 这个页面是对应的用户协议的 -->
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">用户协议</block></cu-custom>
		<view v-html="html_user_agreement"></view>
	</view>
</template>
<script>
	export default {
		data(){
			return{
				html_user_agreement:"", //用户协议的内容
			}
		},
		onLoad() {
			this.$http.request({
				url:this.$api.account_login_register_find.Email_register_agreement, //用户协议
			}).then(res => {
				this.html_user_agreement  = res
				console.log(res)
			}).catch(error => {
				console.log(error)
			})
		},
		methods:{
			
		}
	}
	
</script>

<style>
</style>
