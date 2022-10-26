<template>
	<view>
		<view class="g-section">
		  <view class="text-md text-bold">标题标题标题标题标题标题标题标题</view>
		  <view class='mt-2 u-tips-color text-s'>
			  <text >发布人：xxx</text>
		  </view>
		 
		 
		</view>
		<view class="g-section os-price u-border-top u-border-bottom">
			<view class="os-price__row">
				<text class="os-price__row__label">任务类型</text>
				<text class="os-price__row__value">帮忙</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">所在地点</text>
				<text class="os-price__row__value">xxx</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">发布时间</text>
				<text class="os-price__row__value">22：22</text>
			</view>
			
		</view>
		<view class="g-section">
		  <view class="pb-4 text-md text-bold">任务详情</view>
		  <view>
		    这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容
		  </view>
		  <view class="mission mt-1 u-tips-color text-md">
		    <text>任务报酬</text>
		    <text class="u-warning">￥</text>
		    <text class="u-warning text-bold text-md">20</text>
		  </view>
		</view>
		<view class="b-footer shadow-top">
		  <view class="b-footer__left">
			  <view @tap="handleRoute('C2Cyanli')">
				  <u-icon name="chat" class="u" color="#303133" size="28" />
				  <text>联系他</text>
			  </view>
		    
		  </view>
		  <view class="b-footer__right" @click="toOrder">
		    <text class="bt" >我要接单</text>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			handleRoute(id) {
				const url = `../TUI-Chat/chat?conversationID=${id}`;
				uni.navigateTo({
					url
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.g-section {
  width: 750rpx;
  padding: 16px;
  background-color: #fff;
}
.os-price__row + .os-price__row {
	margin-top: 10px;
	
}
.os-price {
	
	&__row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: $u-main-color;
		line-height: 1.6;
		&__label {
			color: $u-content-color;
		}
	}
}
.mission{
	text-align: right; 
	margin-right:10rpx;
	margin-top:100rpx;
}

.b-footer {
	position: fixed;
	height:110rpx;
	left:0;
	bottom:0;
	display: flex;
	width: 100%;
	//padding: 0 32rpx;
	&__right{
		flex:1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $u-white;
		background-color: $u-primary;
	}
	&__left{
		flex:0.3;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $u-white;
		
	}
	.u{
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	
}
</style>
