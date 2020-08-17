<template>
	<view class="dt_top">
		<image class="top_image" src="../../static/HOME/beijin2.png" mode="aspectFill"></image>
		<view class="tp_outerLayer">
			<view class="ol_image">
				<image class="im_image" src="../static/baobanji.png" mode="aspectFit"></image>
			</view>
			
			<view class="ol_equipmentStatus">
				<text class="es_text">设备状态</text>
				<text class="es_text2" v-if="equipmentStatus==0">硬件正常</text>
				<text class="es_text3" v-if="equipmentStatus==1">硬件异常</text>
				<text class="es_text2" v-if="equipmentStatus==0">软件正常</text>
				<text class="es_text3" v-if="equipmentStatus==1">软件异常</text>
				<text class="es_text2" v-if="equipmentStatus==0">网络正常</text>
				<text class="es_text3" v-if="equipmentStatus==1">网络异常</text>
			</view>
			
			<view class="ol_networkStatus">
				<text class="ns_text">设备状态</text>
				<text class="ns_text2" v-if="networkStatus==0">外网正常</text>
				<text class="ns_text3" v-if="networkStatus==1">外网异常</text>
				<text class="ns_text2" v-if="networkStatus==0">内网正常</text>
				<text class="ns_text3" v-if="networkStatus==1">内网异常</text>
			</view>
			
			<view class="ol_ticketSalesAmount">
				<text class="tsa_text">{{sellTicket}}/{{money}}</text>
				<view style="display: flex;">
					<image class="tsa_icon" src="../static/shoupiao.png" mode="aspectFill"></image>
					<text class="tsa_text2">售票数/金额</text>
				</view>
			</view>
			
			<view class="ol_cpuConsumption">
				<text class="cc_text">{{cpu}}</text>
				<view style="display: flex;">
					<image class="cc_icon" src="../static/cpu.png" mode="aspectFill"></image>
					<text class="cc_text2">CPU占用率</text>
				</view>
			</view>
			
			<view class="ol_cpuTemperature">
				<text class="ct_text">{{cpu}}</text>
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
				
				<!-- 折线Line纯数字-->
				<view class="line">
					<line-chart ref="lineData2" canvasId="index_line_2" :dataAs="lineData2" />
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
			<view style="display: flex;">
				<view class="ol_shutDown">
					<image class="sd_icon" src="../static/guanji.png"></image>
					<text class="sd_text">设备关机</text>
				</view>
				<view class="ol_restart">
					<image class="sd_icon" src="../static/chongqi.png"></image>
					<text class="sd_text">设备重启</text>
				</view>
			</view>
			<view style="display: flex;">
				<view class="ol_selfInspection">
					<image class="sd_icon" src="../static/zijian.png"></image>
					<text class="sd_text">设备自检</text>
				</view>
				<view class="ol_instructions">
					<image class="sd_icon" src="../static/ziling.png"></image>
					<text class="sd_text">下达指令</text>
				</view>
			</view>
			
			<!-- 保修登记 -->
			<view class="ol_register">
				<text class="ri_text">保修登记</text>
			</view>
		</view>
		
		<!-- 查看须知popup -->
		<popup ref="popup" type="bottom">
			<view class="boxView2">
				<view class="titleView2">
					<text class="Nb_text3">设备位置</text>
					<text class="Nb_text4" @click="close">X</text>
				</view>
				<scroll-view class="noticeBox2" scroll-y="ture">
					<view class="tv_title">
						<view class="tl_sellTicket">
							<text class="st_text">售票数量</text>
							<text class="st_text2">{{numberTickets}}</text>
						</view>
						<view class="tl_abnormal">
							<text class="st_text">异常次数</text>
							<text class="st_text2">{{abnormalTimes}}</text>
						</view>
						<view class="tl_repair">
							<text class="st_text">维修次数</text>
							<text class="st_text2">{{frequency}}</text>
						</view>
						<view class="tl_runningState">
							<text class="st_text">运行状态</text>
							<text class="st_text2" v-if="state==0">在线</text>
							<text class="st_text3" v-if="state==1">不在线</text>
						</view>
						<view class="tl_networkStatus">
							<text class="st_text">网络状态</text>
							<text class="st_text2" v-if="networkStatus==0">正常</text>
							<text class="st_text3" v-if="networkStatus==1">异常</text>
						</view>
						<view class="tl_CPUusage">
							<text class="st_text">CPU占用率</text>
							<text class="st_text2">{{cpu}}</text>
						</view>
						<view class="tl_memoryUsage">
							<text class="st_text">内存占用率</text>
							<text class="st_text2">{{memory}}</text>
						</view>
						<view class="tl_runFunction">
							<text class="st_text">当前运行程序</text>
							<text class="st_text2">{{runFunction}}</text>
						</view>
						<view class="tl_runTime">
							<text class="st_text">程序运行时间</text>
							<text class="st_text2">{{time}}时</text>
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
					series: [{ name: 'CPU', data: [0.7, 0.4, 0.65, 0.1, 0.44, 0.98] }, { name: '内存占用量', data: [0.1, 0.8, 0.95, 0.15, 0.112, 0.132] }]
				},
				lineData2: {
					//数字的图--折线图数据
					categories: ['0时', '1时', '2时', '3时', '4时', '5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时','18时','19时','20时','21时','22时','23时'],
					series: [
						{ name: '售票数', data: [35, 8, 25, 37, 4, 20] },
					]
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
			}
		},
		onLoad() {
			this.titleData();
		},
		methods: {
			//--------------------开头标题--------------------------
			titleData: function() {
				uni.setNavigationBarTitle({
					title: this.title
				})
			},
			
			//-------------------------------查看须知-----------------------------
			checkAttention() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			
			getServerData() {
				setTimeout(() => {
					//延迟模拟ajax嗲用后台数据
					this.$refs['lineData1'].showCharts();
				}, 1000);
			}
			
		},
		
		created() {
			this.$nextTick(() => {
				//折线图
				this.$refs['lineData2'].showCharts();
			});
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
		margin-top: 20upx;
		margin-left: 30upx;
		margin-right: 30upx;
		display: flex;
		padding: 44upx 76upx;
		border-radius:20upx;
		width: 25%;
		
		.sd_icon{
			width: 38upx;
			height: 38upx;
		}
		
		.sd_text{
			font-size: 32upx;
			font-weight: bold;
			line-height: 38upx;
			padding-left: 16upx;
		}
	}
	
	//设备重启
	.ol_restart{
		background: #FFFFFF;
		margin-top: 20upx;
		margin-right: 30upx;
		display: flex;
		padding: 44upx 76upx;
		border-radius:20upx;
		
		.sd_icon{
			width: 44upx;
			height: 36upx;
		}
		
		.sd_text{
			font-size: 32upx;
			font-weight: bold;
			line-height: 38upx;
			padding-left: 10upx; 
		}
	}
	
	//设备自检
	.ol_selfInspection{
		background: #FFFFFF;
		margin-top: 20upx;
		margin-right: 30upx;
		display: flex;
		padding: 44upx 76upx;
		border-radius:20upx;
		margin-left: 30upx;
		width: 25%;
		
		.sd_icon{
			width: 36upx;
			height: 36upx;
		}
		
		.sd_text{
			font-size: 32upx;
			font-weight: bold;
			line-height: 38upx;
			padding-left: 16upx; 
		}
	}
	
	//下达指令
	.ol_instructions{
		background: #FFFFFF;
		margin-top: 20upx;
		margin-right: 30upx;
		display: flex;
		padding: 44upx 76upx;
		border-radius:20upx;
		
		.sd_icon{
			width: 44upx;
			height: 36upx;
		}
		
		.sd_text{
			font-size: 32upx;
			font-weight: bold;
			line-height: 38upx;
			padding-left: 10upx; 
		}
	}
	
	.ol_register{
		position: relative;
		text-align: center;
		background: #FFFFFF;
		border-radius:20upx;
		margin: 20upx 30upx;
		padding: 38upx;
		
		.ri_text{
			font-size: 36upx;
			font-weight: bold;
		}
	}
	
	//途径点弹框
	.boxView2 {
		width: 90%;
		padding: 16upx 40upx;
		padding-bottom: 40upx;
		background: #FFFFFF;
		z-index: 999;
	
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
			height: 936upx;
	
			.tv_title {
				display: block;
				width: 100%;
				padding-top: 80upx;
				
				//售票次数
				.tl_sellTicket{
					position: relative;
					width: 100%;
					
					.st_text{
						left: 0;
						font-size: 32upx;
						padding-left: 20upx;
					}
					
					.st_text2{
						position: absolute;
						right: 0;
						font-size: 32upx;
						padding-right: 20upx;
					}
				}
				
				//异常次数
				.tl_abnormal{
					position: relative;
					width: 100%;
					padding-top: 70upx;
					
					.st_text{
						left: 0;
						font-size: 32upx;
						padding-left: 20upx;
					}
					
					.st_text2{
						position: absolute;
						right: 0;
						font-size: 32upx;
						padding-right: 20upx;
					}
				}
				
				//维修次数
				.tl_repair{
					position: relative;
					width: 100%;
					padding-top: 70upx;
					
					.st_text{
						left: 0;
						font-size: 32upx;
						padding-left: 20upx;
					}
					
					.st_text2{
						position: absolute;
						right: 0;
						font-size: 32upx;
						padding-right: 20upx;
					}
				}
				
				//运行状态
				.tl_runningState{
					position: relative;
					width: 100%;
					padding-top: 70upx;
					
					.st_text{
						left: 0;
						font-size: 32upx;
						padding-left: 20upx;
					}
					
					.st_text2{
						position: absolute;
						right: 0;
						color: #3CB96B;
						font-size: 32upx;
						padding-right: 20upx;
					}
					
					.st_text3{
						position: absolute;
						right: 0;
						color: #FF6969;
						font-size: 32upx;
						padding-right: 20upx;
					}
				}
				
				//网络状态
				.tl_networkStatus{
					position: relative;
					width: 100%;
					padding-top: 70upx;
					
					.st_text{
						left: 0;
						font-size: 32upx;
						padding-left: 20upx;
					}
					
					.st_text2{
						position: absolute;
						right: 0;
						color: #3CB96B;
						font-size: 32upx;
						padding-right: 20upx;
					}
					
					.st_text3{
						position: absolute;
						right: 0;
						color: #FF6969;
						font-size: 32upx;
						padding-right: 20upx;
					}
				}
				
				//cpu占用率
				.tl_CPUusage{
					position: relative;
					width: 100%;
					padding-top: 70upx;
					
					.st_text{
						left: 0;
						font-size: 32upx;
						padding-left: 20upx;
					}
					
					.st_text2{
						position: absolute;
						right: 0;
						font-size: 32upx;
						padding-right: 20upx;
					}
				}
				
				//内存占用率
				.tl_memoryUsage{
					position: relative;
					width: 100%;
					padding-top: 70upx;
					
					.st_text{
						left: 0;
						font-size: 32upx;
						padding-left: 20upx;
					}
					
					.st_text2{
						position: absolute;
						right: 0;
						font-size: 32upx;
						padding-right: 20upx;
					}
				}
				
				//当前运行程序
				.tl_runFunction{
					position: relative;
					width: 100%;
					padding-top: 70upx;
					
					.st_text{
						left: 0;
						font-size: 32upx;
						padding-left: 20upx;
					}
					
					.st_text2{
						position: absolute;
						right: 0;
						font-size: 32upx;
						padding-right: 20upx;
					}
				}
				
				//程序运行时间
				.tl_runTime{
					position: relative;
					width: 100%;
					padding-top: 70upx;
					
					.st_text{
						left: 0;
						font-size: 32upx;
						padding-left: 20upx;
					}
					
					.st_text2{
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
		margin: 58upx 20upx 50upx 20upx;
		
		.ct_text {
			padding: 12upx 30upx;
			font-size: 26upx;
			width: 178upx;
			color: #999999;
			border: 1px solid rgba(153, 153, 153, 1);
			border-radius: 50upx;
		}
	}
	
	.ol_equipmentStatus{
		position: absolute;
		width:118upx;
		text-align: center;
		top: 50upx;
		left: 100upx;
		
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
		width:118upx;
		text-align: center;
		top: 230upx;
		left: 100upx;
		
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
		right: 70upx;
		
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
		top: 150upx;
		right: 70upx;
		
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
		top: 250upx;
		right: 70upx;
		
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
</style>
