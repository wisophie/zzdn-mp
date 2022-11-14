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
			<view class="navigate-item" @click="toPage('/pages/mine/mine', '', true)">个人<br>信息</view>
			<view class="navigate-item" @click="toPage('/pages_goods/order-list')">我的<br>订单</view>
			<view class="navigate-item" @click="toPage('/pages/share/share', 'switchTab', false, true)">我的<br>共享</view>
			<view class="navigate-item" @click="toPage('/pages_chat/conversation', 'switchTab')">我的<br>沟通</view>
			<view class="navigate-item" @click="toPage('/pages/platform/platform', 'switchTab')">我的<br>平台</view>
		</view>

		<view class="content-more">
			<view class="more-item" @click="toPage('/pages/buyer/list')">
				<view class="item-icon">
					<u-icon name="shopping-cart" size="70rpx" color="red"></u-icon>
				</view>
				<view class="item-title">本地采购</view>
			</view>
			<view class="more-item" @click="toPage('/pages/share/share', 'switchTab')">
				<view class="item-icon">
					<u-icon name="share" size="70rpx" color="green"></u-icon>
				</view>
				<view class="item-title">共享</view>
			</view>
			<view class="more-item" @click="toPage('/pages/help/help-list')">
				<view class="item-icon">
					<u-icon name="car" size="70rpx" color="blue"></u-icon>
				</view>
				<view class="item-title">跑腿/帮忙</view>
			</view>
			<view class="more-item"  @click="toPage('/pages/mine/afterService', '', true)">
				<view class="item-icon">
					<u-icon name="server-man" size="70rpx" color="pink"></u-icon>
				</view>
				<view class="item-title">纠纷处理</view>
			</view>
			<view class="more-item" @click="toPage('/pages/platform/platform', 'switchTab')">
				<view class="item-icon">
					<u-icon name="home" size="70rpx" color="gold"></u-icon>
				</view>
				<view class="item-title">平台共建</view>
			</view>
			<view class="more-item" @click="toPage('/pages/mine/moreFunction')">
				<view class="item-icon">
					<u-icon name="more-circle" size="70rpx" color="black"></u-icon>
				</view>
				<view class="item-title">更多功能</view>
			</view>
		</view>

		<view v-if="buyList.length" class="content-list">
			<view class="list-title">采购需求</view>
			<u-list>
				<u-list-item v-for="(item, index) in buyList" :key="index">
					<view class="list-item" @click="toNeedDetail(item.id)">
						<view class="item-title">
							<view class="title">{{ item.goodsName }}</view>
						</view>
						<view>发布人：{{ item.username || '-' }}</view>
						<view>材质：{{ item.texture }}</view>
						<view>规格：{{ item.specification }}</view>
						<view>工期：{{ item.duration }}</view>
					</view>
				</u-list-item>
				<view class="list-bottom" @click="toPage('/pages/buyer/list')">点击查看全部采购需求</view>
			</u-list>
		</view>

		<SwitchIdentity ref="identity" @success="val => userLevel = val"></SwitchIdentity>
	</view>
</template>

<script>
import { fetchUserInfo } from '@/api/login'
import { buyNeedList } from '@/api/goods'
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
				'https://steel-ren.oss-cn-beijing.aliyuncs.com/v354ueo53dw31omtj773.jpg',
				'https://steel-ren.oss-cn-beijing.aliyuncs.com/cbvfly0sugum9vmrqqjh.jpg',
				'https://steel-ren.oss-cn-beijing.aliyuncs.com/htbqbupfwvs1uzhy621b.jpg',
			],
			buyList: [],
			isLogin: false
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
	onLoad(){
		const token =  uni.getStorageSync('token')
		if(token){
			this.fetchUserInfo()
		}
		this.getBuyNeedList()
	},
	onShow() {
		user
			.checkLogin()
			.then(() => {
				this.isLogin = true
				this.fetchUserInfo()
			})
			.catch(err => {
				this.isLogin = false
				uni.removeStorageSync('token');
				uni.removeStorageSync('userInfo');
			})
	},
	methods: {
		toPage(url, type, needLogin, needFrom) {
			if (needLogin && !this.isLogin) {
				uni.navigateTo({
					 url: '/pages/login/login'
				})
				return
			}
			if (type === 'switchTab') {
				if (needFrom) {
					uni.setStorageSync('from', 'home')
				}
				uni.switchTab({ url });
			} else {
				uni.$u.route(url)
			}
		},

		fetchUserInfo() {
      fetchUserInfo({}, true).then(res => {
				const userInfo = uni.getStorageSync('userInfo')
				uni.setStorageSync('userInfo', {
					...userInfo,
					...res.data
				})
				this.userLevel = res.data.userLevel
      })
		},
		
		handleSwitch() {
			if (!this.isLogin) {
				uni.navigateTo({
					 url: '/pages/login/login'
				})
				return
			}
			this.$refs.identity.show()
		},

		getBuyNeedList() {
      buyNeedList({
        goodsName: '',
        page: 1,
        limit: 10,
        sort: '', 
        order: ''
      }).then(res => {
        this.buyList = res.data.list
      })
		},
		
		toNeedDetail(id) {
			if (!this.isLogin) {
				uni.navigateTo({
					 url: '/pages/login/login'
				})
				return
			}
      uni.navigateTo({
         url: `/pages/buyer/demand?id=${id}&detail=1`
      });
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
	overflow: auto;

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
		margin-top: 40rpx;
		display: flex;
		align-items: center;

		.navigate-item {
			flex: 1;
			padding: 20rpx;
			margin-right: 20rpx;
			// border: 1rpx solid #fff;
			// color: #fff;
			border-radius: 16rpx;
			text-align: center;
			background: #fff;
			color: #333;
			box-shadow: 0px 4rpx 6rpx 1rpx #fff;
			font-weight: bold;

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
				font-weight: bold;
			}
		}
	}

	.content-list {
		padding: 24rpx;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		background: #fff;
		border-radius: 8rpx;

		.list-title {
			padding-bottom: 24rpx;
			font-size: 40rpx;
			font-weight: bold;
			border-bottom: 1rpx solid #efefef;
		}

		.list-item {
			padding: 20rpx;
			background: #fff;
			border-bottom: 1rpx solid #efefef;

			.item-title {
				position: relative;
				font-size: 32rpx;
				color: #333;
				font-weight: bold;
				margin-bottom: 10rpx;
				display: flex;
				align-items: center;

				.title {
					flex: 1;
				}
			}
		}

		.list-bottom {
			margin-top: 24rpx;
			text-align: center;
			color: #ccc;
			font-size: 26rpx;
		}
	}
}
</style>
