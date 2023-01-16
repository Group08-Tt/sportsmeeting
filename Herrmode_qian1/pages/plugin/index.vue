<template name="plugin">
	<view class="content">
		<cu-custom bgColor="bg-gradual-pink" :isBack="false"><block slot="backText">返回</block><block slot="content">视频</block></cu-custom>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
			
		},
		methods: {
			
		}
	}
</script>

 
<style lang="scss" scoped>
	page
	.content {
		height: calc(90vh);
		background-color: #FFFFFF;
	}
	.content {
		padding-top: 80rpx;
		display: flex;
	}
</style>
