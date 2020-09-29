<template>
	<view class="content">
		<view class="itemClass">
			<image src="../../static/projectProgress/progress.png" class="imgClass"></image>
			<text class="fontClass">项目进度</text>
		</view>
		<view class="selectClass">
			<picker mode="selector" :range="projectList" @change="changeProject" :value="projectIndex">
				<view>{{projectName}}</view>
			</picker>
		</view>
		<view class="imgBox">
			<view class="boxClass" @click="selectProgress">
				<image src="../../static/projectProgress/query.png" class="imgClass"></image>
			</view>
			<!-- <view class="boxClass ml" @click="addProgress">
				<image src="../../static/projectProgress/add.png" class="imgClass"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			projectName:'测试平台',			//项目名称 请选择项目
			projectIndex:0,					//选中项目的下标
			projectList:[],		//项目列表
			projectDetail:[],	//项目详情
		}
	},
	onShow() {
		this.loadProjectList();
	},
	methods:{
		//------------------------------加载项目列表------------------------------
		loadProjectList(){
			this.projectList=[];
			this.projectDetail=[];
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
							this.projectDetail.push(list[i]);
						}
					}
				}
			})
		},
		
		//---------------------------------格式化时间---------------------------------
		formateTime(time){
			let date=time.replace('T',' ');
			return date.substring(0,16);
		},
		
		//---------------------------------选择项目---------------------------------
		changeProject(e){
			this.projectIndex=e.detail.value;
			this.projectName=this.projectList[e.detail.value];
		},
		
		//--------------------------查询进度--------------------------
		selectProgress(){
			if(this.projectName=="请选择项目"){
				uni.showToast({
					title:'请选择项目',
					icon:'none'
				})
			}else{
				var list = this.projectDetail.filter(item => {
					return item.projectName == this.projectName; //条件
				})
				uni.setStorageSync('queryProgress',{
					id:list[0].id,
					projectName:this.projectName,
				})
				uni.navigateTo({
					url:'./progressDetail',
				})
			}
		},
		
		//--------------------------添加进度--------------------------
		addProgress(){
			if(this.projectName=="请选择项目"){
				uni.showToast({
					title:'请选择项目',
					icon:'none'
				})
			}else{
				var index = this.projectList.indexOf(this.projectName);
				console.log(index);
				uni.request({
					url:this.$all.getUrl() + this.$all.Inter_progress.addProgress.url,
					method:this.$all.Inter_progress.addProgress.method,
					data:{
						projectName:'',
						projectId:'',
						userId:'',
						userName:'',
						progress:'',
					},
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
								this.projectDetail.push(list[i]);
							}
						}
					}
				})
			}
		}
	}
}
</script>

<style lang="scss">
	page{
		background-color: #e3e3e3;
	}
	
	.itemClass{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;//水平居中
		margin: 90upx 0;
		color: #333333;
		.imgClass{
			width: 50upx;
			height: 50upx;
		}
		.fontClass{
			font-size: 40upx;
			margin-left: 2%;
		}
	}
	
	.selectClass{
		background-color: #ffffff;
		margin: 30upx 10%;
		width: 80%;
		border: 1upx solid #d5d5d5;
		text-align: left;
		border-radius: 10upx;
		display: flex;
		flex-direction: row;
		font-size: 36upx;
		padding: 20upx 5%;
	}
	.imgBox{
		margin-top: 90upx;
		display: flex;
		justify-content: center;//水平居中
		width: 100%;
		.boxClass{
			width: 90upx;
			height: 90upx;
			border-radius: 50%;
			background-color: #ffffff;
			display: flex;
			align-items: center;//垂直居中
			justify-content: center;//水平居中
		}
		.imgClass{
			width: 60upx;
			height: 60upx;
		}
		.ml{
			margin-left: 15%;
		}
	}
</style>
