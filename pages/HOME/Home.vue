<template>
	<view class="content">
		<image src="../../static/Home/banner.jpg" class="imgClass"></image>
		
		<view class="boxClass">
			<view v-for="(item,index) in functionList" :key="index" class="functionClass" hover-class="btn_Click" @click="operateClick(item.title)">
				<view class="itemClass" :class="item.style">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				functionList:[{
					title:"工作报告", 
					style:"Color1",
				},
				{
					title:"项目管理",
					style:"Color2",
				},
				{
					title:"查询",
					style:"Color3",
				},
				{
					title:"添加",
					style:"Color4",
				}]
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods:{
			operateClick(e){
				switch (e){
					case '工作报告':
						uni.navigateTo({
							url:'../workReport/reportList',
						})
						break;
					case '项目管理':
						uni.navigateTo({
							url:'../projectManage/projectManage',
						})
						break;
					case '查询':
						uni.navigateTo({
							//url:'../workReport/reportList',
						})
						break;
					case '添加':
						uni.navigateTo({
							//url:'../workReport/reportList',
						})
						break;
					default:
						return '';
				}
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.content{
		width: 100%;
	}
	.imgClass{
		width: 100%;
		height: 430upx;
	}
	.boxClass{
		display: flex; 
		flex-wrap: wrap;
		margin-left: 2%;
	}
	.functionClass{
		width: 48%;
		margin: 2% 2% 0% 0%;
		display: flex;
		flex-direction: row;
		box-shadow:0px 6px 6px 0px rgba(4,0,0,0.09);
	}
	.itemClass{
		color: #FFFFFF;
		padding:100upx 0;
		width: 100%;
		text-align: center;
	}
	.Color1{
		background-color:#00D0CF;
	}
	.Color2{
		background-color:#FD6478;
	}
	.Color3{
		background-color:#F0C052;
	}
	.Color4{
		background-color:#41ADF8;
	}
	
	/* 按钮点击效果 */
	.btn_Click{
		transition: all .3s; /*过渡 */ 
		opacity: 0.9;
		background-color:#737373;
	}
	
</style>
