<template>
	<view class="container">
		<view class="itemClass" @click="clearStorage" hover-class="btnClass">
			<text class="">清除缓存</text>
			<text class="sizeClass">{{currentSize}}</text>
			<image src="../../static/GRZX/icon-right.png" class="rightClass"></image>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="itemClass" @click="toLogout">
			<text class="loginClass">退出登录</text>
		</view>
		<!-- #endif -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentSize:'',
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
				var that=this;
				uni.getStorage({
					key:'switch',
					success:function(res1){					
						that.statu.check1=res1.data;
					}
				})
				uni.getStorage({
					key:'play',
					success:function(res2){
						that.statu.check2=res2.data;
					}
				})
				const res = uni.getStorageInfoSync();
				console.log(res,"res3");
				console.log(res.currentSize,"currentSize");
				var size=res.currentSize;
				if(size>=1024){
					var size=(size/1024).toFixed(2);
					that.currentSize=size+" M";
				}else{
					that.currentSize=size+" KB";
				}
			},
			//------------------------------------退出登录--------------------------
			toLogout(){				
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success(){
						uni.showModal({
							title:'提示',
							content: '确定要退出登录吗？',
							success: (e)=>{
								if(e.confirm){
									uni.removeStorageSync('userInfo');
									uni.removeStorageSync('RealNameInfo');
									setTimeout(()=>{
										uni.switchTab({
											url:'/pages/GRZX/personalCenter'
										})
									}, 200)
								}
							}
						});
					},
					fail(){
						uni.showToast({
							title : '请先登录',
							icon : 'none',
						})
						// //#ifdef APP-PLUS
						// setTimeout(function(){
						// 	uni.navigateTo({
						// 		// url  : '/pages/GRZX/userLogin',
						// 		url:that.$GrzxInter.Route.userLogin.url +'?urlData=1'
						// 	}) 
						// },1000);
						// // #endif
						// //#ifdef MP-WEIXIN
						// uni.navigateTo({
						// 	url:'/pages/Home/wxAuthorize',
						// })
						// // #endif
					}
				})
			},
			
			//------------------------------------清除缓存--------------------------
			clearStorage(){
				var user=uni.getStorageSync('userInfo')||'';
				var RealNameInfo=uni.getStorageSync('RealNameInfo')||'';
				uni.showModal({
				    content: '是否清除数据',
				    success: (e)=>{
				    	if(e.confirm){
							uni.clearStorageSync();
							if(user!=""){
								uni.setStorageSync('userInfo',user);
							}
							if(RealNameInfo!=""){
								uni.setStorageSync('RealNameInfo',RealNameInfo);
							}
							uni.redirectTo({
								url:'./set'
							})
				    	}
				    }
				});
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: #e6e6e6;
	}
	.itemClass{
		display: flex;
		flex-direction: row;
		font-size: 28upx;
		padding: 30upx 30upx;
		background-color: #ffffff;
		margin-top: 20upx;
	}
	.rightClass{
		width: 30upx;
		height: 30upx;
		margin-top: 5upx;
		margin-left: 1%;
	}
	.sizeClass{
		margin-left: 65%;
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
