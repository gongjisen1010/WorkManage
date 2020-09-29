<template>
	<view class="content">
		<view class="boxClass">
			<view v-for="(item,index) in projectList" :key="index" class="projectClass" hover-class="" @click="editProject(item)">
				<view class="itemClass" :class="item.style">{{item.projectName}}</view>
			</view>
		</view>
		<!-- 添加按钮 -->
		<view class="bottomBox">
			<button class="btnClass bc_blue" @click="addProject">添加</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				projectList:[],
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.loadProjectList();
		},
		methods:{
			//------------------------------加载项目列表------------------------------
			loadProjectList(){
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
				this.projectList=[];
				uni.request({
					url:this.$all.getUrl() + this.$all.Inter_projcet.getProject.url,
					method:this.$all.Inter_projcet.getProject.method,
					success: (res) => {
						console.log(res);
						let list = res.data.data;
						if(res.data.status){
							var that = this;
							list=list.sort(function(a, b){
								let time1=that.formateTime(a.updateTime);
								let time2=that.formateTime(b.updateTime);
								return Date.parse(time2) - Date.parse(time1);
							});
							for(var i=0; i<list.length; i++){
								list[i].style="Color"+(i%4+1);
								this.projectList.push(list[i]);
							}
						}
						uni.hideLoading();
					},
					fail: () => {
						uni.hideLoading();
					}
				})
			},
		
			//------------------------------编辑项目------------------------------
			editProject(e){
				uni.setStorageSync('projectDetail',e)
				uni.navigateTo({
					url:'/pages/projectManage/addProject?type=edit'
				})
			},
			
			//------------------------------编辑项目------------------------------
			addProject(){
				uni.navigateTo({
					url:'/pages/projectManage/addProject?type=add'
				})
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
		background-color: #FFFFFF;
	}
	.content{
		width: 100%;
	}
	.boxClass{
		display: flex; 
		flex-wrap: wrap;
		margin-left: 2%;
		margin-bottom: 150upx;
	}
	.projectClass{
		width: 48%;
		margin: 2% 2% 0% 0%;
		display: flex;
		flex-direction: row;
		box-shadow:0px 6px 6px 0px rgba(4,0,0,0.09);
	}
	.itemClass{
		color: #ffffff;
		padding:100upx 5%;
		width: 100%;
		text-align: center;
	}
	.Color1{
		background-color:#00D0CF;
	}
	.Color2{
		background-color:#FD6478;
	}
	.Color3{
		background-color:#F0C052;
	}
	.Color4{
		background-color:#41ADF8;
	}
	
	/* 按钮点击效果 */
	.btn_Click{
		transition: all .3s; /*过渡 */ 
		opacity: 0.9;
		background-color:#737373;
	}
	
	.bottomBox{
		width: 100%;
		background-color: #ffffff;
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
