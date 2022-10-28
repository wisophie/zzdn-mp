<template>
	<view class="content full">
		<view class="content-header">
			<text>当前身份：{{ userLevelText }}</text>
			<text class="header-btn" @click="handleSwitch">切换身份</text>
		</view>

		<view class="content-swiper">
			<u-swiper
				:list="list"
				indicator
				indicatorMode="dot"
			></u-swiper>
		</view>

		<view class="content-navigate">
			<view class="navigate-item" @click="toPage('/pages/home/mine')">个人信息</view>
			<view class="navigate-item" @click="toPage('/pages/goods/order-list')">我的订单</view>
			<view class="navigate-item" @click="toPage('/pages/share/share', 'switchTab')">我的共享</view>
			<view class="navigate-item" @click="toPage('/pages/TUI-Conversation/conversation/conversation', 'switchTab')">我的沟通</view>
			<view class="navigate-item" @click="toPage('/pages/platform/platform', 'switchTab')">我的平台</view>
		</view>

		<view class="content-more">
			<view class="more-item" @click="toPage('/pages/goods/goods', 'switchTab')">
				<view class="item-icon">图标</view>
				<view class="item-title">本地采购</view>
			</view>
			<view class="more-item" @click="toPage('/pages/share/share', 'switchTab')">
				<view class="item-icon">图标</view>
				<view class="item-title">共享</view>
			</view>
			<view class="more-item" @click="toPage('/pages/help/help-list')">
				<view class="item-icon">图标</view>
				<view class="item-title">跑腿/帮忙</view>
			</view>
			<view class="more-item"  @click="toPage('/pages/home/afterService')">
				<view class="item-icon">图标</view>
				<view class="item-title">售后服务</view>
			</view>
			<view class="more-item" @click="toPage('/pages/platform/platform', 'switchTab')">
				<view class="item-icon">图标</view>
				<view class="item-title">平台共建</view>
			</view>
			<view class="more-item" @click="toPage('/pages/home/moreFunction')">
				<view class="item-icon">图标</view>
				<view class="item-title">更多功能</view>
			</view>
		</view>

		<SwitchIdentity ref="identity"></SwitchIdentity>

		<!-- <view @click="toPage('/pages/home/mine')">个人信息</view>
		<view class="text-sm u-primary">{{ title }}</view>
		<view class="mt-4"><u-button type="primary" @click="toPage('/pages/goods/goods-detail')">商品详情</u-button></view>
		<view class="mt-4"><u-button type="primary" @click="toPage('/pages/goods/order-list')">订单列表</u-button></view>
		<view class="mt-4"><u-button  type="primary" @click="toPage('/pages/help/help-list')">跑腿订单列表</u-button></view>
		<view class="mt-4"><u-button  type="primary" @click="toPage('/pages/TUI-Login/login')">IM登录ID:xiaoming</u-button></view> -->
	</view>
</template>

<script>
import { fetchUserInfo } from '@/api/login'
import user from '@/utils/user'

import SwitchIdentity from '@/components/SwitchIdentity'
export default {
	components: {
		SwitchIdentity
	},

	data() {
		return {
			userLevel: 0,
			list: [
				'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				'https://cdn.uviewui.com/uview/swiper/swiper3.png',
			],
		}
	},
	computed: {
		userLevelText() {
			return this.userLevel === 0 
				? '游客' 
				: this.userLevel === 1
				? '供货商'
				: '采购商'
		}
	},
	onShow() {
		user
			.checkLogin()
			.then(() => {
				this.fetchUserInfo()
			})
			.catch(err => {
				console.log(err, '--gg')
				uni.navigateTo({
					url: '/pages/login/login'
				})
			})
	},
	methods: {
		toPage(url, type) {
			if (type === 'switchTab') {
				uni.switchTab({ url });
			} else {
				uni.$u.route(url)
			}
		},

		fetchUserInfo() {
      fetchUserInfo({}).then(res => {
				const userInfo = uni.getStorageSync('userInfo')
				uni.setStorageSync('userInfo', {
					...userInfo,
					...res.data
				})
				this.userLevel = res.data.userLevel
      })
		},
		
		handleSwitch() {
			this.$refs.identity.show()
		}
	}
}
</script>

<style>
page {
	width: 100%;
	height: 100%;
}
</style>
<style lang="scss" scoped>
.content {
	padding: 0 32rpx;
	background: #5c4ffe;

	.content-header {
		height: 88rpx;
		line-height: 88rpx;
		font-size: 32rpx;
		color: #fff;

		.header-btn {
			margin-left: 20rpx;
			font-size: 28rpx;
		}
	}

	.content-navigate {
		margin-top: 20rpx;
		display: flex;
		align-items: center;

		.navigate-item {
			flex: 1;
			padding: 20rpx;
			margin-right: 20rpx;
			border: 1rpx solid #fff;
			border-radius: 16rpx;
			color: #fff;
			text-align: center;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	.content-more {
		margin-top: 60rpx;
		background: #fff;
		border-radius: 8rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		overflow: hidden;

		.more-item {
			width: 33%;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-right: 1rpx solid #efefef;
			border-bottom: 1rpx solid #efefef;

			.item-title {
				margin-top: 30rpx;
				color: #333;
				font-size: 32rpx;
			}
		}
	}

}
</style>
