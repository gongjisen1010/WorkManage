<template>
	<view class="content">
		<view class="itemClass line_height bt" @click="changePortrait" hover-class="btn_Click">
			<text class="fontClass">头&nbsp;像</text>
		</view>
		<image :src="portrait||'/static/PersonCenter/headImg.jpg'" class="imgClass" @click="previewPortrait"></image>
		
		<view class="itemClass bt">
			<text class="fontClass">昵&nbsp;称</text>
			<input v-model="name" class="inputClass" maxlength="15" placeholder="请输入昵称" />
		</view>
		
		<view class="itemClass bt">
			<text class="fontClass">性&nbsp;别</text>
			<picker mode="selector" @change="changeSex" class="inputClass" :range="sexList" :value="sexIndex">
				{{sex}}
			</picker>
		</view>
		
		<view class="itemClass bt">
			<text class="fontClass">生&nbsp;日</text>
			<picker class="inputClass" name="birthday"  mode="date" @change="dateChange" v-model="birthday"  :start="startDate" :end="endDate" placeholder="请选择"  >
				{{birthday}}
			</picker>
		</view>
		
		<view class="signClass">
			<text class="fontClass">签&nbsp;名</text>
			<textarea placeholder="请输入签名" class="inputClass" maxlength="150" v-model="signature"/>
		</view>
		
		<button class="btnClass bc_blue" @click="submit">保存</button>
	</view>
</template>

<script>
import { pathToBase64, base64ToPath } from '@/components/js_sdk/gsq-image-tools/image-tools/index.js';
export default{
	data(){
		return{
			userId:'',		//用户id
			portrait:'',	//头像
			// base64_portrait:'', //base64格式头像
			name:'',		//昵称
			
			sex:'请选择',	//性别
			sexList:['请选择','男','女'],  //性别选择
			sexIndex:0,		//默认性别的下标
			
			birthday:'',	//出生日期
			signature:'',		//个性签名
		}
	},
	computed:{
		startDate() {
		    return this.getDate('start');
		}, 
		endDate() {
		    return this.getDate('end');
		},
	},
	onLoad() {
		uni.getStorage({
			key:'userInfo',
			success:res=>{
				this.userId = res.data.userId;
				this.name = res.data.userName;
				this.birthday = res.data.userBirthday.substr(0,10) ||'请选择';
				this.sex = res.data.userSex||'请选择';
				if(res.data.userSex !=""){
					this.sexIndex = this.sexList.indexOf(res.data.userSex);
				}
				this.signature = res.data.userSignature;
				this.portrait = res.data.userPortrait;
			},
		})
	},
	methods:{
		//--------------------------------修改头像--------------------------------
		changePortrait(){
			var that=this;
			uni.chooseImage({
				count:1,
				success(res) {
					var tempFilePaths = res.tempFilePaths;
					uni.saveFile({
						tempFilePath: tempFilePaths[0],
						success: function (res1) {
							pathToBase64(res1.savedFilePath)
							.then(base64 => {
								that.portrait=base64;
							})
						}
					}); 
				}
			})	
		},
		
		//--------------------------------预览头像--------------------------------
		previewPortrait(){
			uni.showLoading({
				mask:true,
				title:'图片加载中...'
			})
			base64ToPath(this.portrait)
			.then(path => {
				let array = [];
				array.push(path);
				uni.previewImage({
					urls: array,
				});
				uni.hideLoading();
			})
		},
		
		//--------------------------------------生日------------------------------------
		dateChange(e){
			this.birthday = e.detail.value;
		},
		
		//--------------------------------------获得日期------------------------------------
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 0;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		
		//--------------------------------------选择性别------------------------------------
		changeSex(e){
			this.sex = this.sexList[e.detail.value];
		},
		
		//--------------------------------------保存信息------------------------------------
		submit(){
			if(this.name == ""){
				uni.showToast({
					title: '请输入您的昵称',
					icon:'none',
				});
			}else if(this.birthday == "请选择"){
				uni.showToast({
					title: '请选择您的生日',
					icon:'none',
				});
			}else if(this.sex == "请选择"){
				uni.showToast({
					title: '请选择您的性别',
					icon:'none',
				});
			}else{
				uni.showLoading({
					title: '保存中...',
					mask: true
				});
				uni.request({
					url: this.$all.getUrl()+this.$all.Inter_person.updateUserByUserId.url,
					method: this.$all.Inter_person.updateUserByUserId.method,
					data: {
						id:this.userId,
						name:this.name,
						birthday:this.birthday,
						portrait:this.portrait,
						sex:this.sex,
						signature:this.signature,
					},
					success: res => {
						if(res.data.status){
							uni.showToast({
								title: '保存成功',
							});
							setTimeout(function(){
								uni.navigateBack();
							},300)
						}else{
							uni.showToast({
								title: res.data.msg,
								icon:'none',
							});
						}
					},
					fail: () => {},
				});
			}
		},
	}
}
</script>

<style lang="scss">
	page{
		background: #e6e6e6;
	}
	
	.itemClass{
		width: 100%;
		height: 110upx;
		background-color: #ffffff;
		display: flex;
		align-items: center;//垂直居中
		// justify-content: center;//水平居中
		.fontClass{
			margin-left: 5%;
		}
		.inputClass{
			width: 50%;
			margin-left: 28%;
			text-align: right;
		}
	}
	.line_height{
		height: 140upx;
	}
	
	.imgClass{
		position: absolute;
		left: 84%;
		top:32upx;
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
		border: 1upx solid #0055ff;
	}
	
	.bt{
		border-bottom: 1upx solid #F5F5F5;	
	}
	
	.signClass{
		width: 100%;
		display: flex;
		background-color: #ffffff;
		flex-direction: column;
		.fontClass{
			margin-left: 5%;
			margin-top: 20upx;
		}
		.inputClass{
			width: 87%;
			margin: 20upx 5% 30upx 5%;
			border: 1upx solid #333333;
			border-radius: 10upx;
			padding: 10upx;
		}
	}
	
	.btnClass{
		width: 90%;
		position: fixed;
		left: 5%;
		bottom: 30upx;
		color: #ffffff;
	}
	
	.btn_Click{
		transition: all .3s; /*过渡 */ 
		opacity: 0.9;
		background-color:#a1a2a6;
	}
</style>
