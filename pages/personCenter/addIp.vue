<template>
	<view class="content">
		<view class="mb">
			<view class="itemClass rowClass">
				<view class="titleClass">IP地址</view>
				<view v-if="type=='add'" class="httpClass">http://</view>
				<input :class="type=='add'?'inputClass1':'inputClass'" v-model="ipAddress" placeholder="请填写IP地址" />
			</view>
			<view class="itemClass rowClass">
				<view class="titleClass">端口号</view>
				<input type="number" class="inputClass" v-model="portNumber" placeholder="请填写端口号" />
			</view>
			<view class="itemClass rowClass">
				<view class="titleClass">添加人</view>
				<text class="inputClass">{{userName}}</text>
			</view>
			<view v-if="type=='edit'" class="itemClass rowClass">
				<view class="titleClass">保存时间</view>
				<text class="inputClass">{{addTime}}</text>
			</view>
		</view>
		
		<view class="bottomBox" :class="type=='edit'?'fd':''">
			<button class="bc_blue" :class="type=='edit'?'btnClass1':'btnClass2'"  @click="submitIP">提交</button>
			<button v-if="type=='edit'" class="btnClass1 bc_blue"  @click="deleteIP">删除</button>
		</view>
	</view>
</template>

<script>
	import utils from '@/common/utils.js'; // 封装的工具集
	export default{
		data(){
			return{
				type:'', //判断是编辑还是添加
				ipAddress:'', 	//IP地址
				portNumber:'',	//端口号
				userName:'临时添加',	//添加人
				addTime:'',		//保存时间
				id:'',			//编辑删除时用到
				list:[],		//读取缓存的ipList
			}
		},
		onLoad(options) {
			this.list = uni.getStorageSync('ipList') || [];
			let title = '';
			this.type = options.type;
			if(options.type == 'edit'){
				uni.getStorage({
					key:'editIP',
					success:(res)=>{
						this.loadIP(res.data);
					},
					fail: (err) => {
						console.log(err);
					}
				})
				title = '编辑IP';
			}else if(options.type == 'add'){
				title='添加IP';
			}
			uni.getStorage({
				key:'userInfo',
				success: (res) => {
					this.userName=res.data.userName;
				}
			})
			uni.setNavigationBarTitle({
				title:title,
			})
		},
		onUnload() {
			uni.removeStorageSync('editIP');
		},
		methods:{
			//---------------------------加载IP---------------------------
			loadIP(data){
				this.ipAddress=data.ipAddress;	
				console.log(this.ipAddress,"111");
				this.portNumber=data.portNumber; 	
				this.userName=data.userName; 	
				this.addTime=data.addTime;	
				this.id=data.id;			
			},
			
			//---------------------------加载当前时间---------------------------
			loadTime(){
				var myDate = new Date();
				let date = utils.formatDate(myDate);
				return `${date.YYYY}-${date.MM}-${date.DD} ${date.hh}:${date.mm}`
			},
			
			//---------------------------检查ip是否存在ipList中---------------------------
			checkIP(ip,portNumber){
				if(this.list != []){
					var index = this.list.findIndex(item =>{
						return item.ipAddress == ip && item.portNumber == portNumber;
					});
					if(index == -1){
						return false;//不存在
					}else{
						return true;//存在
					}
				}else{
					return false;//不存在
				}
			},
			
			//---------------------------保存ip---------------------------
			submitIP(){
				let ip = '';
				if(this.type == 'edit'){
					ip = this.ipAddress;
				}else if(this.type == 'add'){
					ip = "http://" + this.ipAddress;
				}
				if(this.checkIP(ip,this.portNumber)){
					uni.showToast({
						title:'该IP已存在，请重新填写',
						icon:'none',
					})
				}else{
					if(this.type == 'add'){
						var arr = {
							id:this.getRandomId(),
							userName:this.userName,
							ipAddress:ip,
							portNumber:this.portNumber,
							addTime:this.loadTime(),
						}
						this.list.push(arr);
						uni.setStorageSync('ipList',this.list);
						uni.showToast({
							title:'添加成功！'
						})
					}else if(this.type == 'edit'){
						var index = this.list.findIndex(item =>{
							return item.id == this.id;
						});
						this.list.splice(index,1);
						var arr = {
							id:this.id,
							userName:this.userName,
							ipAddress:ip,
							portNumber:this.portNumber,
							addTime:this.loadTime(),
						}
						this.list.push(arr);
						uni.setStorageSync('ipList',this.list);
						uni.showToast({
							title:'修改成功！'
						})
					}
					setTimeout(()=>{
						uni.navigateBack();
					}, 500)
				}
			},
			
			//---------------------------删除ip---------------------------
			deleteIP(){
				uni.showModal({
					title:'温馨提示',
					content:'确定删除吗？',
					success: (e)=>{
						if(e.confirm){
							var index = this.list.findIndex(item =>{
								return item.id == this.id;
							});
							this.list.splice(index,1);
							uni.setStorageSync('ipList',this.list);
							uni.showToast({
								title:'删除成功！'
							})
							setTimeout(()=>{
								uni.navigateBack();
							}, 500)
						}
					}
				})
			},
			
			//---------------------------生成随机的id---------------------------
			getRandomId(){
				let randomLength = 18;//生成18位的随机id
				return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36);
			},
		}
	}
</script>

<style lang="scss">
	.mb{
		width: 100%;
		margin-bottom: 150upx;
	}
	.itemClass{
		background-color: #FFFFFF;
		width: 100%;
		margin-bottom: 20upx;
	}
	.httpClass{
		position: absolute;
		left: 42%;
		top: 30upx;
	}
	.rowClass{
		display: flex;
		flex-direction: row;
	}
	.inputClass{
		width: 70%;
		padding-top: 28upx;
		text-align: right;
	}
	.inputClass1{
		margin-left: 30%;
		width: 40%;
		padding-top: 28upx;
		text-align: right;
	}
	.titleClass{
		width: 20%;
		padding: 30upx 3%;
	}
	
	.bottomBox{
		width: 100%;
		background-color: #f5f5f5;
		position: fixed;
		bottom: 0;
		height: 140upx;
	}
	.fd{
		display: flex;
		flex-direction: row;
	}
	.btnClass1{
		width: 40%;
		margin-top: 35upx;
		font-size: 30upx;
		color: #FFFFFF;
		height: 80upx;
		line-height: 80upx;
	}	
	.btnClass2{
		width: 90%;
		margin-top: 20upx;
		color: #FFFFFF;
	}
</style>
