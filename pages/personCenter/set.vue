<template>
	<view class="container">
		<view class="itemClass" @click="clearStorage" hover-class="btnClass">
			<text class="">清除缓存</text>
			<text class="sizeClass">{{currentSize}}</text>
			<image src="../../static/PersonCenter/icon-right.png" class="rightClass1"></image>
		</view>
		<view class="itemClass" @click="addIP" hover-class="btnClass">
			<text class="">添加IP</text>
			<image src="../../static/PersonCenter/icon-right.png" class="rightClass2"></image>
		</view>
		<view class="itemClass" @click="switchIP" hover-class="btnClass">
			<text class="">IP切换</text>
			<image src="../../static/PersonCenter/icon-right.png" class="rightClass2"></image>
		</view>
		<view class="itemClass" @click="checkConnect" hover-class="btnClass">
			<text class="">测试连接</text>
			<image src="../../static/PersonCenter/icon-right.png" class="rightClass3"></image>
		</view>
		<view class="itemClass pd" @click="toLogout">
			<text class="loginClass">退出登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentSize:'',		//缓存大小
			};
		},
		onLoad(){
			uni.setNavigationBarTitle({
			    title: '设置'
			});
		},
		onShow() {
			this.load();
		},
		methods:{
			//------------------------------------加载缓存大小--------------------------
			load(){
				const res = uni.getStorageInfoSync();
				console.log(res,"res3");
				console.log(res.currentSize,"currentSize");
				var size=res.currentSize;
				if(size>=1024){
					var size=(size/1024).toFixed(2);
					this.currentSize=size+" M";
				}else{
					this.currentSize=size+" KB";
				}
			},
			
			//------------------------------------退出登录--------------------------
			toLogout(){				
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success:(res)=>{
						uni.showModal({
							title:'温馨提示',
							content: '确定要退出登录吗？',
							success: (e)=>{
								if(e.confirm){
									this.exitLogin(res.data.userId)
									uni.removeStorageSync('userInfo');
									
								}
							}
						});
					},
					fail(){
						uni.showToast({
							title : '请先登录',
							icon : 'none',
						})
					}
				})
			},
			
			//------------------------------------退出登录接口--------------------------
			exitLogin(e){
				uni.request({
					url:this.$all.getUrl() + this.$all.Inter_person.exitLogin.url,
					method: this.$all.Inter_person.exitLogin.method,
					data: {
						id:e,
					},
					success: (res) => {
						console.log(res,"退出登录");
					},
					complete: () => {
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/personCenter/personCenter'
							})
						}, 200)
					},
				});
			},
			
			//------------------------------------清除缓存--------------------------
			clearStorage(){
				var user=uni.getStorageSync('userInfo')||'';
				var ipAddress=uni.getStorageSync('ipAddress')||'';
				var ipList=uni.getStorageSync('ipList')||'';
				uni.showModal({
				    content: '是否清除数据',
				    success: (e)=>{
				    	if(e.confirm){
							uni.clearStorageSync();
							if(user!=""){
								uni.setStorageSync('userInfo',user);
							}
							if(ipAddress!=""){
								uni.setStorageSync('ipAddress',ipAddress);
							}
							if(ipList!=""){
								uni.setStorageSync('ipList',ipList);
							}
							uni.redirectTo({
								url:'./set'
							})
				    	}
				    }
				});
			},
			
			//------------------------------------添加IP--------------------------
			addIP(){
				uni.navigateTo({
					url:'./addIp?type=add'
				})
			},
			
			//------------------------------------切换IP--------------------------
			switchIP(){
				uni.navigateTo({
					url:'./ipList'
				})
			},
			
			//------------------------------------测试连接--------------------------
			checkConnect(){
				uni.showLoading({
					title: '测试连接中...',
					mask: false,
				});
				uni.request({
					url:this.$all.getUrl() + this.$all.Inter_person.checkConnect.url,
					method: this.$all.Inter_person.checkConnect.method,
					data: {
						id:'1',
					},
					success: res => {
						setTimeout(function(){
							uni.showToast({
								title: res.data.msg,
								icon:'none'
							});
						},300)
					},
					fail: (err) => {
						setTimeout(function(){
							uni.showToast({
								title: '网络连接失败',
								icon:'none'
							});
						},300)
					},
				});
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: #e6e6e6;
	}
	.container{
		width: 100%;
	}
	.itemClass{
		display: flex;
		flex-direction: row;
		padding: 30upx 0upx 30upx 30upx;
		font-size: 28upx;
		background-color: #ffffff;
		margin-top: 20upx;
	}
	.pd{
		padding: 30upx;
	}
	.rightClass1{
		width: 30upx;
		height: 30upx;
		margin-top: 5upx;
		margin-left: 1%;
	}
	.rightClass2{
		width: 30upx;
		height: 30upx;
		margin-top: 5upx;
		margin-left: 80%;
	}
	.rightClass3{
		width: 30upx;
		height: 30upx;
		margin-top: 5upx;
		margin-left: 76%;
	}
	.sizeClass{
		width: 50%;
		text-align: right;
		margin-left: 25%;
	}
	.loginClass{
		width: 100%;
		text-align: center;
		color: #007AFF;
	}
	
	//按钮点击的效果
	.btnClass{
		transition: all .3s; /*过渡 */ 
		opacity: 0.9;
		background-color:#c1c4c8;
	}
</style>
