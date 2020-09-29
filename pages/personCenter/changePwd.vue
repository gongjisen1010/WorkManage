<template>
	<view class="content">
		<view class="itemClass">
			<text class="fontClass">旧密码</text>
			<input type="password" v-model="oldPwd" maxlength="20" class="inputClass" placeholder="请输入旧密码"/>
		</view>
		<view class="itemClass">
			<text class="fontClass">新密码</text>
			<input type="password" v-model="newPwd" maxlength="20" class="inputClass" placeholder="请输入新密码"/>
		</view>
		<view class="itemClass">
			<text class="fontClass">确认密码</text>
			<input type="password" v-model="comPwd" maxlength="20" class="inputClass" placeholder="请再次输入密码"/>
		</view>
		
		<button class="btnClass bc_blue" @click="submit">提交</button>
	</view>
</template>

<script>
export default{
	data(){
		return{
			oldPwd:'',	//旧密码
			newPwd:'',	//新密码
			comPwd:'',	//确认密码
			userId:'',	//用户id
		}
	},
	onLoad() {
		uni.getStorage({
			key:'userInfo',
			success:res=>{
				this.userId = res.data.userId;
			}
		})
	},
	methods:{
		submit(){
			console.log();
			if(this.oldPwd == ""){
				uni.showToast({
					title: '请输入旧密码',
					icon:'none',
				});
			}else if(this.newPwd == ""){
				uni.showToast({
					title: '请输入新密码',
					icon:'none',
				});
			}else if(this.newPwd.length < 9){
				uni.showToast({
					title: '密码不能少于9位',
					icon:'none',
				});
			}else if(this.comPwd == ""){
				uni.showToast({
					title: '请再次输入密码',
					icon:'none',
				});
			}else if(this.comPwd != this.newPwd){
				uni.showToast({
					title: '两次输入的密码不一样',
					icon:'none',
				});
				this.comPwd = "";
			}else{
				uni.request({
					url: this.$all.getUrl()+this.$all.Inter_person.updatePwd.url,
					method: this.$all.Inter_person.updatePwd.method,
					data: {
						newPwd:this.newPwd,
						pwd:this.oldPwd,
						id:this.userId,
					},
					success: res => {
						if(res.data.status){
							uni.showToast({
								title: res.data.msg,
							});
							setTimeout(function(){
								uni.navigateBack();
							},300)
						}else{
							uni.showToast({
								title: res.data.msg,
								icon:'none',
							});
							this.comPwd = "";
						}
					},
				});
			}
		}
	}
}
</script>

<style lang="scss">
	page{
		background-color: #ffffff;
	}
	
	.itemClass{
		width: 100%;
		display: flex;
		flex-direction: column;
		border-bottom: 1upx solid #dadada;
		.fontClass{
			margin-left: 5%;
			padding-top: 30upx;
		}
		.inputClass{
			margin-left: 5%;
			padding: 30upx 0;
		}
	}

	
	.btnClass{
		width: 90%;
		position: fixed;
		left: 5%;
		bottom: 30upx;
		color: #FFFFFF;
	}
</style>
