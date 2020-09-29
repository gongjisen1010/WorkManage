<template>
	<view class="content">
		<view class="titleClass">
			<text class="fontClass">项目总进度</text>
			<!-- <text class="fontStyle" @click="changeShowStyle">{{showTitle}}</text> -->
			<text class="fontStyle" @click="openPopup">添加进度</text>
		</view>
		<view class="chartClass">
			<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas>
		</view>
		<view class="titleClass">
			<text class="fontClass">进度详情</text>
		</view>
		
		<scroll-view scroll-y="true" class="boxClass" v-bind:style="{height:scrowHeight+'px'}">
			<view>
				<uni-steps :options="progressList" direction="column" :active="count"></uni-steps>
			</view>
		</scroll-view>
		
		<uni-popup ref="addProgress" type="center">
			<view class="popupBlock">
				<view class="popupTitle">
					<text>请输入进度</text>
				</view>
				<view class="popupInputBlock">
					<view class="popupInput">
						<input type="number" :focus="focus" v-model="popupValue" placeholder="请输入进度" maxlength="3"/>
					</view>
				</view>
				<view class="popupButtonBlock">
					<view class="popupButtonItem itemRight" @click="closePopup">
						<text>取消</text>
					</view>
					<view class="popupButtonItem" @click="addProgress">
						<text class="popupOkColor">确定</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniSteps from '@/components/uni-steps/uni-steps.vue';
import uCharts from '@/components/u-charts/u-charts.js';
import dataJson from '@/common/data.json';
import  { isJSON } from '@/common/checker.js';

import uniPopup from '@/components/uni-popup/uni-popup.vue'

var _self;
var canvaGauge=null;
var canvaLineA=null;
var lastMoveTime=null;//最后执行移动的时间戳
export default{
	components: {uniSteps,uniPopup},
	data(){
		return{
			showStyle:true,					//展示样式
			showTitle:'切换至图表展示',		//切换至图表展示,切换至栏目展示
			id:0,		//项目id
			projectName:'',	//项目名称
			progressList:[],		//进度列表
			count:0,			//进度条数
			progress:0,			//总进度
			
			scrowHeight: '', //scroll-view的高度法
			focus:false,	//是否获取输入框的焦点
			popupValue:'',	//输入框的值
			userInfo:'',	//用户信息
		}
	},
	onLoad() {
		// this.id = '201006';		//测试id
		this.userInfo = uni.getStorageSync('userInfo') ||'';
		let pro = uni.getStorageSync('queryProgress') ||'';
		this.id = pro.id;
		this.projectName = pro.projectName;
		this.getProjectProgress(this.id);
		this.queryProgress(this.id);
		this.loadscrowHeight();
	},
	onShow() {
		
	},
	methods:{
		//--------------------加载scroll-view的高度--------------------------
		loadscrowHeight() {
			uni.getSystemInfo({
				success: res=> { // res - 各种参数
					this.scrowHeight = res.windowHeight - 360 ;
				}
			});
		},
		
		//---------------------------------加载项目进度---------------------------------
		queryProgress(id){
			this.progressList = [];
			uni.request({
				url:this.$all.getUrl() + this.$all.Inter_progress.queryProgress.url,
				method:this.$all.Inter_progress.queryProgress.method,
				data: {
					projectId:id,
				},
				success: res => {
					console.log(res);
					let array = res.data.data;
					var obj = new Object();
					for (var item of array){
						obj = {
							title:'进度:' + item.progress + "%",
							desc:this.formateTime(item.updateTime),
							progress:parseInt(item.progress),
							date:item.updateTime.substring(0,10),
						}
						this.progressList.push(obj);
					}
					this.count = array.length - 1;
				},
				fail: () => {
					uni.showToast({
						title: '网络连接失败',
						icon:'none'
					});
				},
			});
		},
		
		//---------------------------------加载项目总进度---------------------------------
		getProjectProgress(e){
			uni.request({
				url:this.$all.getUrl() + this.$all.Inter_projcet.getProjectProgress.url,
				method:this.$all.Inter_projcet.getProjectProgress.method,
				data:{
					id:e,
				},
				success: (res) => {
					console.log(res,"获取项目总进度");
					this.progress = parseInt(res.data.data);
					var num = res.data.data == ""?"0%" : res.data.data + "%";
					this.getServerData(num);
				}
			})
		},
		
		//---------------------------------格式化时间---------------------------------
		formateTime(time){
			let date=time.replace('T',' ');
			return date.substring(0,16);
		},
		
		//---------------------------------切换至图表展示,切换至栏目展示---------------------------------
		changeShowStyle(){
			this.showStyle = !this.showStyle;
			this.showTitle = this.showStyle ? '切换至图表展示' : '切换至栏目展示';
		},
		
		//---------------------------------开启弹框---------------------------------
		openPopup(){
			let that = this;
			that.focus = false;
			that.popupValue = '';
			that.$refs.addProgress.open();
			setTimeout(function(){
				that.focus = true;
			},500);
		},
		
		//---------------------------------关闭弹框---------------------------------
		closePopup(){
			this.$refs.addProgress.close();
		},
		
		//---------------------------------添加进度---------------------------------
		addProgress(){
			uni.request({
				url:this.$all.getUrl() + this.$all.Inter_progress.addProgress.url,
				method:this.$all.Inter_progress.addProgress.method,
				data:{
					projectName : this.projectName,
					projectId : this.id,
					userId : this.userInfo.userName,
					userName : this.userInfo.userName,
					progress : this.popupValue,
				},
				success: (res) => {
					console.log(res,'添加进度');
					if(res.data.status){
						uni.showToast({
							title: res.data.msg,
							icon:'success',
						});
						uni.setStorageSync('queryProgress',{
							id:this.id,
							projectName:this.projectName,
						})
						setTimeout(function(){
							uni.redirectTo({
								url:'/pages/projectProgress/progressDetail',
							})
						},500)
					}else{
						uni.showToast({
							title: res.data.msg,
							icon:'none',
						});
					}
				}
			})	
		},
		
		//---------------------------------总进度---------------------------------
		getServerData(num){
			let Gauge={categories:[],series:[]};
			let n = parseInt(num) / 100 ;
			Gauge.categories.push( {
				color:"#1890FF",
				value:0.2,
				_endAngle:1.05,
				_startAngle:0.75
			});
			Gauge.series.push({
				color:"#1890FF",
				data:n,
				pointShape:"circle",
				legendShape:"circle",
				name:"完成率",
				type:"gauge",
				show:true,
				_endAngle:1.74,
				_startAngle:0.75
			});
			this.showGauge("canvasGauge",Gauge,num);
		},
		
		showGauge(canvasId,chartData,num){
			console.log(chartData,"111");
			canvaGauge = new uCharts({
				$this:_self,
				canvasId: canvasId,
				type: 'gauge',
				fontSize:11,
				legend:{show:false},
				title: {
					name:num,
					color: '#1890FF',
					fontSize: 25,
					offsetY:50,//新增参数，自定义调整Y轴文案距离
				},
				subtitle: {
					name: '项目总进度',
					color: '#666666',
					fontSize: 15,
					offsetY:-50,//新增参数，自定义调整Y轴文案距离
				},
				extra: {
					gauge:{
						type:'progress',
						width: 15,//仪表盘背景的宽度
						startAngle:0.75,
						endAngle:0.25,
						startNumber:0,
						endNumber:100,
						splitLine:{
							fixRadius:0,
							splitNumber:10,
							width: 15,//仪表盘背景的宽度
							color:'#FFFFFF',
							childNumber:5,
							childWidth:15,//仪表盘背景的宽度
						},
						pointer:{
							width: 15,//指针宽度
							color:'auto'
						}
					}
				},
				background:'#FFFFFF',
				pixelRatio:1,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				width:375,
				height: 250,
				dataLabel: true,
			});
		},
		
	}
}
</script>

<style lang="scss">
	.titleClass{
		margin-top: 30upx;
		margin-left: 5%;
		border-left: 5upx solid #007AFF;
		.fontClass{
			padding-left: 3%;
		}
		.fontStyle{
			margin-left: 50%;
		}
	}
	.boxClass{
		margin-top: 20upx;
		margin-left: 1%;
		width: 90%;
	}
	
	.chartClass {
		width: 100%;
		height: 500upx;
		margin-top: 30upx;
	}
	
	.charts {
		width: 100%;
		height: 100%;
	}
	
	/* 隐藏滚动条 */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	//弹框
	.popupBlock {
		width: 550rpx;
		padding: 30rpx 0;
		background-color: #FFFFFF;
		border-radius: 12rpx;
	}
	.popupTitle{
		text-align: center;
		margin-bottom: 30rpx;
	}
	.popupTitle text{
		color: $uni-text-color-grey;
	}
	.popupInputBlock{
		padding:0 30rpx 30rpx 30rpx ;
		margin-bottom: 30rpx;
		border-bottom: 1px solid #E6E6E6;
	}
	.popupInput{
		width: 450rpx;
		margin: 0 auto;
	}
	.popupButtonBlock{
		display: flex;
		flex-direction: row;
		width: 550rpx;
		margin: 0 auto;
	}
	.popupButtonItem{
		text-align: center;
		width: 275rpx;
	}
	.popupOkColor{
		color: $uni-color-primary;
	}
	.itemRight{
		border-right: 1px solid #E6E6E6;
	}
</style>
