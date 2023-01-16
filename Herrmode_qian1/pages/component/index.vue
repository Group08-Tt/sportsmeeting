<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">排名榜</block>
		</cu-custom>
		<view class="ph_herder">
			<view :class="navid == item.id?'ph_huan': 'ph_body'" v-for="(item,index) in navtaber" @tap="navtitle"
				:data-id="item.id">
				<text style="line-height: 250rpx;">{{item.name}}</text>
			</view>
		</view>
		<view style="height: 500px;width: 100%;">
			<zb-table :columns="column1" :stripe="true" :data="data"></zb-table>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				query: {
					projectcategory: 1,
					gamegender: 1,
				},
				navid: 1,
				navtaber: [{
					id: 1,
					name: "男子个人项目",
					projectcategory: 1,
					gamegender: 1,
				}, {
					id: 2,
					name: "女子个人项目",
					projectcategory: 1,
					gamegender: 2,
				},{
					id: 3,
					name: "男子集体项目",
					projectcategory: 2,
					gamegender: 1,
				}, {
					id: 4,
					name: "女子集体项目",
					projectcategory: 2,
					gamegender: 2,
				}],
				column1: [{
						name: 'projectname',
						label: '项目名字',
						align: 'center'
					},
					{
						name: 'firstone',
						label: '第一名',
						width: 80,
						align: 'center',
					},
					{
						name: 'firsttwo',
						label: '第二名',
						align: 'center'
					}, {
						name: 'firstthree',
						label: '第三名',
						align: 'center'
					}, {
						name: 'competition',
						label: '赛事',
						align: 'center'
					},
				],
				data: []
			}
		},

		created() {
			this.getdatapai()
		},
		methods: {
			/**
			 * 请求数据
			 * */
			getdatapai() {
				var that = this;
				this.$http.request({
					url: this.$api.tabberdata.getdatapai,
					showLoading: true,
					data: this.query,
				}).then((res) => {
					if (res.start == 1) { //获取成功
					that.data = res.data
					}
				})
			},
			/**
			 * 切换导航
			 * */
			navtitle(e) {
				this.data = []
				let id = e.currentTarget.dataset.id;
				this.navid = id;
				this.query.gamegender = this.navtaber[id - 1].gamegender;
				this.query.projectcategory = this.navtaber[id - 1].projectcategory;
				this.getdatapai();
			},
		}
	}
</script>

<style lang="scss" scoped>
	page .content {
		height: calc(90vh);
		background-color: #FFFFFF;
	}

	.ph_huan {
		width: 45%;
		height: 260rpx;
		// border: 1px solid #ff0066;
		text-align: center;
		color: #e1e1e1;
		box-shadow: 1rpx 1rpx 10rpx 6rpx #c5c5c5;
		border-radius: 20rpx;
		font-weight: 800;
		background-color: #007AFF;
	}

	.ph_herder {
		width: 94%;
		height: 570rpx;
		margin-top: 20rpx;
		margin-left: 3%;
		// border: 1px solid #ff0066;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-top: 10rpx;

		.ph_body {
			width: 45%;
			height: 260rpx;
			// border: 1px solid #ff0066;
			text-align: center;
			color: #555555;
			box-shadow: 1rpx 1rpx 10rpx 6rpx #c5c5c5;
			border-radius: 20rpx;
			font-weight: 800;

		}
	}
</style>



<!-- <template name="component">
	<view class="centent">
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">册数</block>
		</cu-custom>
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


<style lang="scss">
</style> -->
