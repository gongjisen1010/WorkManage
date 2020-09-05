<template>
	<view class="content">
		<view class="mb">
			<view class="itemClass rowClass">
				<view class="titleClass">项目名称</view>
				<picker v-if="!disable" class="pickerClass" name="projectName"  mode="selector" @change="projectNameChange" :range="projectList" :value="projectIndex">
					{{projectName}}
				</picker>
				<view v-if="disable" class="pickerClass">{{projectName}}</view>
			</view>
			<view class="itemClass rowClass">
				<view class="titleClass">报告类型</view>
				<picker v-if="!disable" class="pickerClass" name="reportType"  mode="selector" @change="reportTypeChange" :range="typeList" :value="typeIndex">
					{{reportType}}
				</picker>	
				<view v-if="disable" class="pickerClass">{{reportType}}</view>
			</view>
			<view class="itemClass">
				<view class="titleClass">工作内容</view>
				<textarea class="workContent" :disabled="disable" auto-height="true" placeholder="请填写工作内容(必填)" maxlength="200" v-model="workContent"/>
			</view>
			<view class="itemClass">
				<view class="titleClass widthClass">待解决的问题</view>
				<textarea class="workContent" :disabled="disable" auto-height="true" placeholder="请填写待解决的问题(非必填)" maxlength="200" v-model="workProblem"/>
			</view>
			<view v-if="type=='edit'" class="itemClass rowClass">
				<view class="titleClass1">上次保存时间</view>
				<text class="inputClass1">{{formateTime(nowTime)}}</text>
			</view>
		</view>
		<view class="bottomBox">
			<button v-if="type!='edit'" class="btnClass bc_blue" @click="submit">提交</button>
			<button v-if="type=='edit'" class="btnClass bc_blue" @click="back">返回</button>
		</view>
	</view>
</template>

<script>
	import utils from '@/common/utils.js'; // 封装的工具集
	export default{
		data(){
			return{
				projectName:"请选择项目",  	//默认选项
				projectIndex:0,				//选中项目的下标
				projectList:[],//项目列表"智慧出行","监控平台","大数据分析"
				reportType:"每日报告",		//默认选项
				typeIndex:0,				//选中报告类型的下标
				typeList:["每日报告","每周报告","每月报告"],//报告类型列表
				workContent:'',		//工作内容
				workProblem:'',		//待解决的问题
				nowTime:'',			//当前时间
				type:'',			//操作类型
				disable:false,		//是否禁用
			}
		},
		onLoad(options) {
			if(options.type=='edit'){
				this.type = options.type;
				this.disable = true;
				uni.getStorage({
					key:'reportDetail',
					success: (res) => {
						this.projectName=res.data.projectName;
						this.workContent=res.data.workContent;
						this.workProblem=res.data.workProblem;
						this.reportType=res.data.reportType;
						this.nowTime=res.data.updateTime;
						uni.setNavigationBarTitle({
						    title: res.data.userName+'的报告',
						});
						uni.removeStorageSync('reportDetail');
					},
					fail: (err) => {
						uni.showToast({
							title:'查看报告失败！',
							icon:'none'
						})
					}
				})
			}else{
				this.nowTime = this.loadTime();
			}
		},
		onShow() {
			this.loadProjectList();
		},
		methods:{
			//------------------------------加载项目列表------------------------------
			loadProjectList(){
				this.projectList=[];
				uni.request({
					url:this.$all.getUrl() + this.$all.Inter_projcet.getProject.url,
					method:this.$all.Inter_projcet.getProject.method,
					success: (res) => {
						console.log(res);
						if(res.data.status){
							var that = this;
							let list=res.data.data.sort(function(a, b){
								let time1=that.formateTime(a.updateTime);
								let time2=that.formateTime(b.updateTime);
								return Date.parse(time2) - Date.parse(time1);
							});
							for(var i = 0; i < list.length; i++ ){
								this.projectList.push(list[i].projectName);
							}
						}
					}
				})
			},
			
			//---------------------------加载当前时间---------------------------
			loadTime(){
				var myDate = new Date();
				let date = utils.formatDate(myDate);
				return `${date.YYYY}-${date.MM}-${date.DD} ${date.hh}:${date.mm}`
			},
			
			//---------------------------选择项目---------------------------
			projectNameChange(e){
				this.projectIndex=e.detail.value;
				this.projectName=this.projectList[e.detail.value];
			},
			
			//---------------------------选择报告类型---------------------------
			reportTypeChange(e){
				this.typeIndex=e.detail.value;
				this.reportType=this.typeList[e.detail.value];
			},
			
			//---------------------------提交报告---------------------------
			submit(){
				if(this.projectName=="请选择项目"){
					uni.showToast({
						title:'请选择项目',
						icon:'none'
					})
				}else if(this.workContent==""){
					uni.showToast({
						title:'请填写工作内容',
						icon:'none'
					})
				}else{
					//请求接口
					uni.showLoading({
						mask:true,
						title:'提交中，请稍候...'
					})
					uni.request({
						url:this.$all.getUrl() + this.$all.Inter_report.addReport.url,
						method:this.$all.Inter_report.addReport.method,
						data:{
							userId:'101037',
							projectName:this.projectName,
							reportType:this.reportType,
							userName:'用户15260769752',
							workContent:this.workContent,
							workProblem:this.workProblem,
							updateTime:this.loadTime(),
						},
						success: (res) => {
							console.log(res);
							if(res.data.status&&res.data.msg=='添加成功！'){
								uni.showToast({
									title:res.data.msg
								})
								setTimeout(()=>{
									uni.navigateBack();
								}, 500)
							}
						}
					})
				}
			},
			
			//---------------------------返回---------------------------
			back(){
				uni.navigateBack();
			},
			
			//---------------------------------格式化时间---------------------------------
			formateTime(time){
				let date=time.replace('T',' ');
				return date.substring(0,16);
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.content{
		width: 100%;
	}
	
	.mb{
		width: 100%;
		margin-bottom: 150upx;
	}
	.itemClass{
		background-color: #FFFFFF;
		width: 100%;
		margin-bottom: 20upx;
	}
	.rowClass{
		display: flex;
		flex-direction: row;
	}
	.pickerClass{
		width: 70%;
		padding-top: 28upx;
		text-align: right;
	}
	.titleClass{
		width: 20%;
		padding: 30upx 3%;
	}
	.inputClass1{
		width: 60%;
		padding-top: 28upx;
		text-align: right;
	}
	.titleClass1{
		width: 30%;
		padding: 30upx 3%;
	}
	.widthClass{
		width: 100%;
	}
	.workContent{
		width: 95%;
		font-size: 32upx;
		padding: 0upx 2% 30upx 3%;
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
