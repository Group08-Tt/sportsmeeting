<template>
<view>
	<!-- 下面的定存产品标识 -->
	<view class="tuandui_herder">
		<view class="tuandui_mdoehu">
			<view class="tuandui_biao"></view>
			<view class="tuandui_zi">{{information}}</view>
		</view>
		<slot name="header"></slot>
<!-- 		<view class="delete_tub">
			
		</view> -->
	</view>
</view>
</template>

<script>
	export default {
	  data () {
	    return {
			
	    }
	  },
	  methods:{
	
		  },
		  props: {
		  	information: {
		  		type: String,
		  		default: ''
		  	},
		  },
	  }
</script>

<style>
	.tuandui_herder{
		display: flex;justify-content: space-between;
	}
	
		.tuandui_mdoehu {
			width: 84%;
			margin-left: 3%;
			height: 60rpx;
			display: flex;
			margin-top: 20rpx;
		}
		
		.tuandui_biao {
			width: 4rpx;
			height: 40rpx;
			margin-top: 2rpx;
			background-color: #4a89eb;
			border-radius: 20rpx;
			box-shadow: 1rpx 1rpx 20rpx 1rpx #4a89eb;
		}
		
		.tuandui_zi {
			color: #393939;
			margin-top: 4rpx;
			margin-left: 20rpx;
			font-size: 28rpx;
		}
</style>
