<template name="datalistt">
	<view class="content">
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">数据</block>
		</cu-custom>
		
		<block v-if="!isnodata">
			<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in navdatare"
					:key="index" @tap="tabSelect" :data-id="index" :data-projectname="item.projectname">
					{{item.projectname}}
				</view>
			</scroll-view>
			<general-showone information="男生"></general-showone>
			<view style="max-height: 300px;width: 100%;">
				<zb-table :columns="column1" :stripe="true" :data="gamegenderone"></zb-table>
			</view>
			<general-showone information="女生"></general-showone>
			<view style="max-height: 300px;width: 100%;">
				<zb-table :columns="column1" :stripe="true" :data="gamegendertwo"></zb-table>
			</view>
		</block>
		
		<block v-if="isnodata">
			<view style="width: 50%;height: 300rpx;margin-left: 25%;  margin-top: 30rpx; text-align: center;">
				<image style="width: 100%; height: 100%;" src="../../static/image_ico/ico_isnull.png"></image>
				<view>无数据</view>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isnodata:false,
				datatabbervalue: "",
				TabCur: 0,
				scrollLeft: 0,
				navdatare: [],
				column1: [{
						name: 'endtime',
						label: '时间',
						width: 150,
						sorter: true,
						align: 'center'
					},
					{
						name: 'firstone',
						label: '第一名',
						width: 80,
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
					}, {
						name: 'competition',
						label: '赛事',
						align: 'center'
					},
				],
				data: [{
					date: '2022-05-02',
					coursestarts: 0,
					coursename: '标签扫',
					coursebudget: '决赛'
				}, {
					date: '2023-05-01',
					coursestarts: 2,
					coursename: '篮球',
					coursebudget: '预决赛'
				}, {
					date: '2022-05-01',
					coursestarts: 1,
					coursename: '标签',
					coursebudget: '决赛'
				}, ],

				gamegenderone: [],
				gamegendertwo: [],

			}
		},
		created() {
			this.datanavlist(); //导航的信息
		},
		methods: {
			// 对应的数据的信息
			datasexh() {
				var that = this;
				this.$http.request({
					url: this.$api.tabberdata.datatabber,
					showLoading: true,
					data: {
						projectname: this.datatabbervalue
					}
				}).then((res) => {
					if (res.start == 1) { //获取成功
						that.gamegenderone = res.data.gamegenderone;
						that.gamegendertwo = res.data.gamegendertwo;
						//that.navdatare =  res.data;
					} else { //其他状态显示为空的页面

					}
				})
			},
			// 导航栏的获取
			datanavlist() {
				var that = this;
				this.$http.request({
					url: this.$api.tabberdata.navdata,
					showLoading: true,
				}).then((res) => {
					if (res.start == 1) { //获取成功
						that.datatabbervalue = res.data[0].projectname
						that.navdatare = res.data;
						that.datasexh();
					} else { //其他状态显示为空的页面
					that.isnodata = true;
					}
				})

			},
			//切换点击导航栏
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.datatabbervalue = e.currentTarget.dataset.projectname;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.datasexh();
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
