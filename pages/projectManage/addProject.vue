<template>
	<view class="content">
		<view class="mb">
			<view class="itemClass">
				<view class="titleClass">项目名称</view>
				<textarea class="development" auto-height="true" placeholder="请填写项目名称(必填)" maxlength="200" v-model="projectName"/>
			</view>
			<view class="itemClass">
				<view class="titleClass widthClass">客户公司名称</view>
				<textarea class="development" auto-height="true" placeholder="请填写客户公司名称(必填)" maxlength="200" v-model="customerCompany"/>
			</view>
			<view class="itemClass rowClass">
				<view class="titleClass">开发部门</view>
				<picker class="inputClass" name="reportType"  mode="selector" @change="departmentChange" :range="departmentList" :value="departmentIndex">
					{{department}}
				</picker>	
			</view>
			<view class="itemClass rowClass">
				<view class="titleClass">开始时间</view>
				<view class="inputClass">
					<biaofun-datetime-picker placeholder="请选择开始时间" start="2000-01-01" :defaultValue="startDate"
						end="2100-01-01" fields="day" @change="changeDatetimePicker"></biaofun-datetime-picker>
				</view>
			</view>
			<view class="itemClass rowClass">
				<view class="titleClass">开发周期</view>
				<input class="inputClass" name="developPeriod" v-model="developPeriod" placeholder="请填写开发周期" />
			</view>
			<view class="itemClass">
				<view class="titleClass">开发情况</view>
				<textarea class="development" auto-height="true" placeholder="请填写开发情况(非必填)" maxlength="200" v-model="development"/>
			</view>
			<view v-if="type=='edit'" class="itemClass rowClass">
				<view class="titleClass">添加人</view>
				<text class="inputClass">{{userName}}</text>
			</view>
			<view v-if="type=='edit'" class="itemClass rowClass">
				<view class="titleClass1">上次保存时间</view>
				<text class="inputClass1">{{formateTime(nowTime)}}</text>
			</view>
		</view>
		
		<view class="bottomBox" :class="type=='edit'?'fd':''">
			<button class="bc_blue" :class="type=='edit'?'btnClass1':'btnClass2'"  @click="submitProject">提交</button>
			<button v-if="type=='edit'" class="btnClass1 bc_blue"  @click="deleteProject">删除</button>
		</view>
	</view>
</template>

<script>
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	import utils from '@/common/utils.js'; // 封装的工具集
	export default{
		components: {
			biaofunDatetimePicker
		},
		data(){
			return{
				id:"",				//id
				projectName:"",  	//项目名称
				customerCompany:'',		//客户公司名称
				
				department:'技术开发部',			//开发部门
				departmentIndex:0,				//选中开发部门的下标
				departmentList:["技术开发部"],	//开发部门列表
				
				startDate:'',				 //开始时间
				developPeriod:'',			//开发周期
				development:'',				//开发情况
				userName:'',				//修改人
				nowTime:'',			//当前时间
				
				type:'',			//操作类型
			}
		},
		onLoad(options) {
			this.type = options.type;
			if(this.type=='edit'){
				uni.getStorage({
					key:'projectDetail',
					success: (res) => {
						this.id=res.data.id;
						this.projectName=res.data.projectName;
						this.customerCompany=res.data.customerCompany;
						this.department=res.data.department;
						this.startDate=this.formateTime(res.data.startDate);
						this.developPeriod=res.data.developPeriod;
						this.development=res.data.development;
						this.userName=res.data.userName;
						this.nowTime=res.data.updateTime;
						uni.removeStorageSync('projectDetail');
						uni.setNavigationBarTitle({
							title:res.data.projectName,
						})
					},
					fail: (err) => {
						uni.setNavigationBarTitle({
							title:"暂无项目",
						})
						uni.showToast({
							title:'加载项目信息失败！',
							icon:'none'
						})
					}
				})
			}else if(this.type=='add'){
				uni.setNavigationBarTitle({
					title:"添加项目",
				})
			}
			
		},
		onShow() {

		},
		methods:{
			//---------------------------加载当前时间---------------------------
			loadTime(){
				var myDate = new Date();
				let date = utils.formatDate(myDate);
				return `${date.YYYY}-${date.MM}-${date.DD} ${date.hh}:${date.mm}`
			},
			
			//---------------------------选择部门---------------------------
			departmentChange(e){
				this.departmentIndex=e.detail.value;
				this.department=this.departmentList[e.detail.value];
			},
			
			//---------------------------选择开始时间---------------------------
			changeDatetimePicker(date) {
				this.startDate=date.f1;
			},
			
			//---------------------------提交报告---------------------------
			submitProject(){
				if(this.projectName==""){
					uni.showToast({
						title:'请填写项目名称',
						icon:'none'
					})
				}else if(this.customerCompany==""){
					uni.showToast({
						title:'请填写客户公司名称',
						icon:'none'
					})
				}else if(this.startDate==""){
					uni.showToast({
						title:'请选择开始时间',
						icon:'none'
					})
				}else if(this.developPeriod==""){
					uni.showToast({
						title:'请填写开发周期',
						icon:'none'
					})
				}else{
					//请求接口
					uni.showLoading({
						mask:true,
						title:'提交中，请稍候...'
					})
					if(this.type=='edit'){
						this.editProject();
					}else if(this.type=='add'){
						this.addProject();
					}else{
						uni.hideLoading();
					}
				}
			},
			
			//---------------------------添加报告---------------------------
			addProject(){
				uni.request({
					url:this.$all.getUrl() + this.$all.Inter_projcet.addProject.url,
					method:this.$all.Inter_projcet.addProject.method,
					data:{
						projectName:this.projectName,
						customerCompany:this.customerCompany,
						department:this.department,
						startDate:this.startDate,
						developPeriod:this.developPeriod,
						development:this.development,
						userName:'测试用户',
						updateTime:this.loadTime(),
						userId:'101037',
					},
					success: (res) => {
						console.log(res);
						uni.hideLoading();
						if(res.data.status){
							uni.showToast({
								title:res.data.msg,
							})
							setTimeout(function(){
								uni.navigateBack();
							},300)
						}
					}
				})
			},
			
			//---------------------------编辑报告---------------------------
			editProject(){
				uni.request({
					url:this.$all.getUrl() + this.$all.Inter_projcet.editProject.url,
					method:this.$all.Inter_projcet.editProject.method,
					data:{
						projectName:this.projectName,
						customerCompany:this.customerCompany,
						department:this.department,
						startDate:this.startDate,
						developPeriod:this.developPeriod,
						development:this.development,
						userName:'测试用户',
						updateTime:this.loadTime(),
						userId:'101037',
						id:this.id,
					},
					success: (res) => {
						uni.hideLoading();
						console.log(res);
						if(res.data.status){
							uni.showToast({
								title:res.data.msg,
							})
							setTimeout(function(){
								uni.navigateBack();
							},300)
						}
					}
				})
			},
			
			//---------------------------删除报告---------------------------
			deleteProject(){
				uni.showModal({
					title:'温馨提示',
					content:'确定删除该项目吗？',
					success: (e)=>{
						if(e.confirm){
							uni.request({
								url:this.$all.getUrl() + this.$all.Inter_projcet.deleteProject.url,
								method:this.$all.Inter_projcet.deleteProject.method,
								data:{
									id:this.id,
								},
								success: (res) => {
									console.log(res);
									if(res.data.status){
										uni.showToast({
											title:res.data.msg,
										})
										setTimeout(()=>{
											uni.navigateBack();
										}, 300)
									}
								}
							})
						}
					}
				})
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
	.inputClass{
		width: 70%;
		padding-top: 28upx;
		text-align: right;
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
	.titleClass{
		width: 20%;
		padding: 30upx 3%;
	}
	.widthClass{
		width: 100%;
	}
	.development{
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
