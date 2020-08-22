<template>
	<view>
		<!-- 业务选择 -->
		<view class="business-view">
			<view class="top-text">
				设备名称
			</view>
			<view class="tx_text">{{Remark}} - {{Code}}</view>
			<!-- <view class="business-type">
				<radio-group @change="radioChange">
					<view v-for="(item,index) in types" :key="item.value">
						<view v-if="item.check" class="type">
							<view class="business-text">{{item.name}}</view>
							<view class="radio">
								<radio :value="item.value" :checked="index === current" color="#4CD964" />
							</view>
						</view>
					</view>
				</radio-group>
				<view v-if="!openType1" class="shangjiantou" @click="openList(1)">
					<image src="../static/shangjiantou.png" class="jiantou"></image>
				</view>
				<view v-if="openType1" class="shangjiantou" @click="closeList(1)">
					<image src="../static/xiajiantou.png" class="jiantou"></image>
				</view>
			</view> -->
		</view>
		<!-- 问题选择 -->
		<view class="problem-view">
			<view class="top-text2">
				<text style="font-weight: bold;">问题选择</text>
				<text class="top-text-right">（可选三项）</text>
			</view>
			<view class="problem-text">
				快速处理，精准分类
			</view>
			<!-- 问题类型 -->
			<view style="display: flex;flex-direction: row;flex-wrap: wrap;margin-top: 24upx;">
				<view v-for="(item,index) in Typetext" :key="index" @click="change(index)">
					<view class="top-view-Type" v-if="item.check">
						<view v-if="!item.checked" class="fontStyle">{{item.text}}</view>
						<view v-if="item.checked" class="changefontStyle">{{item.text}}</view>
					</view>
				</view>
				<view class="jiantou1">
					<view v-if="!openType2" class="shangjiantou1" @click="openList(2)">
						<image src="../static/xiajiantou.png" class="jiantou"></image>
					</view>
					<view v-if="openType2" class="shangjiantou1" @click="closeList(2)">
						<image src="../static/shangjiantou.png" class="jiantou"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 问题描述 -->
		<view class="problem-info">
			<view class="top-text">
				建议描述
			</view>
			<!-- 建议描述文本域 -->
			<view class="problem-textare-view">
				<textarea v-model="complaintInfo" class="problem-textare" placeholder="请描述问题，让维修人员更快帮您解决问题" maxlength="500" @input="Inputtext" />
				</view>
			<!-- 字数统计 -->
			<view class="top-view-bottomtext">
				{{textmarn}}/500字
			</view>
		</view>
		<!-- 提交 -->
		<view v-if="!btncheck" class="btnClass changecolor1" hover-class="hover" @click="successClick2">提交</view>
		<view v-if="btncheck" class="btnClass changecolor2" hover-class="hover2" @click="successClick">提交</view>
	</view>
</template>

<script>
	import $Sbjg from "@/common/sbjg.js"
	export default {
		data() {
			return {
				complaintInfo:'',
				choice:'出租车',
				openType1:false,//默认不开启列表
				openType2:false,//默认不开启列表
				current:0,
				textmarn:0,//字数
				btncheck:false,//默认提交按钮样式
				types: [{
						value: 'Traditional',
						name: '传统客运',
						check:true
					},
					{
						value: 'Customized',
						name: '定制巴士',
						check:true
					},
					{
						value: 'taxi',
						name: '出租车',
						check:false
					},{
						value: 'Special',
						name: '专线车',
						check:false
					},
					{
						value: 'Free',
						name: '顺风车',
						check:false
					},
					{
						value: 'Charter',
						name: '包车服务',
						check:false
					},
					{
						value: 'Tourism',
						name: '旅游服务',
						check:false
					}
					
					
				],
				typetext:[],//储存问题选择数据
				//类型文字
				Typetext:[
					{
						text:'硬件故障',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:true//判断是否显示
					},
					{
						text:'软件故障',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:true//判断是否显示
					},
					{
						text:'主板故障',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:true//判断是否显示
					},
					{
						text:'电源故障',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:false//判断是否显示
					},
					{
						text:'屏幕故障',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:false//判断是否显示
					},
					{
						text:'内存问题',
						checked:false,//判断是否选中
						btncheck:false,//判断提交是否变色
						check:false//判断是否显示
					}
				],
				AID:'',
				Remark:'',
				Code:'',
				datestring:'',
			}
		},
		onLoad(param) {
			this.AID = param.AID;
			this.Remark = param.Remark;
			this.Code = param.Code;
			this.currentTime();
		},
		methods: {
			openList:function(e){
				console.log(e);
				if(e == 1)
				{
					for(var i=0;i<this.types.length;i++){
					this.types[i].check=true;
					}
				this.openType1=true;
				}
				if(e == 2)
				{
					for(var i=0;i<this.Typetext.length;i++){
						this.Typetext[i].check=true;
					}
					this.openType2=true;
					}
			},
			closeList:function(e){
				if(e==1)
				{
					for(var i=0;i<this.types.length;i++){
					if(i>1){
						this.types[i].check=false;
					}
				}
				this.openType1=false;
				}
				if(e==2)
				{
					for(var i=0;i<this.Typetext.length;i++){
						if(i>2){
							this.Typetext[i].check=false;
						}
					}
					this.openType2=false;
				}
			},
			// radio单选框
			radioChange: function(e) {
				console.log(e.detail.value);
				for (let i = 0; i < this.types.length; i++) {
					if (this.types[i].value === e.target.value) {
						this.current = i;
						this.choice = this.types[i].name;
						break;
					}
				}
			},
			//问题选择
			change:function(e) {
					var that =this;
					for (var i = 0; i < that.Typetext.length; i++) {
						if (e == i) {
							if(that.Typetext[i].checked == false)
							{
								if(!that.Typetext[i].check){
									
								}else if(that.typetext.length<3){
									that.Typetext[i].checked = true;
									that.btncheck=true;
									that.typetext.push(that.Typetext[i].text);
								}else{
									uni.showToast({
										icon:'none',
										title:'意见类型最多选中3个'
									})
								}
							}
							else{
								that.Typetext[i].checked = false;	
								var index = that.typetext.findIndex(item => {
								    if (item ==that.Typetext[e].text) {
											return true;
										}
									})
								that.typetext.splice(index,1);
							}
						}
					}
					console.log(that.typetext);
					var list=that.Typetext.filter(item => {
						return item.checked == true;
					})
					if(list.length==0){
						that.btncheck=false;
					}
			},
			//字数统计
			Inputtext:function(e){
				var that = this;
				that.textmarn=e.detail.cursor; 
			},
			
			//------------------------请选择问题----------------------------
			successClick2: function() {
				uni.showToast({
					title: '请选择问题',
					icon: 'none'
				})
			},
			
			//------------------------获取当前时间----------------------------
			currentTime:function(){
				
				//获取当前时间
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate() + 2;
				var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day; //当前年月日时分
				this.datestring = timer; //截取日期
				console.log('获取当前时间',this.datestring)
			},
			
			//------------------------提交数据----------------------------
			successClick:function(){
				uni.showLoading({
					title:'提交中...'
				})
				uni.request({
					url: $Sbjg.SbjgInterface.AddStateBy.Url,
					method: $Sbjg.SbjgInterface.AddStateBy.method,
					header: $Sbjg.SbjgInterface.AddStateBy.header,
					data: {
						SettingAID: this.AID,
						OperationTime: this.datestring,
						// OperationUser: ,
						// State: ,
						// Repairer:,
						Remark:this.complaintInfo
					},
					success: (res) => {
						console.log(res)
						if (res.data.status== true) {
							uni.hideLoading()
							uni.showToast({
								title:'报修成功',
								icon: 'success',
							})
							if(that.Remark==''){
								setTimeout(function(){
									uni.navigateBack();
								},2000);
							}
						} else {
							uni.hideLoading()
							uni.showToast({
								title:'报修失败，服务器异常',
								icon: 'none',
							})
						}
				
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title:'网络异常，请重试',
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F6F8;
	}
	
	.business-view {
		/* height: 319upx; */
		background-color: #FFFFFF;
		margin: 30upx 28upx;
		border-radius: 20upx;
	}

	.top-text {
		font-size: 34upx;
		color: #333333;
		margin-left: 30upx;
		padding-top: 25upx;
		padding-bottom: 10upx;
		font-weight: bold;
	}
	.top-text2 {
		font-size: 34upx;
		color: #333333;
		margin-left: 30upx;
		padding-top: 25upx;
		font-weight: 500;
	}
	.tx_text{
		font-size: 28upx;
		color: #555555;
		margin-left: 30upx;
		padding: 40upx 0;
		padding-top: 16rpx;
		width: 630upx;
		text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
		white-space: nowrap;
		overflow: hidden;
	}
	.business-type {
		margin-left: 30upx;
		margin-right: 30upx;
		
	}

	.business-text {
		font-size: 32upx;
	}

	.radio {
		position: absolute;
		right: 0;
	}

	.type {
		margin-top: 30upx;
		display: flex;
		position: relative;
	}
	
	.problem-view{
		/* height: 510upx; */
		border-radius: 20upx;
		background-color: #FFFFFF;
		margin: 30upx 28upx;
	}
	.top-text-right{
		color: #999999;
		font-size: 28upx;
		margin-left: 12upx;
	}
	.problem-text{
		color: #999999;
		font-size: 28upx;
		margin-left: 30upx;
		margin-top: 15upx;
	}
	.top-view-Type{
		width: 193upx;
		/* height: 68upx; */
		border-radius: 34upx;
		background-color: #ECEEF0;
		margin-left: 29upx;
		margin-top: 30upx;
		text-align: center;
		line-height: 63upx;
	}
	.fontStyle{
		font-size: 28upx;
		color: #2C2D2D;
		width: 100%;
		text-align: center;
	}
	.changefontStyle{
		font-size: 28upx;
		  color: #FFFFFF;
		  background-color: #5694fb;
		  width: 100%;
		  text-align: center;
		  border-radius: 34upx;
	}
	.problem-info{
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin:0 28rpx 30rpx 28rpx;
	}
	.problem-textare-view{
		margin-left: 30upx;
		margin-top: 10upx;
	}
	.problem-textare{
		width: 634upx;
		height: 160upx;
		font-size: 28upx;
	}
	.top-view-bottomtext{
		font-size: 28upx;
		color: #AAAAAA;
		text-align: right;
		padding: 40upx;
/* 		position: absolute;
		left: 539upx;
		top: 589upx; */
	}
	
	.btnClass{
		text-align: center;
		font-size: 34upx;
		border-radius: 20upx;
		padding: 30upx 0;
		margin: 0 28upx;
	}
	.changecolor1{
		background-color: #FFFFFF;
		color: #999999;
	}
	.changecolor2{
		background-color: #5694fb;
		color: #FFFFFF;
	}
	.jiantou{
		width: 28upx;
		height: 13upx;
	}
	.shangjiantou{
		margin-top: 20upx;
		margin-left: 302upx;
		padding-bottom: 20upx;
	}
	.jiantou1{
		padding: 24upx 0;
		width: 100%;
		text-align: center;
	}
	
	.hover{
		transition: all .3s; //过度
		border-radius: 24upx;
		opacity: 0.1;
		color: #FFFFFF;
		background: #5694fb;
	}
	
	.hover2{
		transition: all .3s; //过度
		border-radius: 24upx;
		opacity: 0.6;
		color: #FFFFFF;
		background: #5694fb;
	}
	
</style>
