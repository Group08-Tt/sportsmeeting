<template name="basics">
	<view class="content">
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">首页</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-blue cur':''" @tap="tabSelect" :data-id="0">赛程</view>
			<view class="cu-item" :class="1==TabCur?'text-blue cur':''" @tap="tabSelect" :data-id="1">完赛</view>
		</scroll-view>
		<view v-show="TabCur == 1">
			<view style="height: calc(85vh);width: 100%;">
				<zb-table :columns="finishgamep" :stripe="true"  :data="data"></zb-table>
			</view>
		</view>

		<view v-show="TabCur == 0">
			<general-showone information="小常识"></general-showone>
			<view class="cs_herder">
				<view class="cs_body" @tap="oncomment" :data-id="item.id"  v-for="(item,index) in minchaodatalist" >
					<view class="cs_left">
						<view class="cs_nei">{{item.body}}</view>
						<view class="cs_time">{{item.time}}</view>
					</view>
					<view class="cs_right">
						<image :src="item.imagesrc"></image>
					</view>
				</view>
			</view>
			<general-showone information="赛事"></general-showone>
			<view style="height: 500px;width: 100%;">
				<zb-table :columns="column1" :stripe="true" :data="Competitionthing"></zb-table>
			</view>
		</view>
	</view>
</template>

<script>
	import {REQUEST_API} from '@/commen/serve/env.js';
	
	export default {
		data() {
			return {
				httpconfig:"",
				TabCur: 0,
				scrollLeft: 0,
				finishgamep: [{
						name: 'endtime',
						label: '时间',
						width: 150,
						sorter: true,
						align: 'center'
					},
					{
						name: 'projectname',
						label: '项目名称',
						width: 100,
						align: 'center'
					},
					{
						name: 'competition',
						label: '赛事',
						align: 'center'
					},
					{
						name: 'firstone',
						label: '第一名',
						align: 'center'
					},
					{
						name: 'firsttwo',
						label: '第二名',
						align: 'center'
					},
					{
						name: 'firstthree',
						label: '第三名',
						align: 'center'
					},
				],
				column1: [{
						name: 'begintime',
						label: '时间',
						width: 150,
						sorter: true,
						align: 'center'
					},
					{
						name: 'start',
						label: '状态',
						width: 80,
						filters: {
							3: '已结束',
							1: '进行中',
							2: '未开始'
						},
						align: 'center'
					},
					{
						name: 'projectname',
						label: '项目名称',
						align: 'center'
					},
					{
						name: 'competition',
						label: '赛事',
						align: 'center',
					},
				],
				data: [], //完赛
				Competitionthing:[],//赛事
				minchaodatalist:[],
			}
		},
		created() {
			this.httpconfig = REQUEST_API;
			this.accomplishlsit();
			this.minchang();
			this.getCompetitionthingfun();
		},
		methods: {
			
			//赛事的信息
			getCompetitionthingfun(){
				var that = this;
				this.$http.request({
					url: this.$api.tabberdata.saishiapi,
					showLoading: true
				}).then((res) => {
					if (res.start == 1) { //获取成功
						that.Competitionthing = res.data;
					}
				})
			},
			
			//小常识
			minchang(){
				var that = this;
				this.$http.request({
					url: this.$api.tabberdata.selectminknowledgeapi,
					showLoading: true
				}).then((res) => {
					if (res.start == 1) { //获取成功
						that.minchaodatalist = res.data;
					}
				})
			},
			
			
			
			//完赛的信息
			accomplishlsit(){
				var that = this;
				this.$http.request({
					url: this.$api.tabberdata.accomplishlsitapi,
					showLoading: true
				}).then((res) => {
					if (res.start == 1) { //获取成功
						that.data = res.data;
					}
				})
			},
			//去小常识
			oncomment(e) {
				let id = e.currentTarget.dataset.id;
				this.$http.uni_navigateTo("/pages/basics/well/serch?id=" + id);
			},
			// 切换nav
			tabSelect(e) {
				let id = e.currentTarget.dataset.id
				this.TabCur = id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			},
		}
	}
</script>


<style lang="scss" scoped>
	.content {
		height: calc(90vh);
		background-color: #FFFFFF;
	}

	.cs_herder {
		width: 94%;
		height: auto;
		// border: 1px solid #FF9700;
		margin-left: 3%;

		.cs_body {
			width: 100%;
			padding-left: 3%;
			padding-top: 20rpx;
			height: 200rpx;
			margin-top: 20rpx;
			// border: 1px solid #FF9700;
			box-shadow: 1rpx 1rpx 20rpx 5rpx #bcbcbc;
			border-radius: 20rpx;
			display: flex;

			.cs_left {
				width: 70%;
				height: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-top: -16rpx;

				// border: 1px solid #ff0066;
				.cs_nei {
					width: 100%;
					display: -webkit-box; // 使其变为伸缩盒
					-webkit-line-clamp: 3; // 设置其要显示的行数
					-webkit-box-orient: vertical; // 规定子元素的排列方式
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.cs_right {
				width: 160rpx;
				height: 160rpx;
				// border: 1px solid #ff0066;
				border-radius: 18rpx;

				image {
					width: 160rpx;
					height: 160rpx;
					border-radius: 18rpx;
				}
			}
		}
	}
</style>
