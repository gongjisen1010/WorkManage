<template>
	<view class="content">
		<view class="mt">
			<view v-for="(item,index) in ipList" :key="index" class="itemClass" @click="selectIP(index)">
				<text class="timeClass">{{item.addTime}}</text>
				<view class="boxClass" :class="{'border': List.indexOf(index)!=-1}">
					<view class="nameClass commonClass">添加人：{{item.userName}}</view>
					<view class="commonClass">ip地址：{{item.ipAddress}}</view>
					<view class="commonClass">端口号：{{item.portNumber}}</view>
				</view>
				<image v-if="item.checked" src="../../static/PersonCenter/checked.png" class="imgClass"></image>
			</view>	
		</view>	
		
		<view class="bottomBox">
			<button class="btnClass bc_blue" @click="switchIP">确定</button>
			<button class="btnClass bc_blue" @click="editIP">编辑</button>
			<button class="btnClass bc_blue" @click="addIP">添加</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				List:[], //选中的ip下标列表
				index:-1, //默认为-1，ipList的下标
				selecterIP:'',//选中的ip
				ipList:[],//ip列表
			}
		},
		onShow() {
			this.List=[];
			this.selecterIP='';
			let ip=uni.getStorageSync('ipAddress')||'';
			console.log(ip);
			uni.getStorage({
				key:'ipList',
				success: (res) => {
					for(var i = 0; i<res.data.length; i++){
						if(ip.ipAddress==res.data[i].ipAddress){
							res.data[i].checked = true;
						}else{
							res.data[i].checked = false;
						}
					}
					let list=[];
					for(var n = 0; n<res.data.length; n++){
						if(res.data[n].checked){
							list.unshift(res.data[n]);
						}else{
							list.push(res.data[n]);
						}
					}
					this.ipList=list;
				}
			})
		},
		methods:{
			//--------------------------选中的ip--------------------------
			selectIP(e){
				if (this.List.indexOf(e) == -1) {
					this.List=[];
					console.log(e)//打印下标
					this.List.push(e);//选中添加到数组里
					this.index=e;
					this.selecterIP=this.ipList[e];
				} else {
					this.List.splice(this.List.indexOf(e), 1); //取消
					this.index=-1;
				}
			},
			
			//--------------------------确定选中的ip--------------------------
			switchIP(){
				if(this.selecterIP==''){
					uni.showToast({
						title:'请选择IP',
						icon:'none'
					})
				}else{
					uni.setStorageSync('ipAddress',this.selecterIP)
					uni.navigateBack();
				}
			},
			
			//--------------------------编辑选中的ip--------------------------
			editIP(){
				if(this.selecterIP==''){
					uni.showToast({
						title:'请选择IP',
						icon:'none'
					})
				}else{
					uni.setStorageSync('editIP',this.selecterIP)
					uni.navigateTo({
						url:'./addIp?type=edit'
					})
				}
			},
			
			//--------------------------添加ip--------------------------
			addIP(){
				uni.navigateTo({
					url:'./addIp?type=add'
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	
	.mt{
		margin-bottom:150upx;
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
		padding-bottom: 20upx;
		.nameClass{
			font-weight: bold;
			font-size: 36upx;
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
		width: 40upx;
		height: 40upx;
		position:absolute;
		top:170upx;
		right:10%;
	}
	
	.bottomBox{
		width: 100%;
		background-color: #f5f5f5;
		position: fixed;
		bottom: 0;
		height: 140upx;
		display: flex;
		flex-direction: row;
	}
	.btnClass{
		width: 30%;
		margin-top: 35upx;
		font-size: 30upx;
		color: #FFFFFF;
		height: 80upx;
		line-height: 80upx;
	}
	
	//选中司机的样式
	.border{
		border: 2upx solid #5564e8;
	}
</style>
