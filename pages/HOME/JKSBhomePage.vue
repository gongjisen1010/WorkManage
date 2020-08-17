<template>
	<view>
		<view class="hp_top">
			<image class="top_image" src="../../static/HOME/beijin.png" mode="aspectFill"></image>
			<view class="hp_outerLayer">
				<!-- 选择车站 -->
				<view class="if_DriverNumber">
					<picker @change="godetail" :value="index" :range="selectBank" range-key="StationName">
						<text class="tsnrText">{{selectBank[index].StationName}}</text>
					</picker>
					<text class="dn_text2">></text>
				</view>

				<!-- 多少台设备 -->
				<text class="hp_equipment">{{totalQuantity}}台设备</text>

				<!-- 设备类型 -->
				<view class="hp_equipmentType">
					<text class="et_text">设备类型</text>
					<view class="et_typeContent" v-for="(item,index) in ">
						<view>
							<view class="tc_image">
								<image class="tc_image2" src="../../static/shebei1.png" mode="aspectFill"></image>
							</view>
						</view>

						<view class="et_content">
							<view class="ct_title">{{title}}</view>
							<view class="ct_content">
								<text class="ct_number">{{equipmentNumber}}台</text>
								<text class="ct_text" @tap="checkAttention">查看设备></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 查看须知popup -->
		<popup ref="popup" type="bottom">
			<view class="boxView2">
				<view class="titleView2">
					<text class="Nb_text3">今点通凭单机</text>
					<text class="Nb_text4" @click="close">X</text>
				</view>
				<scroll-view class="noticeBox2" scroll-y="ture">
					<view class="tv_title" v-for="(item,index) in equipmentMachinery" :key="index">
						<view class="tt_txt">{{item.txt}}</view>
						<view class="tt_equipmentContent" v-for="(item2,index2) in item.equipment" :key="index2">
							<view>
								<view class="ec_image">
									<image class="ec_image2" :src="item2.image" mode="aspectFill"></image>
								</view>
							</view>

							<view class="ec_content">
								<view class="ct_title">{{item2.name}}</view>
								<view class="ct_content">
									<text class="ct_number">{{item2.model}}</text>
									<text class="ct_state" v-if="item2.state==0">在线</text>
									<text class="ct_state2" v-if="item2.state==1">不在线</text>
									<text class="ct_text" @click="Jump">查看设备></text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

				<!-- 顶部点击跳转栏 -->
				<view class="zl_click">
					<view class="zl_topClick">
						<!-- 设备区域 -->
						<view class="zl_independentTravel">
							<image class="zl_itImage" src="../../static/HOME/shebeiquyu.png"></image>
							<text class="zl_itText">设备区域</text>
						</view>
						<!-- 在线状态	 -->
						<view class="zl_independentTravel2">
							<image class="zl_itImage2" src="../../static/HOME/zaixianzhuangtai.png"></image>
							<text class="zl_itText2">在线状态</text>
						</view>
						<!-- 设备分布 -->
						<view class="zl_independentTravel3">
							<image class="zl_itImage3" src="../../static/HOME/shebeifenbu.png"></image>
							<text class="zl_itText3">设备分布</text>
						</view>
					</view>
				</view>
			</view>
		</popup>
	</view>
</template>

<script>
	import $Sbjg from "@/common/sbjg.js"
	import popup from "@/components/uni-popup/uni-popup.vue";
	export default {
		components: {
			popup
		},
		data() {
			return {
				// selectBank: [{
				// 		txt: '客运中心站',
				// 	},
				// 	{
				// 		txt: '泉州汽车站',
				// 	}
				// ],
				selectBank:[{
					AID:'',
					CompanyID:'',
					StationID:'',
					StationName:'',
				}],
				equipmentMachinery: [{
						txt: '售票机',
						equipment: [{
							image: '../../static/shebei1.png',
							name: '凭单机P2843',
							model: 'P2843',
							state: '0',
						}]
					},
					{
						txt: '三号门',
						equipment: [{
								image: '../../static/shebei1.png',
								name: '凭单机P2843',
								model: 'P2843',
								state: '1',
							},
							{
								image: '../../static/shebei1.png',
								name: '凭单机P2843',
								model: 'P2843',
								state: '0',
							}
						]
					},
				],
				title: '今点通凭单机XKY23',
				totalQuantity: 233,
				equipmentNumber: 122,
				index: 0,
				bankObject: '', 
			}
		},
		onLoad:function(){
			this.interfaceData();
		},
		
		onShow() {
			
		},
		
		methods: {
			//----------------------接口数据--------------------------------------
			interfaceData:function(){
				//获取所有的车站
				uni.request({
					url:$Sbjg.SbjgInterface.GetStarte.Url,
					method:$Sbjg.SbjgInterface.GetStarte.method,
					success:(res)=>{
						console.log('获取所有的车站',res)
						this.selectBank = res.data;
						this.bankObject = res.data[0].StationName;
						this.deviceData();
					}
				})
				//获取所有的设备数据
				
			},
			deviceData:function(){
				uni.request({
					url:$Sbjg.SbjgInterface.GetSerialsByID.Url,
					method:$Sbjg.SbjgInterface.GetSerialsByID.method,
					data:{
						CompanyName:this.bankObject
					},
					success:(res)=>{
						console.log('获取所有的设备数据',res)
					}
				})
			},
			//----------------------选择车站--------------------------------------
			godetail: function(e) {
				var that = this;
				console.log(e)
				that.index = e.detail.value;
				that.bankObject = that.selectBank[e.detail.value].StationName;
				this.deviceData()
				console.log('1', that.bankObject)
			},

			//-------------------------------查看须知-----------------------------
			checkAttention() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			
			//-------------------------------跳转---------------------------------
			Jump(){
				uni.navigateTo({
					url:'../../pages_SBJG/pages/details'
				})
			}
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

	//选择车站
	.hp_top {
		// position: absolute;
		width: 100%;
		// height: 100%;

		.hp_outerLayer {
			position: absolute;
			z-index: 2;
			padding-top: 114upx;
			// margin-top: 192upx;

			.if_DriverNumber {
				display: flex;
				position: relative;
				margin-top: 30upx;
				margin-left: 30upx;
				margin-right: 30upx;
				padding-bottom: 16upx;

				.tsnrText {
					display: flex;
					font-size: 32upx;
					font-weight: bold;
				}

				.dn_text2 {
					font-size: 33upx;
					padding-left: 22upx;
				}
			}

			.hp_equipment {
				font-size: 26upx;
				color: #999999;
				padding-left: 30upx;
			}

			.hp_equipmentType {
				margin-left: 30upx;
				margin-top: 70upx;
				margin-right: 30upx;

				.et_text {
					font-weight: bold;
					font-size: 30upx;
				}

				.et_typeContent {
					display: flex;
					z-index: 2;
					background: #FFFFFF;
					margin-top: 30upx;
					border-radius: 20upx;

					.tc_image {
						width: 122upx;
						height: 122upx;
						padding: 30upx 20upx 30upx 20upx;

						.tc_image2 {
							width: 100%;
							height: 100%;
						}
					}
				}

				.et_content {
					position: relative;
					padding-top: 30upx;
					width: 532upx;

					.ct_title {
						font-size: 32upx;
						font-weight: bold;
					}

					.ct_content {
						display: flex;

						.ct_number {
							position: absolute;
							bottom: 0;
							font-size: 30upx;
							color: #999999;
							padding-bottom: 30upx;
						}

						.ct_text {
							position: absolute;
							bottom: 0;
							right: 0;
							margin: 30upx;
							padding: 16upx 30upx;
							font-size: 26upx;
							color: #999999;
							border: 1px solid rgba(153, 153, 153, 1);
							border-radius: 50upx;
						}
					}
				}
			}
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
			height: 810upx;

			.tv_title {
				display: block;
				width: 100%;

				.tt_txt {
					font-size: 32upx;
					font-weight: bold;
					padding-top: 78upx;
				}

				.tt_equipmentContent {
					display: flex;
					border-bottom: 1px solid #E7E7E7;

					.ec_image {
						width: 122upx;
						height: 122upx;
						padding: 30upx 20upx 30upx 20upx;

						.ec_image2 {
							width: 100%;
							height: 100%;
						}
					}

					.ec_content {
						position: relative;
						padding-top: 30upx;
						width: 532upx;

						.ct_title {
							font-size: 32upx;
							font-weight: bold;
							padding-top: 20upx;
						}

						.ct_content {
							display: flex;

							.ct_number {
								position: absolute;
								bottom: 0;
								font-size: 30upx;
								color: #999999;
								padding-bottom: 40upx;
							}

							.ct_state {
								position: absolute;
								bottom: 0;
								font-size: 30upx;
								color: #3CB96B;
								padding-bottom: 40upx;
								padding-left: 120upx;
							}

							.ct_state2 {
								position: absolute;
								bottom: 0;
								font-size: 30upx;
								color: #FF4444;
								padding-bottom: 40upx;
								padding-left: 120upx;
							}

							.ct_text {
								position: absolute;
								bottom: 0;
								right: 0;
								margin: 40upx 20upx;
								padding: 12upx 30upx;
								font-size: 26upx;
								color: #999999;
								border: 1px solid rgba(153, 153, 153, 1);
								border-radius: 50upx;
							}
						}
					}
				}
			}
		}

		//顶部点击跳转栏
		.zl_click {
			
			.zl_topClick {
				display: flex;
				padding-top: 20upx;

				// 设备区域
				.zl_independentTravel {
					position: relative;
					// border-left: 1px solid #E7E7E7;
					width: 33%;
					text-align: center;

					.zl_itImage {
						position: absolute;
						width: 35upx;
						height: 40upx;
						top: 8upx;
					}

					.zl_itText {
						padding-left: 50upx;
						font-size: 30upx;
						color: #333333;
						line-height:54upx;
					}
				}
				
				// 在线状态
				.zl_independentTravel2 {
					position: relative;
					border-left: 1px solid #E7E7E7;
					width: 33%;
					text-align: center;
				
					.zl_itImage2 {
						position: absolute;
						width: 38upx;
						height: 34upx;
						top: 14upx;
					}
				
					.zl_itText2 {
						padding-left: 50upx;
						font-size: 30upx;
						color: #333333;
						line-height:58upx;
					}
				}
				
				// 设备分布
				.zl_independentTravel3 {
					position: relative;
					border-left: 1px solid #E7E7E7;
					width: 33%;
					text-align: center;
				
					.zl_itImage3 {
						position: absolute;
						width: 38upx;
						height: 38upx;
						top: 12upx;
					}
				
					.zl_itText3 {
						padding-left: 50upx;
						font-size: 30upx;
						color: #333333;
						line-height:56upx;
					}
				}
			}
		}
	}
</style>
