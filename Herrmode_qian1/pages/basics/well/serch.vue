<template>
	<!-- 实现搜索页面信息-->
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{datalist.title}}</block>
		</cu-custom>
		<view class="hearde_min">
			<view class="title_min">{{datalist.body}}</view>
			<image :src="datalist.imagesrc"></image>
		</view>
	</view>
</template>

<script>
	const {
		REQUEST_API
	} = require('@/commen/serve/env.js')
	export default {
		data() {
			return {
				httpurl: "",
				datalist: {}
			}
		},
		onLoad(e) {
			this.httpurl = REQUEST_API;
			this.datalistfun(e.id);
		},
		methods: {
			datalistfun(id) {
				var that = this;
				this.$http.request({
					url: this.$api.tabberdata.getonedata,
					showLoading: true,
					data: {
						id
					}
				}).then((res) => {
					console.log(res)
					if (res.start == 1) {
						that.datalist = res.data
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	.hearde_min {
		width: 98%;
		margin-left: 1%;
		height: 600rpx;
		// border: 1px solid #ff0066;
		margin-top: 12rpx;
		text-align: center;

		.title_min {}

		image {
			width: 500rpx;
			height: 500rpx;
		}
	}
</style>
