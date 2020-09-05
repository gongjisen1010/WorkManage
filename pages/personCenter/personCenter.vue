<template>
	<view class="content">
		<view class="topBox bc_blue">
			<!-- 用户名 -->
			<view class="nameClass" @click="checkLogin">
				{{userName}}
			</view>
			<!-- 用户类型，用户状态 -->
			<view class="userBox">
				<text class="userClass mr">{{userRole}}</text>
				<text class="userClass">{{userState}}</text>
			</view>
			<!-- 项目总计，签到 -->
			<view class="boxClass">
				<view class="box mr">
					<text class="fs">
						{{projectNum}}
					</text>
					<text>
						项目总计
					</text>
				</view>
				<view class="box">
					<text class="fs">
						{{signNum}}
					</text>
					<text>
						签到
					</text>
				</view>
			</view>
			<!-- 头像 -->
			<view class="imgBox">
				<image :src="portrait||'/static/PersonCenter/headImg.jpg'" class="imgClass"></image>
			</view>
		</view>
		
		<view>
			<view class="itemClass bt" hover-class="btn_Click"  v-for="(item,index) in serviceList" :key="index" @click="operateClick(item.title)">
				<text class="fontClass">{{item.title}}</text>
				<image src="../../static/PersonCenter/icon-right.png" :class="item.style"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userName:'立即登录',		//用户名
				userRole:'普通用户',		//用户角色
				userState:'在线',		//用户状态
				projectNum:0,			//项目数量
				signNum:0,				//签到天数
				portrait:'',			//头像
				
				serviceList:[{			//服务列表
					title:'个人信息',
					style:"rightClass",
				},
				{			
					title:'每日签到',
					style:"rightClass",
				},
				{
					title:'修改密码',
					style:"rightClass",
				},
				{
					title:'设  置',
					style:"rightClass ml",
				}],
			}	
		},
		onShow() {
			this.loadUserInfo();
		},
		methods:{
			//-------------------------------操作点击-------------------------------
			operateClick(e){
				switch (e){
					case '个人信息':
						uni.navigateTo({
							url:'./personInfo'
						})
						break;
					case '每日签到':
						
						break;
					case '修改密码':
						
						break;
					case '设  置':
						uni.navigateTo({
							url:'./set'
						})
						break;
					default: 
						return '';
				}
			},
			
			//-------------------------------加载用户信息-------------------------------
			loadUserInfo(){
				uni.getStorage({
					key:'userInfo',
					success: res=>{
						this.getUserInfo(res.data.userId)
					},
					fail: (err) => {
						this.userName = "立即登录";
					},
				})
			},
			
			//----------------------------------------获取用户信息----------------------------------------
			getUserInfo(e){
				uni.request({
					url: this.$all.getUrl()+this.$all.Inter_person.getUserByUserId.url,
					method: this.$all.Inter_person.getUserByUserId.method,
					data: {
						id : e,
					},
					success: res => {
						console.log(res,"获取用户信息");
						this.userName = res.data.data.userName;
						this.portrait = res.data.data.userPortrait;
					},
					fail: (err) => {
						console.log(err,"错误信息");
						this.userName = "立即登录";
						uni.showToast({
							title: '网络连接失败',
							icon:'none',
						});
					},
				});
			},
			
			//-------------------------------检查是否登录-------------------------------
			checkLogin(){
				uni.getStorage({
					key:'userInfo',
					fail: () => {
						uni.showToast({
							title: '暂未登录，请先登录',
							icon:'none',
						});
						setTimeout(function(){
							uni.navigateTo({
								url:'./login',
							})
						},300)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
	}
	.topBox{
		width: 100%;
		height: 480upx;
		position: relative;
		color: #ffffff;
	}
	
	.nameClass{
		width: 60%;
		font-size: 50upx;
		font-weight: bold;
		position: absolute;
		top:150upx;
		left: 5%;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.userBox{
		font-size: 20upx;
		display: flex;
		flex-direction: row;
		position: absolute;
		top:240upx;
		left: 5%;
		.userClass{
			border: 1upx solid #ffffff;
			padding: 10upx 20upx;
			border-radius: 10upx;
		}
		.mr{
			margin-right: 20upx;
		}
	}
	.boxClass{
		font-size: 35upx;
		display: flex;
		flex-direction: row;
		position: absolute;
		top:330upx;
		left: 5%;
		.box{
			display: flex;
			flex-direction: column;
		}
		.mr{
			margin-right: 40upx;
		}
		.fs{
			font-size: 38upx;
			font-weight: bold;
			margin-bottom: 5upx;
		}
	}
	
	.imgBox{
		position: absolute;
		top:200upx;
		right: 7%;
		width: 150upx;
		height: 150upx;
		.imgClass{
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: 5upx solid #ffffff;
		}
	}
	
	.bt{
		border-bottom: 1upx solid #EAEAEA;
	}
	.itemClass{
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row; //column:纵向排列，row横向排列
		.fontClass {
			padding: 30upx 0;
			color: #333333;
			margin-left: 3%;
			font-size: 32upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.rightClass{
			width: 30upx;
			height: 30upx;
			margin-left: 70%;
			margin-top: 42upx;
		}
		.ml{
			margin-left: 77%;
		}
	}
</style>
