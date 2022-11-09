<template>
  <view class="container">
    <!-- <view>售后服务：138xxxxxxxxx</view> -->
    <view style="margin-top: 30rpx;">联系平台客服处理纠纷（启用用户陪审团机制）</view>
	<view style="margin-top: 30rpx;">平台客服微信号：DNCYHLW</view>
	<view style="margin-top: 60rpx;">
		<u-button class="mt-4" type="primary" @click="toafterservice">联系平台在线客服</u-button>
	</view>
	<view style="margin-top: 30rpx;">
		<u-button class="mt-4" type="primary" @click="tojudge">启动用户陪审团协助处理纠纷</u-button>
	</view>
  </view>
</template>
<script>
export default {
		//mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				id:16,
			}
		},
		methods:{
			toafterservice(){
				const url = `../../pages_chat/chat?conversationID=C2C${this.id}`;
				uni.navigateTo({
					url
				});
			},
			tojudge(){
				uni.$u.route('pages_platform/vote-edit')
			}
		}
}
</script>

<style lang="scss" scoped>
.container {
  padding: 32rpx;
}
</style>