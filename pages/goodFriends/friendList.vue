<template>
	<view class="content">
		<u-index-list :scrollTop="scrollTop" :index-list="indexList">
			<view v-for="(item, index) in list" :key="index">
				<u-index-anchor :index="item.code" />
				<view class="list-cell u-border-bottom" v-for="(item1, index1) in item.data" :key="index1" @click="select(item1)">
					{{item1.userName}}
				</view>
			</view>
		</u-index-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				indexList:[],
				list:[],
			}
		},
		onLoad() {
			this.loadList();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		
		methods:{
			//--------------------------------加载好友列表--------------------------------
			loadList(){
				uni.request({
					url:this.$all.getUrl() + this.$all.Inter_friendList.getFriendList.url,
					method: this.$all.Inter_friendList.getFriendList.method,
					success: res => {
						console.log(res);
						this.handleData(res.data.data);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//--------------------------------数组去重排序--------------------------------
			removal(arr){
			   let newArr = []
			   arr.forEach((val)=>{
			         if(newArr.indexOf(val) == -1){
			              newArr.push(val)
			          }
			    })    
			   return newArr.sort();
			},
			
			//--------------------------------数据处理--------------------------------
			handleData(data){
				let totalList = [];
				var arr = data.map(val => {
					return val.code;
				})
				let arrList =this.removal(arr);
				for(var i = 0; i < arrList.length; i++){
					let array = [];
					for(var item of data){
						if(item.code == arrList[i]){
							array.push(item);
						}
					}
					totalList.push({
						code:arrList[i],
						data:array,
					});
				}
				this.indexList = arrList;
				this.list = totalList;
			},
			
			//--------------------------------选中用户--------------------------------
			select(item){
				console.log(item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
	}
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
	
	.anchor-text {
		color: #333333;
	}
</style>