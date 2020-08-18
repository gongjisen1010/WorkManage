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
					<text class="dn_text2" style="margin-top: 8upx;">></text>
				</view>

				<!-- 多少台设备 -->
				<text class="hp_equipment">{{equipment}}台设备</text>

				<!-- 设备类型 -->
				<view class="hp_equipmentType">
					<text class="et_text">设备类型</text>
					
					<!-- 凭单机 -->
					<view class="et_typeContent" v-for="(item,index) in DeviceData" :key="index" @tap="checkAttention(item.name)">
						<view>
							<view class="tc_image">
								<image class="tc_image2" v-if="item.name=='售票机'" src="../../static/HOME/shoupiaoji.png" mode="aspectFit"></image>
								<image class="tc_image2" v-if="item.name=='检票机'" src="../../static/HOME/jianpiaoji.png" mode="aspectFit"></image>
								<image class="tc_image2" v-if="item.name=='凭单机'" src="../../static/HOME/pindanji.png" mode="aspectFit"></image>
							</view>
						</view>

						<view class="et_content"  >
							<view class="ct_title">{{item.name}}</view>
							<view class="ct_content">
								<text class="ct_number" v-if="item.name=='售票机'">{{item.num}}台</text>
								<text class="ct_number" v-if="item.name=='检票机'">{{item.num}}台</text>
								<text class="ct_number" v-if="item.name=='凭单机'">{{item.num}}台</text>
								<text class="ct_text" >查看设备></text>
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
					<text class="Nb_text3">{{EquipmentName(popUpModule)}}</text>
					<text class="Nb_text4 jdticon icon-fork" @click="close"></text>
				</view>
				<scroll-view class="noticeBox2" scroll-y="ture">
					<view class="tv_title" v-for="(item,index) in standAlone" :key="index">
						<!-- <view class="tt_txt">{{item.txt}}</view> -->
						<view class="tt_equipmentContent" @click="Jump(item)">
							<view class="ec_image">
								<image class="ec_image2" v-if="popUpModule == 2" src="../../static/HOME/pindanji.png" mode="aspectFit"></image>
								<image class="ec_image2" v-if="popUpModule == 1" src="../../static/HOME/shoupiaoji.png" mode="aspectFit"></image>
								<image class="ec_image2" v-if="popUpModule == 0" src="../../static/HOME/jianpiaoji.png" mode="aspectFit"></image>
							</view>
							<view class="ec_content">
								<view class="ct_title">{{item.WorkNumber}} - {{item.Remark}}</view>
								<view class="ct_content">
									<text class="ct_number">{{item.BreakNum}}次掉线</text>
									<text class="ct_state" style="color: #3CB96B;" v-if="item.Online==true">在线</text>
									<text class="ct_state" style="color: #FF4444;" v-if="item.Online==false">离线</text>
									<text class="ct_text">查看设备></text>
								</view>
							</view>
						</view>
					</view>

					
				</scroll-view>

				<!-- 顶部点击跳转栏 -->
				<view class="zl_click">
					<view class="zl_topClick">
						<!-- 设备区域 -->
						<view class="zl_independentTravel" @click="click(1)">
							<image class="zl_itImage" :hidden="type==1" src="../../static/HOME/shebeiquyu.png" mode="aspectFit"></image>
							<image class="zl_itImage" v-if="type==1" src="../../static/HOME/shebeiquyu2.png" mode="aspectFit"></image>
							<text class="zl_itText" :class="{current:type===1}">设备区域</text>
						</view>
						<!-- 在线状态	 -->
						<view class="zl_independentTravel2" @click="click(2)">
							<image class="zl_itImage2" :hidden="type==2"  src="../../static/HOME/zaixianzhuangtai.png" mode="aspectFit"></image>
							<image class="zl_itImage2" v-if="type==2" src="../../static/HOME/zaixianzhuangtai2.png" mode="aspectFit"></image>
							<text class="zl_itText2" :class="{current:type===2}">在线状态</text>
						</view>
						<!-- 设备分布 -->
						<view class="zl_independentTravel3" @click="click(3)">
							<image class="zl_itImage3" :hidden="type==3"  src="../../static/HOME/shebeifenbu.png" mode="aspectFit"></image>
							<image class="zl_itImage3" v-if="type===3" src="../../static/HOME/shebeifenbu2.png" mode="aspectFit"></image>
							<text class="zl_itText3" :class="{current:type===3}">设备分布</text>
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
				type: 0,
				// selectBank: [{
				// 		txt: '客运中心站',
				// 	},
				// 	{
				// 		txt: '泉州汽车站',
				// 	}
				// ],
				selectBank: [{
					AID: '',
					CompanyID: '',
					StationID: '',
					StationName: '',
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
				DeviceData: [], //设备分类
				standAlone: [], //设备列表
				state: 0,
				popUpModule : '',//点击的设备编号
				equipment : '',//设备总和
			}
		},
		onLoad: function() {
			
		},

		onShow:function() {
			this.interfaceData();
		},

		methods: {
			//----------------------接口数据--------------------------------------
			interfaceData: function() {
				//获取所有的车站
				uni.showLoading({
					title:'获取车站信息中...'
				})
				uni.request({
					url: $Sbjg.SbjgInterface.GetStarte.Url,
					method: $Sbjg.SbjgInterface.GetStarte.method,
					header:$Sbjg.SbjgInterface.GetStarte.header,
					success: (res) => {
						console.log('获取所有的车站', res)
						this.selectBank = res.data;
						this.bankObject = res.data[0].StationName;
						this.deviceData();
					}
				})
				//获取所有的设备数据

			},
			
			//获取设备分类
			deviceData: function() {
				uni.request({
					url: $Sbjg.SbjgInterface.GetNumAll.Url,
					method: $Sbjg.SbjgInterface.GetNumAll.method,
					header:$Sbjg.SbjgInterface.GetNumAll.header,
					data: {
						CompanyName: this.bankObject,
					},
					success: (res) => {
						console.log('获取所有的设备数据',res)
						this.DeviceData =res.data;
						uni.hideLoading()
						this.totalEquipment();
						
					}
				})
			},
			
			//获取设备列表
			getDeviceList: function() {
				uni.showLoading({
					title:'请求设备列表中...',
				})
				uni.request({
					url: $Sbjg.SbjgInterface.GetSerialsByID.Url,
					method: $Sbjg.SbjgInterface.GetSerialsByID.method,
					header:$Sbjg.SbjgInterface.GetSerialsByID.header,
					data: {
						CompanyName: this.bankObject,
						type : this.popUpModule,
					},
					success: (res) => {
						console.log('获取所有的设备数据',res)
						this.standAlone =res.data;
						uni.hideLoading()
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
			checkAttention:function(e) {
				if(e == '凭单机'){
					this.popUpModule = '';
					this.popUpModule = 2;
					this.getDeviceList();
					this.$refs.popup.open()
				}else if(e == '检票机'){
					this.popUpModule = '';
					this.popUpModule = 0;
					this.getDeviceList();
					this.$refs.popup.open()
				}else if(e == '售票机'){
					this.popUpModule = '';
					this.popUpModule = 1;
					this.getDeviceList();
					this.$refs.popup.open()
				}
				
			},
			close() {
				this.$refs.popup.close()
			},

			//-------------------------------跳转---------------------------------
			Jump(item) {
				uni.setStorage({
					key:'equipmentParameters',
					data:item,
					success:function(){
						uni.navigateTo({
							url: '../../pages_SBJG/pages/details'
						})
					},
					fail:function(){
						uni.showToast({
							title:'获取设备参数异常，请关闭弹框重新点击',
							icon:'none'
						})
					}
				})
				
			},

			//-----------------tab事件---------------------------------------
			click:function(e){
				if (e == 1) {
					if(this.type ==e){
						this.type = 0;
					}else{
						this.type = 1;
					}
				} else if (e == 2) {
					if(this.type ==e){
						this.type = 0;
					}else{
						this.type = 2;
					}
				} else if (e == 3) {
					if(this.type ==e){
						this.type = 0;
					}else{
						this.type = 3;
					}
				}
			},
			
			//设备参数变更
			EquipmentName:function(e){
			    if(e==0){
			     return '检票机'
			    }else if(e==1){
			     return '售票机'
			    }else if(e==2){
			     return '凭单机'
			    }
			 },
			 
			 //设备总和
			 totalEquipment:function(){
				 var sum = 0;
				 for(var i=0; i<this.DeviceData.length; i++){
					 // console.log(this.DeviceData)
					 sum += this.DeviceData[i].num
					 console.log(sum)
				 }
				this.equipment = sum;
				//缓存设备类型和设备总数
				uni.setStorageSync('stationNum',{
					typeNum:this.DeviceData.length,
					equipmentNum:this.equipment,
				});
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
			/* #ifndef H5 */
			padding-top: 114upx;
			/* #endif */
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
					font-size: 40upx;
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
							font-size: 28upx;
							color: #999999;
							padding-bottom: 30upx;
						}

						.ct_text {
							position: absolute;
							bottom: 0;
							right: 0;
							margin: 30upx;
							padding: 10upx 20upx;
							font-size: 24upx;
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
			height: 600upx;

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
					margin-top: 16upx;
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
							text-overflow: ellipsis; //文章超出宽度隐藏并用...表示
							white-space: nowrap;
							overflow: hidden;
							width: 480upx;
						}

						.ct_content {
							display: flex;

							.ct_number {
								position: absolute;
								bottom: 0;
								font-size: 28upx;
								color: #999999;
								padding-bottom: 40upx;
							}

							.ct_state {
								position: absolute;
								bottom: 0;
								font-size: 28upx;
								padding-bottom: 40upx;
								padding-left: 172upx;
							}


							.ct_text {
								position: absolute;
								bottom: -14upx;
								right: 0;
								margin: 40upx 20upx;
								padding: 8upx 24upx;
								font-size: 22upx;
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
						width: 30upx;
						height: 30upx;
						top: 16upx;
					}

					.zl_itText {
						padding-left: 38upx;
						font-size: 30upx;
						color: #333333;
						line-height: 54upx;

						&.current {
							color: #5694fb;
						}
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
						width: 30upx;
						height: 30upx;
						top: 16upx;
					}

					.zl_itText2 {
						padding-left: 38upx;
						font-size: 30upx;
						color: #333333;
						line-height: 58upx;

						&.current {
							color: #5694fb;
						}
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
						width: 30upx;
						height: 30upx;
						top: 16upx;
					}

					.zl_itText3 {
						padding-left: 38upx;
						font-size: 30upx;
						color: #333333;
						line-height: 56upx;

						&.current {
							color: #5694fb;
						}
					}
				}
			}
		}
	}
</style>
