<template>
	<!-- 背景图 -->
	<view class="content">
		<!-- <image class="bg-set" src="../../static/projectProgress/backImg.jpg"></image> -->
	</view>
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
	methods:{
		//---------------------------------for循环，遍历数组---------------------------------
		forMethod(){
			let array = []; //数组
			//第一种
			for (let item of array){
				
			}
			//第二种
			var list=array.filter(item => {
				return item.userDefault == true; //条件
			})
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
	//背景图
	.bg-set{
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    background-color: #f4f4f4;
	    z-index: -1;
	}
	
	.text{
		display: flex;
		align-items: center;//垂直居中
		justify-content: center;//水平居中
	}
</style>
