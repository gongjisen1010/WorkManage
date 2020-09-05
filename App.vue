<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	@import url("@/common/commonCss.css");
	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
		background-color: #f5f5f5;
	}
	.content{
		width: 100%;
	}
</style>
