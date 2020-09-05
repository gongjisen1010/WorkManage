<template>
	<view class="content">
		<view class="topBox">
			<text class="fontClass loginClass" @click="declick">登录</text>
			<view class="triangle" :class="tab?'pl1':'pl2'"></view>
			<!-- <view :animation="animationData" class="triangle" :class="tab?'pl1':'pl2'" @click="declick"></view> -->
			<text class="fontClass registerClass" @click="switchTab(false)">注册</text>
		</view>
		
		<view class="itemClass">
			<image src="../../static/PersonCenter/num.png" class="imgClass"></image>
			<input type="number" v-model="number" maxlength="15" class="inputClass" placeholder="请输入您的账号" />
		</view>
		<view class="itemClass">
			<image src="../../static/PersonCenter/pwd.png" class="imgClass"></image>
			<input type="password" v-model="password" maxlength="20" class="inputClass" placeholder="请输入您的密码" />
		</view>
		
		<view class="rememberBox" v-if="tab">
			<checkbox-group @change="rememberChange">
				<label>
					<checkbox :value="rememberPassword" :checked="rememberPassword" color="#0055ff" style="transform:scale(0.7)" />记住密码
				</label>
			</checkbox-group>
		</view>
		
		<view class="btnClass bc_blue" @click="checkNumPwd">
			{{btn_Text}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				animationData: {},
				off: false,
				
				tab:true,   	//切换登录注册
				number:'',		//账号
				password:'',	//密码
				btn_Text:'登录',		//按钮显示文字
				rememberPassword:false, //是否记住密码
			}
		},
		onLoad() {
			this.loadPassword();
		},
		onShow() {
			// 初始化一个动画
			var animation = uni.createAnimation({
			    duration: 1000,
			    timingFunction: 'ease',
			})
			this.animation = animation
		},
		methods:{
			//----------------------------------------切换登录注册----------------------------------------
			switchTab(e){
				this.tab = e;
				this.btn_Text = e ? "登录" : "注册";
				if(this.btn_Text == "登录"){
					this.loadPassword();
				}else{
					this.number = "";
					this.password = "";
				}
			},
			
			//----------------------------------------加载账号密码----------------------------------------
			loadPassword(){
				uni.getStorage({
					key:'password',
					success: res => {
						this.rememberPassword = true;
						this.number = res.data.number;
						this.password = res.data.password;
					},
					fail: () => {
						this.rememberPassword = false;
					}
				})
			},
			
			//----------------------------------------检查账号密码----------------------------------------
			checkNumPwd(){
				if(this.number<10){
					uni.showToast({
						title: '账号不能少于10位'
					});
				}else if(this.password<10){
					uni.showToast({
						title: '密码不能少于10位'
					});
				}else{
					if(this.tab){
						this.loginClick();
					}else{
						this.registerClick();
					}
				}
			},
			
			//----------------------------------------登录----------------------------------------
			loginClick(){
				uni.showLoading({
					title: '登录中...',
					mask: false
				});
				uni.request({
					url:this.$all.getUrl() + this.$all.Inter_person.login.url,
					method: this.$all.Inter_person.login.method,
					data: {
						num : this.number,
						pwd : this.password,
					},
					success: res => {
						console.log(res);
						uni.showToast({
							title: res.data.msg,
							icon:'none',
						});						
						if(res.data.status){
							this.setUserInfo(res.data.data.aid);
							uni.setStorageSync('password',{
								number:this.number,
								password:this.password,
							})
						}else{
							this.password = "";
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '网络连接失败',
							icon:'none',
						});
					},
				});
			},
			
			//----------------------------------------注册----------------------------------------
			registerClick(){
				uni.showLoading({
					title: '提交中...',
					mask: false
				});
				uni.request({
					url: this.$all.getUrl() + this.$all.Inter_person.register.url,
					method: this.$all.Inter_person.register.method,
					data: {
						num : this.number,
						pwd : this.password,
					},
					success: res => {
						uni.showToast({
							title: res.data.msg,
							icon:'none',
						});
					},
					fail: (err) => {
						uni.showToast({
							title: '网络连接失败',
							icon:'none',
						});
					},
				});
			},
			
			//----------------------------------------记住密码----------------------------------------
			rememberChange(){
				if(this.rememberPassword){
					this.rememberPassword = false;
				}else{
					this.rememberPassword = true;
				}
			},
			
			//----------------------------------------缓存用户信息----------------------------------------
			setUserInfo(e){
				uni.request({
					url: this.$all.getUrl() + this.$all.Inter_person.getUserByUserId.url,
					method: this.$all.Inter_person.getUserByUserId.method,
					data: {
						id : e,
					},
					success: res => {
						uni.setStorageSync('userInfo',res.data.data)
						setTimeout(function(){
							uni.switchTab({
								url:'/pages/personCenter/personCenter',
							})
						},300)
					},
					fail: (err) => {
						uni.showToast({
							title: '网络连接失败',
							icon:'none',
						});
					},
				});
			},
			
			//----------------------------------------动画----------------------------------------
			declick() {
			    if (this.off) {
			        // 使用动画
			        this.rotateAndScale()
			    } else {
			        this.norotateAndScale()
			    }
			    this.off = !this.off
			},
			// 定义动画内容
			rotateAndScale() {
			    // 定义动画内容
				this.animation.translate(130).step({ duration: 1000 })
			    // 导出动画数据传递给data层
			    this.animationData = this.animation.export()
			},
			norotateAndScale() {
			    this.animation.rotate(0).scale(1, 1).step()
			    this.animationData = this.animation.export()
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #ffffff;
	}
	.topBox{
		width: 100%;
		height: 400upx;
		background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
		position: relative;
	}
	.fontClass{
		color: #ffffff;
		font-size: 40upx;
		position: absolute;
		top:325upx;
	}
	.loginClass{
		
		left: 25%;
	}
	.registerClass{
		left: 60%;
	}
	
	.triangle{
		width: 0px;     //设置宽高为0，所以div的内容为空，从才能形成三角形尖角
		height: 0px;
		border-bottom: 20upx solid #ffffff;
		border-left: 20upx solid transparent;    //transparent 表示透明
		border-right: 20upx solid transparent;
		position: absolute;
		top:382upx;
	}
	.pl1{
		left: 28%;
	}
	.pl2{
		left: 63%;
	}
	
	.itemClass{
		background-color: #f4f4f4;
		margin-top: 50upx;
		display: flex;
		flex-direction: row;
		border-radius: 60upx;
		width: 80%;
		margin-left: 10%;
	}
	.imgClass{
		width: 45upx;
		height: 40upx;
		padding: 30upx;
	}
	.inputClass{
		width: 60%;
		margin-top: 27upx;
		color: #333333;
	}
	
	.rememberBox{
		margin-top: 30upx;
		display: flex;
		flex-direction: row;
		border-radius: 60upx;
		width: 80%;
		margin-left: 10%;
	}
	
	.btnClass{
		width: 80%;
		text-align: center;
		margin-top: 50upx;
		margin-left: 10%;
		font-size: 36upx;
		padding: 20upx 0;
		color: #ffffff;
		border-radius: 60upx;
	}
</style>
