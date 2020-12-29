<template>
	<view>
		<view class="content">
			<!-- 聊天记录 -->
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView">
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.id">
					<!-- 自己发出的消息 -->
					<view class="my" v-if="row.sendId == myId">
						<view class="time">{{row.time}}</view>
						<view class="boxClass">
							<view class="left">
								<image :src="row.face"></image>
							</view>
							<view class="right">
								<view v-if="row.type=='text'" class="bubble">
									<rich-text :nodes="row.content"></rich-text>
								</view>
							</view>
						</view>
					</view>
					
					<!-- 别人发出的消息 -->
					<view class="other" v-if="row.sendId == friendId">
						<view class="time">{{row.time}}</view>
						<view class="boxClass">
							<view class="left">
								<image :src="row.face"></image>
							</view>
							<view class="right">
								<view class="username">
									<view>{{row.serviceName}}</view>
								</view>
								<view v-if="row.type=='text'" class="bubble">
									<rich-text :nodes="row.content"></rich-text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>	
			
			<!-- 发送 -->
			<view class="bottomBox">
				<input class="inputClass" v-model="msgText" />
				<view class="send" @click="sendText">
					<view class="btn">
						发送
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				//消息列表
				scrollAnimation:false,
				scrollTop:999,
				scrollToView:'',
				userInfo:'', 	//我的信息
				friendInfo:'',	//好友的信息
				
				msgList:[],//信息列表
				msgText:'',//要发送的文本
				timeId:0,
			}
		},
		onLoad(){
			var that = this;
			this.loadUser();
			that.msgList = uni.getStorageSync('msg') || [];
			that.getMsgList();
			that.timeId = setInterval(function() {
				that.getMsgList();
			}, 3000);
			//uni.removeStorageSync('msg')
		},
		onUnload() {
			clearInterval(this.timeId); //清除定时器
		},
		methods:{
			//-----------------------------加载用户信息-----------------------------
			loadUser(){
				this.userInfo = uni.getStorageSync('userInfo');
				if(this.userInfo == "" || this.userInfo == null){
					uni.showToast({
						title: '请先登录',
						icon:'none'
					});
				}
				
				this.friendInfo = uni.getStorageSync('friendInfo');
				if(this.friendInfo == "" || this.friendInfo == null){
					uni.showToast({
						title: '请先选择好友',
						icon:'none'
					});
				}
				uni.setNavigationBarTitle({
					title:this.friendInfo.userName,
				});
			},
			
			//-----------------------------获取好友消息-----------------------------
			getMsgList(){
				uni.request({
					url:this.$all.getUrl()+this.$all.Inter_friendList.getChatMessage.url,
					data:{
						sendId:this.userInfo.userId,
						receiverId:this.friendId.userId,
					},
					method:this.$all.Inter_friendList.getChatMessage.method,
					success : res =>{
						var that = this;
						console.log(res,"获取信息");
						var data=res.data.data;
						for (let item of res.data.data){
							let index = that.msgList.some(e=>{
								if(e.id==item.id){
									return true
								}else{
									return false
								}
							})
							if(!index){
								that.msgList.push({
									id:item.id,
									type:"text",
									time:that.formatTime(item.createTime),
									content:item.content,
									sendId:item.sendId,
									receiverId:item.receiverId,
								});
							}
						}
						uni.setStorageSync('msg',that.msgList)
						that.scrollTop += 100;
					},
				})
			},
			
			//-----------------------------已读操作-----------------------------
			updateState(e){
				uni.request({
					url:this.$all.getUrl()+this.$all.Inter_friendList.readMessage.url,
					data:{
						id:e,
					},
					method:this.$all.Inter_friendList.readMessage.method,
					success : res =>{
						// console.log(res);
					},
				})
			},
			
			//-----------------------------时间格式化-----------------------------
			formatTime: function(time) {
				var date=new Date();
				var currentDate1=JSON.stringify(date).substring(1,11);
				var arry1  = currentDate1.split("-");
				var year1 = parseInt(arry1[0],10);
				var month1 = parseInt(arry1[1],10);
				var day1 = parseInt(arry1[2],10); 
				//根据传入的时间
				var dateTime = time.replace('T', ' ');
				var currentDate2=JSON.stringify(dateTime).substring(1,11);
				var arry2 = currentDate2.split("-");
				var year2 = parseInt(arry2[0],10);
				var month2 = parseInt(arry2[1],10);
				var day2 = parseInt(arry2[2],10);
				if(year1==year2&&month1==month2&&day1==day2){
					if (dateTime.indexOf('1900') > -1) {
						return '';
					} else {
						dateTime=JSON.stringify(dateTime).substring(11,17);
						return dateTime;
					}
				}else{
					dateTime=JSON.stringify(dateTime).substring(1,17);
					return dateTime;
				}
			},
			
			//-----------------------------发送文字消息-----------------------------
			sendText(){
				if(this.msgText==''){
					return;
				}else{
					var date=new Date();
					uni.request({
						url:this.$all.getUrl()+this.$all.Inter_friendList.sendMessage.url,
						data:{
							sendName:this.userInfo.userName,
							content:this.msgText,
							receiver:this.userInfo.userName,
							sendId:this.userInfo.userId,
							receiverId:this.friendId.userId,
						},
						method:this.$all.Inter_friendList.sendMessage.method,
						success:res =>{
							if(res.data.status){
								this.scrollTop += 100;
								this.getMsgList();
								this.msgText = '';
							}else{
								uni.showToast({
									title: '发送失败',
									icon:'none'
								});
							}
						}
					})
				}
			},
		}
	}	
</script>

<style lang="scss">
	page{
		background-color: #e5e5e5;
	}
	.content{
		width: 100%;
	}
	
	.msg-list{
		width: 96%;
		padding: 0 2%;
		position: absolute;
		top:0;
		bottom: 120upx;
	}
	
	.my{//我发送的信息
		.boxClass{
			display: flex;
			flex-direction: row-reverse;
			.left{//头像
				background-color: transparent;
				padding:0;
				image{
					max-width: 100rpx;
					max-height: 100rpx;
					border-radius: 12rpx;
				}
			}
			.right{//内容
				margin-top: 17rpx;
				margin-left: 30%;
				margin-right: 20rpx;
				.bubble{
					background-color: #f06c7a;
					padding: 15rpx 20rpx;
					border-radius: 15rpx;
					font-size: 32rpx;
					display: flex;
					align-items: center;
					word-break: break-word;
					
				}
			}
		}
	}
	
	.other{//别人发送的信息
		.boxClass{
			display: flex;
			flex-direction: row;
			.left{//头像
				margin-top: 5rpx;
				background-color: transparent;
				padding:0;
				image{
					max-width: 100rpx;
					max-height: 100rpx;
					border-radius: 12rpx;
				}
			}
			.right{//内容
				font-size: 32rpx;
				margin-left: 20rpx;
				margin-right: 30%;
				display: flex;
				flex-direction: column;
				.username{
					font-size: 24upx;
					color: #999;
					display: flex;
					margin-bottom: 10rpx;
				}
				.bubble{
					background-color: #ffffff;
					padding: 15rpx 20rpx;
					border-radius: 15rpx;
					display: flex;
					align-items: center;
					word-break: break-word;
				}
			}
		}
	}
	
	.bottomBox{
		width: 100%;
		position: fixed;
		display: flex;
		flex-direction: row;
		bottom: 0;
		background-color: #f2f2f2;
		.inputClass{
			width: 80%;
			margin: 20rpx 3% 0 5%;
			font-size: 36rpx;
			padding: 7rpx 20rpx;
			background-color: #FFFFFF;
			border-radius: 35rpx;
			color: #000000;
		}
		.send{
			padding-right: 4%;
			width: 100upx;
			height: 100upx;
			display: flex;
			align-items: center;
			.btn{
				width: 90upx;
				height: 56upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background:linear-gradient(to right,#004eec,#0050f1);
				color: #fff;
				border-radius: 6upx;
				font-size: 24upx;
			}
		}
	}
	
	/* 隐藏滚动条 */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	.time{
		width: 100%;
		text-align: center;
		color: #999;
		font-size: 26rpx;
		margin: 15rpx 15rpx;
	}
</style>
