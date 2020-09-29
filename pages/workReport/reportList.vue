<template>
	<view class="content">
		<!-- 导航栏 -->
		<view class="tabClass">
			<v-tabs v-model="current" :tabs="tabs" :pills="true" line-height="0"
			 activeColor="#fff" @change="changeTab" padding="10px 25px" bgColor="#ffffff"></v-tabs>
		</view>
		
		<!-- 全部报告 -->
		<view class="mt" v-if="current==0">
			<view v-for="(item,index) in allReports" :key="index" class="itemClass">
				<text class="timeClass">{{formateTime(item.updateTime)}}</text>
				<view class="boxClass">
					<view class="nameClass commonClass">{{item.userName}}的报告</view>
					<view class="commonClass">项目：{{item.projectName}}</view>
					<view class="commonClass">报告类型：{{item.reportType}}</view>
					<view class="workContentClass commonClass">工作内容：{{item.workContent}}</view>
				</view>
				<image src="../../static/workReport/check.png" class="imgClass checkClass" @click="checkReport(item)"></image>
				<image src="../../static/workReport/delete.png" class="imgClass deleteClass" @click="deleteReport(item)"></image>
			</view>
		</view>
		
		<!-- 每日报告 -->
		<view class="mt" v-if="current==1">
			<view v-for="(item,index) in dayReports" :key="index" class="itemClass">
				<text class="timeClass">{{formateTime(item.updateTime)}}</text>
				<view class="boxClass">
					<view class="nameClass commonClass">{{item.userName}}的报告</view>
					<view class="commonClass">项目：{{item.projectName}}</view>
					<view class="commonClass">报告类型：{{item.reportType}}</view>
					<view class="workContentClass commonClass">工作内容：{{item.workContent}}</view>
				</view>
				<image src="../../static/workReport/check.png" class="imgClass checkClass" @click="checkReport(item)"></image>
				<image src="../../static/workReport/delete.png" class="imgClass deleteClass" @click="deleteReport(item)"></image>
			</view>
		</view>
		
		<!-- 每周报告 -->
		<view class="mt" v-if="current==2">
			<view v-for="(item,index) in weekReports" :key="index" class="itemClass">
				<text class="timeClass">{{formateTime(item.updateTime)}}</text>
				<view class="boxClass">
					<view class="nameClass commonClass">{{item.userName}}的报告</view>
					<view class="commonClass">项目：{{item.projectName}}</view>
					<view class="commonClass">报告类型：{{item.reportType}}</view>
					<view class="workContentClass commonClass">工作内容：{{item.workContent}}</view>
				</view>
				<image src="../../static/workReport/check.png" class="imgClass checkClass" @click="checkReport(item)"></image>
				<image src="../../static/workReport/delete.png" class="imgClass deleteClass" @click="deleteReport(item)"></image>
			</view>
		</view>
		
		<!-- 每月报告 -->
		<view class="mt" v-if="current==3">
			<view v-for="(item,index) in monthReports" :key="index" class="itemClass">
				<text class="timeClass">{{formateTime(item.updateTime)}}</text>
				<view class="boxClass">
					<view class="nameClass commonClass">{{item.userName}}的报告</view>
					<view class="commonClass">项目：{{item.projectName}}</view>
					<view class="commonClass">报告类型：{{item.reportType}}</view>
					<view class="workContentClass commonClass">工作内容：{{item.workContent}}</view>
				</view>
				<image src="../../static/workReport/check.png" class="imgClass checkClass" @click="checkReport(item)"></image>
				<image src="../../static/workReport/delete.png" class="imgClass deleteClass" @click="deleteReport(item)"></image>
			</view>
		</view>
		
		<!-- 添加按钮 -->
		<view class="bottomBox">
			<button class="btnClass bc_blue" @click="addReport">添加</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current: 0,
				tabs: [
					'全部报告',
					'每日报告',
					'每周报告',
					'每月报告',
				],
				allReports:[],		//全部报告
				dayReports:[], 		//每日报告
				weekReports:[],		//每周报告
				monthReports:[],	//每月报告
			}
		},
		onShow() {
			this.loadReports(); //加载报告
		},
		methods: {
			//---------------------------------加载报告---------------------------------
			loadReports() {
				uni.request({
					url:this.$all.getUrl() + this.$all.Inter_report.getAllReports.url,
					method:this.$all.Inter_report.getAllReports.method,
					success: (res) => {
						console.log(res);
						if(res.data.status){
							var that=this;
							//按时间排序
							this.allReports=res.data.data.sort(function(a, b){
								let time1=that.formateTime(a.updateTime);
								let time2=that.formateTime(b.updateTime);
								return Date.parse(time2) - Date.parse(time1);
							});
							this.dayReports = this.allReports.filter(x => {
								return x.reportType == '每日报告';
							});
							this.weekReports = this.allReports.filter(x => {
								return x.reportType == '每周报告';
							});
							this.monthReports = this.allReports.filter(x => {
								return x.reportType == '每月报告';
							});
						}
					}
				})
			},
			
			//---------------------------------切换tab---------------------------------
		    changeTab(index) {
				this.current=index;
		    },
			
			//---------------------------------添加报告---------------------------------
			addReport(){
				uni.navigateTo({
					url:'/pages/workReport/addReport',
				})
			},
			
			//---------------------------------查看报告---------------------------------
			checkReport(e){
				uni.setStorageSync('reportDetail',e)
				uni.navigateTo({
					url:'/pages/workReport/addReport?type=edit',
				})
			},
			
			//---------------------------------删除报告---------------------------------
			deleteReport(item){
				uni.showModal({
					title:'温馨提示',
					content:'确定删除吗？',
					success: (e)=>{
						if(e.confirm){
							uni.request({
								url:this.$all.getUrl() + this.$all.Inter_report.deleteReportByReportId.url,
								method:this.$all.Inter_report.deleteReportByReportId.method,
								data:{
									reportId:item.id,
								},
								success: (res) => {
									console.log(res);
									if(res.data.status){
										uni.showToast({
											title:res.data.msg,
										})
										setTimeout(()=>{
											uni.redirectTo({
												url:'/pages/workReport/reportList'
											})
										}, 200)
									}
								}
							})
						}
					}
				})
			},
			
			//---------------------------------格式化时间---------------------------------
			formateTime(time){
				let date=time.replace('T',' ');
				return date.substring(0,16);
			},
			
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.content{
		padding: 0;
		width: 100%;
	}
	
	.tabClass{
		width: 100%;
		position: fixed;
		top:0;
		z-index: 999999;
	}
	
	.mt{
		margin: 110upx 0 150upx 0;
	}
	.itemClass{
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	
	.timeClass{
		width: 100%;
		text-align: center;
		margin: 20upx 0;
		color: #6c6c6c;
	}
	
	.boxClass{
		width: 90%;
		margin-left: 5%;
		background-color: #ffffff;
		border-radius: 20upx;
		padding-bottom: 25upx;
		.nameClass{
			font-weight: bold;
			font-size: 40upx;
		}
		.commonClass{
			padding: 20upx 0 0upx 5%;
			width: 70%;
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		.workContentClass{
			width: 80%;
		}
	}
	
	.imgClass{
		width: 42upx;
		height: 45upx;
		position:absolute;
		top:190upx;
	}
	.checkClass{
		right: 20%;
	}
	.deleteClass{
		right: 10%;
	}
	
	.bottomBox{
		width: 100%;
		background-color: #f5f5f5;
		position: fixed;
		bottom: 0;
		height: 140upx;
	}
	.btnClass{
		width: 90%;
		margin-top: 20upx;
		color: #FFFFFF;
	}
</style>
