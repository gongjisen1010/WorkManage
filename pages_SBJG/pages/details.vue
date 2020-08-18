<template>
	<view class="dt_top">
		<image class="top_image" src="../../static/HOME/beijin2.png" mode="aspectFill"></image>
		<view class="tp_outerLayer">
			<view class="ol_image">
				<image class="im_image" src="../static/baobanji.png" mode="aspectFit"></image>
			</view>
			
			<view class="ol_equipmentStatus">
				<text class="es_text">设备状态</text>
				<text class="es_text2" v-if="parameter.Online==true">硬件在线</text>
				<text class="es_text3" v-if="parameter.Online==false">硬件离线</text>
				<text class="es_text2" v-if="parameter.Online==true">软件正常</text>
				<text class="es_text3" v-if="parameter.Online==false">软件异常</text>
			</view>
			
			<view class="ol_networkStatus">
				<text class="ns_text">设备状态</text>
				<text class="ns_text2" v-if="parameter.Online==true">外网正常</text>
				<text class="ns_text3" v-if="parameter.Online==false">外网异常</text>
				<text class="ns_text2" v-if="parameter.Online==true">内网正常</text>
				<text class="ns_text3" v-if="parameter.Online==false">内网异常</text>
			</view>
			
			<view class="ol_ticketSalesAmount">
				<text class="tsa_text" v-if="parameter.Online==true">{{emptyTicketReset(ticketSum)}}/{{emptyTicketReset(moneySum)}}</text>
				<text class="tsa_text" v-if="parameter.Online==false">---/---</text>
				<view style="display: flex;">
					<image class="tsa_icon" src="../static/shoupiao.png" mode="aspectFill"></image>
					<text class="tsa_text2">售票数/金额</text>
				</view>
			</view>
			
			<view class="ol_cpuConsumption">
				<text class="cc_text" v-if="parameter.Online==true">78%</text>
				<text class="cc_text" v-if="parameter.Online==false">---</text>
				<view style="display: flex;">
					<image class="cc_icon" src="../static/cpu.png" mode="aspectFill"></image>
					<text class="cc_text2">CPU利用率</text>
				</view>
			</view>
			
			<view class="ol_cpuTemperature">
				<text class="ct_text" v-if="parameter.Online==true">56°C</text>
				<text class="ct_text" v-if="parameter.Online==false">---</text>
				<view style="display: flex;">
					<image class="ct_icon" src="../static/wendu.png" mode="aspectFill"></image>
					<text class="ct_text2">CPU温度</text>
				</view>
			</view>
			
			<view class="ol_seeMore">
				<text class="ct_text" @tap="checkAttention">查看更多></text>
			</view>
			<!-- <view class="im_abnormal">
				<image class="al_image" src="../../static/yicang.png" mode="aspectFill"></image>
				<text class="al_text">设备异常</text>
			</view> -->
			
			<!-- 现状图 -->
			<view class="ol_LineChart">
				<!-- 折线Line纯数字-->
				<view class="line">
					<line-chart ref="lineData2" canvasId="index_line_2" :dataAs="lineData2" />
				</view>
				<!-- 折线Line带百分比 -->
				<view class="line">
					<line-chart
						canvasId="index_line_1"
						ref="lineData1"
						:dataAs="lineData"
						:yAxisAs="{
							formatter: {
								type: 'percent', //type:number percent String,额外参数:fixed:NUmber,name:String
								fixed: 2
							}
						}"
					/>
				</view>
				
				
			</view>
			
			<!-- 状态 -->
			<!-- <view class="zl_click">
				<view class="zl_topClick"> -->
					<!-- 设备区域 -->
					<!-- <view class="zl_independentTravel">
						<text class="zl_itText">在线</text>
					</view> -->
					<!-- 在线状态	 -->
					<!-- <view class="zl_independentTravel2">
						<text class="zl_itText2">异常</text>
						<text class="zl_stateText">网络状态</text>
					</view> -->
					<!-- 设备分布 -->
					<!-- <view class="zl_independentTravel3">
						<text class="zl_itText3">{{frequency}}次</text>
						<text class="zl_stateText2">维修次数</text>
					</view>
				</view>
			</view> -->
			
			<!-- cpu状态 -->
			<!-- <view class="zl_click2">
				<view class="zl_topClick2"> -->
					<!-- 设备区域 -->
					<!-- <view class="zl_independentTravel">
						<text class="zl_itText">{{numberTickets}}张</text>
						<text class="zl_stateText">售票数</text>
					</view> -->
					<!-- 在线状态	 -->
					<!-- <view class="zl_independentTravel2">
						<text class="zl_itText2">{{cpu}}</text>
						<text class="zl_stateText2">CPU占用率</text>
					</view> -->
					<!-- 设备分布 -->
					<!-- <view class="zl_independentTravel3">
						<text class="zl_itText3">{{abnormalTimes}}次</text>
						<text class="zl_stateText3">异常次数</text>
					</view>
				</view> -->
				<!-- <view class="zl_bottomPopup">
					<text class="bp_text" @tap="checkAttention">查看更多></text>
				</view>
			</view> -->
			
			<!-- 按钮 -->
			<view>
				<view class="ol_shutDown" hover-class="ol_hover"  @click="equipmentShutDown">
					<image class="sd_icon" style="width: 30upx;" src="../static/guanji.png" mode="aspectFit"></image>
					<text class="sd_text">设备关机</text>
				</view>
				<view class="ol_shutDown" hover-class="ol_hover" @click="equipmentRestart">
					<image class="sd_icon" style="width: 36upx;" src="../static/chongqi.png" mode="aspectFit"></image>
					<text class="sd_text">设备重启</text>
				</view>
				<view class="ol_shutDown" hover-class="ol_hover" @click="notYetOpen">
					<image class="sd_icon" style="width: 30upx;" src="../static/zijian.png" mode="aspectFit"></image>
					<text class="sd_text">设备自检</text>
				</view>
				<view class="ol_shutDown" hover-class="ol_hover" style="margin-bottom: 56upx;" @click="notYetOpen">
					<image class="sd_icon" style="width: 36upx;" src="../static/dengji.png" mode="aspectFit"></image>
					<text class="sd_text">保修登记</text>
				</view>
				<!-- <view class="ol_register"></view> -->
			</view>
			
			
		</view>
		
		<!-- 查看须知popup -->
		<popup ref="popup" type="bottom">
			<view class="boxView2">
				<view class="titleView2">
					<text class="Nb_text3">设备位置</text>
					<text class="Nb_text4 jdticon icon-fork" @click="close"></text>
				</view>
				<scroll-view class="noticeBox2" scroll-y="ture">
					<view class="tv_title">
						<view class="tl_content">
							<text class="ct_text">设备年限</text>
							<text class="ct_text2" v-if="parameter.Online==true">5</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">设备开机次数</text>
							<text class="ct_text2" v-if="parameter.Online==true">52</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">开机时间</text>
							<text class="ct_text2" v-if="parameter.Online==true">5分钟</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">售票数量</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{sellTicketData.Score1}}</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">售票金额</text>
							<text class="ct_text2"></text>
							<text class="ct_text2" v-if="parameter.Online==true">{{sellTicketData.Score2}}</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">异常次数</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{abnormalTimes}}</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">维修次数</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{frequency}}</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">设备状态</text>
							<text class="ct_text2" style="color: #3CB96B;" v-if="parameter.Online==true">在线</text>
							<text class="ct_text2" style="color: #FF6969;" v-if="parameter.Online==false">离线</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">网络状态</text>
							<text class="ct_text2" style="color: #3CB96B;" v-if="parameter.Online==true">正常</text>
							<text class="ct_text2" style="color: #FF6969;" v-if="parameter.Online==false">异常</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">CPU占用率</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{cpu}}</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">内存占用率</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{memory}}</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">当前运行程序</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{runFunction}}</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
						<view class="tl_content">
							<text class="ct_text">程序运行时间</text>
							<text class="ct_text2" v-if="parameter.Online==true">{{time}}时</text>
							<text class="ct_text2" v-if="parameter.Online==false">--</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</popup>
	</view>
</template>

<script>
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	import popup from "@/components/uni-popup/uni-popup.vue";
	import $Sbjg from "@/common/sbjg.js"
	export default {
		components: {
			LineChart,
			popup
		},
		data() {
			return {
				equipmentStatus:0,
				networkStatus:0,
				sellTicket:177,
				money:2050,
				lineData: {
					//带百分比的图--折线图数据
					categories: ['0时', '1时', '2时', '3时', '4时', '5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时','18时','19时','20时','21时','22时','23时'],
					series: [{ 
						name: 'CPU利用率', 
						data: [0.7, 0.4, 0.65, 0.1, 0.44, 0.98],
					}, 
					{ 
						name: '内存占用量', 
						data: [0.1, 0.8, 0.95, 0.15, 0.112, 0.132] ,
					}]
				},
				lineData2: {
					//数字的图--折线图数据
					categories: [],
					series: [{
							name: '售票数',
							data: [] ,
						}]
				},
				title: '今点通报班机OJ2988',
				frequency:5,
				numberTickets:175,
				cpu:'56%',
				memory:'60%',
				abnormalTimes:15,
				state:0,
				runFunction:"联网售票系统",
				time:240,
				
				parameter:'', //设备数据
				sellTicketData : '', //售票数据
				timer : '',//定时器参数
				ticketSum : '',//售票总数
				moneySum : '',//金额总数
			}
		},
		onLoad:function() {
			this.RequestDeviceParameters();
		},
		onUnload:function(){
			clearInterval(this.timer)
		},
		methods: {
			// 页面第一次获取设备数据
			RequestDeviceParameters:function(){
				var that = this;
				var data = uni.getStorageSync('equipmentParameters')
				console.log(data)
				uni.request({
					url: $Sbjg.SbjgInterface.GetSettingByID.Url,
					method: $Sbjg.SbjgInterface.GetSettingByID.method,
					header:$Sbjg.SbjgInterface.GetSettingByID.header,
					data:{
						AID : data.AID,
					},
					success: (res) => {
						console.log(res)
						this.parameter = res.data;
						this.titleData();
						uni.request({
							url: $Sbjg.SbjgInterface.GetBySettingAID.Url,
							method: $Sbjg.SbjgInterface.GetBySettingAID.method,
							header:$Sbjg.SbjgInterface.GetBySettingAID.header,
							data: {
								AID : that.parameter.AID,
							},
							success: (res) => {
								console.log(res)
								that.sellTicketData = res.data;
								
								//筛选数据，重组数组
								if(res.data.length !== 0 ){
									that.lineData2.categories = [];
									that.lineData2.series[0].data = [];
									that.ticketSum = 0 ;
									that.moneySum = 0 ;
									for(var i=0;i<res.data.length; i++){
										//重组时段
										var a = res.data[i].Time.slice(11);
										that.lineData2.categories.push(a+'时')
										// console.log(that.lineData2.categories) 
										
										//重组票数
										var b = res.data[i].Score1;
										that.lineData2.series[0].data.push(b);
										// console.log(that.lineData2.series[0].data) 
										
										//累加票数
										that.ticketSum += res.data[i].Score1;
										// console.log('票数',that.ticketSum)
										//累加金额
										that.moneySum += res.data[i].Score2;
										// console.log('金额',that.moneySum)

										 //生成图形
										that.$nextTick(() => {
											that.$refs['lineData2'].showCharts();
										});
									}
								}
								
								uni.hideLoading()
							},
							fail: () => {
								uni.showToast({
									title:'服务器异常，请重试，重试后不行请联系客服',
									icon:'none'
								})
							}
						})
						// this.getDeviceData(); //定时器刷新
					},
					fail: () => {
						uni.showToast({
							title:'服务器异常，请重试，重试后不行请联系客服',
							icon:'none'
						})
					}
				})
				
			},
			//定时器 - 获取设备参数
			getDeviceData:function(){
				var that = this;
				this.timer = setInterval(function(){
					uni.showLoading({
						title:'刷新设备数据中...',
					})
					console.log('请求一次')
					uni.request({
						url: $Sbjg.SbjgInterface.GetSettingByID.Url,
						method: $Sbjg.SbjgInterface.GetSettingByID.method,
						header:$Sbjg.SbjgInterface.GetSettingByID.header,
						data:{
							AID : that.parameter.AID,
						},
						success: (res) => {
							console.log('设备数据参数',res)
							that.parameter = res.data;
						},
						fail: () => {
							uni.showToast({
								title:'服务器异常，请重试，重试后不行请联系客服',
								icon:'none'
							})
						}
					})
					uni.request({
						url: $Sbjg.SbjgInterface.GetBySettingAID.Url,
						method: $Sbjg.SbjgInterface.GetBySettingAID.method,
						header:$Sbjg.SbjgInterface.GetBySettingAID.header,
						data: {
							AID : that.parameter.AID,
						},
						success: (res) => {
							// console.log('设备售票数据',res)
							that.sellTicketData = res.data
							
							//筛选数据，重组数组
							if(res.data.length !== 0 ){
								that.lineData2.categories = [];
								that.lineData2.series[0].data = [];
								that.ticketSum = 0 ;
								that.moneySum = 0 ;
								for(var i=0;i<res.data.length; i++){
									//重组时段
									var a = res.data[i].Time.slice(11);
									that.lineData2.categories.push(a+'时')
									// console.log(that.lineData2.categories) 
									
									//重组票数
									var b = res.data[i].Score1;
									that.lineData2.series[0].data.push(b);
									// console.log(that.lineData2.series[0].data) 
									
									//累加票数
									that.ticketSum += res.data[i].Score1;
									// console.log('票数',that.ticketSum)
									//累加金额
									that.moneySum += res.data[i].Score2;
									// console.log('金额',that.moneySum)
							
									 //生成图形
									that.$nextTick(() => {
										that.$refs['lineData2'].showCharts();
									});
								}
							}
							
							uni.hideLoading()
						},
						fail: () => {
							uni.showToast({
								title:'服务器异常，请重试，重试后不行请联系客服',
								icon:'none'
							})
						}
					})
				},15000)
			},
			//--------------------开头标题--------------------------
			titleData: function() {
				uni.setNavigationBarTitle({
					title: this.parameter.WorkNumber
				})
			},
			
			//-------------------------------查看须知-----------------------------
			checkAttention() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			// --------------------------------------设备关机------------------
			equipmentShutDown:function(){
				uni.showModal({
					title:'您确认要把设备关机吗？',
					success: (res) => {
						console.log(res)
						if(res.confirm == true){
							console.log(this.parameter.AID)
							uni.showLoading({
								title:'正在请求关机'
							})
							uni.request({
								url: $Sbjg.SbjgInterface.GetCommndAdd.Url,
								method: $Sbjg.SbjgInterface.GetCommndAdd.method,
								header:$Sbjg.SbjgInterface.GetCommndAdd.header,
								data: {
									SettingAID : this.parameter.AID,
									Msg : '关机',
								},
								success: (res) => {
									console.log(res)
									if(res.data == '指令发送成功'){
										uni.hideLoading()
										uni.showToast({
											title:'关机成功',
											icon:'success'
										})
									}else{
										uni.hideLoading()
										uni.showToast({
											title:'关机失败，请重试',
											icon:'success'
										})
									}
									
								},
								fail: () => {
									uni.hideLoading()
									uni.showToast({
										title:'服务器异常，请重试',
										icon:'success'
									})
								}
							})
						}else{
							
						}
					}
				})
			},
			// --------------------------------------设备重启------------------
			equipmentRestart:function(){
				uni.showModal({
					title:'您确认要把设备关机吗？',
					success: (res) => {
						console.log(res)
						if(res.confirm == true){
							console.log(this.parameter.AID)
							uni.showLoading({
								title:'正在请求重启'
							})
							uni.request({
								url: $Sbjg.SbjgInterface.GetCommndAdd.Url,
								method: $Sbjg.SbjgInterface.GetCommndAdd.method,
								header:$Sbjg.SbjgInterface.GetCommndAdd.header,
								data: {
									SettingAID : this.parameter.AID,
									Msg : '重启',
								},
								success: (res) => {
									console.log(res)
									if(res.data == '指令发送成功'){
										uni.hideLoading()
										uni.showToast({
											title:'重启成功',
											icon:'success'
										})
									}else{
										uni.hideLoading()
										uni.showToast({
											title:'重启失败，请重试',
											icon:'success'
										})
									}
									
								},
								fail: () => {
									uni.hideLoading()
									uni.showToast({
										title:'服务器异常，请重试',
										icon:'success'
									})
								}
							})
						}else{
							
						}
					}
				})
			},
			
			//------------------------暂未开放----------------------------
			notYetOpen:function(){
				uni.showToast({
					title:'暂未开放',
					icon:'none'
				})
			},
			
			//售票参数重置
			emptyTicketReset:function(e){
				if(e == ''){
					return '---'
				}else{
					return e
				}
			},
			
			getServerData() {
				setTimeout(() => {
					//延迟模拟ajax嗲用后台数据
					this.$refs['lineData1'].showCharts();
				}, 1000);
			}
		},
		
		created() {
		   
		   //ajax调用
		   this.getServerData();
		  }
	
		
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f5f5f6;
	}

	.top_image {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
		margin: 0 auto;
		z-index: 1;
	}

	.dt_top {
		width: 100%;

		.tp_outerLayer {
			position: absolute;
			z-index: 2;
			padding-top: 40upx;

			.ol_image {
				position: relative;
				height: 296upx;
				width: 1334upx;
				text-align: center;
				display: table-cell;
				vertical-align: middle;

				.im_image {
					width: 100%;
					height: 100%;

				}
			}
			
			.im_abnormal{
				position: absolute;
				display: flex;
				top: 100upx;
				left: 476upx;
				
				.al_image{
					width: 41upx;
					height: 33upx;
				}
				
				.al_text{
					color: #FF6969;
					font-size: 28upx;
					padding-left: 16upx;
				}
			}
		}
	}
	
	//状态
	.zl_click {
		background: #FFFFFF;
		border-radius:20upx;
		margin: 20upx 30upx 0 30upx;
		padding: 30upx;
		
		.zl_topClick {
			display: flex;
	
			// 设备区域
			.zl_independentTravel {
				position: relative;
				width: 33%;
				text-align: center;
	
				.zl_itImage {
					position: absolute;
					width: 35upx;
					height: 40upx;
					top: 8upx;
				}
	
				.zl_itText {
					font-size: 34upx;
					color: #3CB96B;
					font-weight:bold;
					line-height: 84upx;
					font-family:Source Han Sans SC;
				}
			}
			
			// 在线状态
			.zl_independentTravel2 {
				position: relative;
				width: 33%;
				text-align: center;
			
				.zl_itImage2 {
					position: absolute;
					width: 38upx;
					height: 34upx;
					top: 14upx;
				}
			
				.zl_itText2 {
					font-size: 34upx;
					color: #FF6969;
					font-weight:bold;
					font-family:Source Han Sans SC;
				}
				
				.zl_stateText{
					display: block;
					font-size: 26upx;
					padding-top: 6upx;
					color: #666666;
				}
			}
			
			// 设备分布
			.zl_independentTravel3 {
				position: relative;
				width: 33%;
				text-align: center;
			
				.zl_itImage3 {
					position: absolute;
					width: 38upx;
					height: 38upx;
					top: 12upx;
				}
			
				.zl_itText3 {
					font-size: 34upx;
					font-weight: bold;
				}
				
				.zl_stateText2{
					display: block;
					font-size: 26upx;
					padding-top: 6upx;
					color: #666666;
				}
			}
		}
	}
	
	//状态
	.zl_click2 {
		background: #FFFFFF;
		border-radius:20upx;
		margin: 20upx 30upx 0 30upx;
		padding: 30upx;
		
		.zl_topClick2 {
			display: flex;
	
			// 设备区域
			.zl_independentTravel {
				position: relative;
				width: 33%;
				text-align: center;
	
				.zl_itImage {
					position: absolute;
					width: 35upx;
					height: 40upx;
					top: 8upx;
				}
	
				.zl_itText {
					font-size: 34upx;
					font-weight:bold;
					font-family:Source Han Sans SC;
				}
				
				.zl_stateText{
					display: block;
					font-size: 26upx;
					padding-top: 6upx;
					color: #666666;
				}
			}
			
			// 在线状态
			.zl_independentTravel2 {
				position: relative;
				width: 33%;
				text-align: center;
			
				.zl_itImage2 {
					position: absolute;
					width: 38upx;
					height: 34upx;
					top: 14upx;
				}
			
				.zl_itText2 {
					font-size: 34upx;
					font-weight:bold;
					font-family:Source Han Sans SC;
				}
				
				.zl_stateText2{
					display: block;
					font-size: 26upx;
					padding-top: 6upx;
					color: #666666;
				}
			}
			
			// 设备分布
			.zl_independentTravel3 {
				position: relative;
				width: 33%;
				text-align: center;
			
				.zl_itImage3 {
					position: absolute;
					width: 38upx;
					height: 38upx;
					top: 12upx;
				}
			
				.zl_itText3 {
					font-size: 34upx;
					font-weight: bold;
				}
				
				.zl_stateText3{
					display: block;
					font-size: 26upx;
					padding-top: 6upx;
					color: #666666;
				}
			}
		}
		
		.zl_bottomPopup{
			position: relative;
			width: 100%;
			text-align: center;
			padding-top: 26upx;
			
			.bp_text{
				color: #999999;
				font-size: 26upx;
			}
		}
	}
	
	//设备关机
	.ol_shutDown{
		background: #FFFFFF;
		display: flex;
		float: left;
		width: 23%;
		padding: 36upx 78upx;
		margin-top: 24upx;
		margin-left: 32upx;
		border-radius: 24upx;
		.sd_icon{
			// width: 36upx;
			height: 36upx;
		}
		
		.sd_text{
			font-size: 30upx;
			font-weight: bold;
			line-height: 38upx;
			padding-left: 16upx;
		}
	}
	
	//保修登记
	.ol_register{
		font-size: 30upx;
		float: left;
		border-radius: 24upx;
		margin: 24upx 32upx;
		padding: 32upx 279upx;
		font-weight:bold;
		margin-bottom: 64rpx;
	}

	
	//途径点弹框
	.boxView2 {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 40upx;
		background: #FFFFFF;
		z-index: 999;
		height: 600upx;
	
		.titleView2 {
			margin-top: 24upx;
	
			//弹框标题
			.Nb_text3 {
				position: relative;
				font-size: 38upx;
				font-weight: bold;
				top: 8upx;
			}
	
			//弹框关闭按钮
			.Nb_text4 {
				margin-top: 8upx;
				float: right;
				color: #333;
				font-size: 32upx;
			}
		}
	
		.noticeBox2 {
			line-height: 32upx;
			height: 508upx;
			margin-top: 8upx;
	
			.tv_title {
				display: block;
				width: 100%;
				// margin-bottom: 220upx;
				
				//售票次数
				.tl_content{
					position: relative;
					padding-top: 56upx;
					width: 100%;
					
					.ct_text{
						left: 0;
						font-size: 32upx;
						padding-left: 20upx;
					}
					
					.ct_text2{
						position: absolute;
						right: 0;
						font-size: 32upx;
						padding-right: 20upx;
					}
				}
			}
		}
	}
	
	.ol_LineChart{
		background: #FFFFFF;
		border-radius:20upx;
		margin: 0 30upx 0 30upx;
		padding-bottom: 30upx;
	}
	
	.ol_seeMore{
		text-align: center;
		/* #ifdef MP-WEIXIN */
		margin: 64upx 20upx 56upx 20upx;
		/* #endif */
		/* #ifdef APP-PLUS */
		margin: 72upx 20upx 48upx 20upx;
		/* #endif */
		
		
		.ct_text {
			padding: 12upx 30upx;
			font-size: 24upx;
			width: 178upx;
			color: #999999;
			border: 1px solid rgba(153, 153, 153, 1);
			border-radius: 50upx;
		}
	}
	
	.ol_equipmentStatus{
		position: absolute;
		width:120upx;
		text-align: center;
		/* #ifdef APP-PLUS */
		top: 30upx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: 60upx;
		/* #endif */
		left: 88upx;
		
		.es_text{
			font-size:30upx;
			font-weight:500;
			color:#212121;
		}
		
		.es_text2{
			font-size:26upx;
			color:#3CB96B;
		}
		
		.es_text3{
			font-size:26upx;
			color:#FF6969;
		}
	}
	
	.ol_networkStatus{
		position: absolute;
		width:120upx;
		text-align: center;
		/* #ifdef APP-PLUS */
		top: 210upx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		top: 220upx;
		/* #endif */
		left: 88upx;
		
		.ns_text{
			font-size:30upx;
			font-weight:500;
			color:#212121;
		}
		
		.ns_text2{
			font-size:26upx;
			color:#3CB96B;
		}
		
		.ns_text3{
			font-size:26upx;
			color:#FF6969;
		}
	}
	
	
	.ol_ticketSalesAmount{
		position: absolute;
		width:180upx;
		text-align: center;
		top: 50upx;
		right: 64upx;
		
		.tsa_text{
			font-size:30upx;
			font-weight:500;
			color:#212121;
		}
		
		.tsa_icon{
			width: 28upx;
			height: 24upx;
			margin-top: 6upx;
			margin-right: 10upx;
		}
		
		.tsa_text2{
			font-size:26upx;
			color:#666666;
		}
	}
	
	.ol_cpuConsumption{
		position: absolute;
		width:180upx;
		text-align: center;
		top: 160upx;
		right: 56upx;
		
		.cc_text{
			font-size:30upx;
			font-weight:500;
			color:#212121;
		}
		
		.cc_icon{
			width: 24upx;
			height: 24upx;
			margin-top: 6upx;
			margin-right: 10upx;
		}
		
		.cc_text2{
			font-size:26upx;
			color:#666666;
		}
	}
	
	.ol_cpuTemperature{
		position: absolute;
		width:180upx;
		text-align: center;
		top: 274upx;
		right: 56upx;
		
		.c_text{
			font-size:30upx;
			font-weight:500;
			color:#212121;
		}
		
		.ct_icon{
			width: 20upx;
			height: 32upx;
			margin-right: 22upx;
		}
		
		.ct_text2{
			font-size:26upx;
			color:#666666;
		}
	}
	
	//设备详情页面点击状态
	 .ol_hover{
	  transition: all .3s;//过度
	  border-radius: 24upx;
	  opacity: 0.1;
	  color: #FFFFFF;
	  background: #5694fb;
	 }
</style>
