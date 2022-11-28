<template>
	<view>
		<u-swiper
			:list="banner"
			:height="240"
			:radius="0"
			:autoplay="false"
			:circular="true"
			indicatorStyle="right: 20px"
			@change="e => (current = e.current)"
		>
			<view slot="indicator" class="indicator-num">
				<text class="indicator-num__text">{{ current + 1 }}/{{ banner.length }}</text>
			</view>
		</u-swiper>

		<view class="g-section">
			<view class="text-md text-bold">{{ info.name }}</view>
			<view class="mt-1 u-tips-color text-sm">{{ info.keywords }}</view>
			<view class="mt-1 u-tips-color text-xs">
				<text>现价</text>
				<text class="u-warning">￥</text>
				<text class="u-warning text-bold text-md">{{ info.retailPrice }}</text>
			</view>
		</view>

		<view class="g-section bg-gray">
			<view class="g-sku">
				<view class="g-sku-item mb-2">
					<text class="g-sku-item__label">供货商</text>
					<text class="g-sku-item__value">{{ info.username }}</text>
				</view>
				<view class="g-sku-item mb-2">
					<text class="g-sku-item__label">分类</text>
					<text class="g-sku-item__value">{{ getCateText(info.categoryId) }}</text>
				</view>
				<view class="g-sku-item mb-2">
					<text class="g-sku-item__label">规格</text>
					<text class="g-sku-item__value">{{ info.unit }}</text>
				</view>
				<view class="g-sku-item mb-2">
					<text class="g-sku-item__label">库存</text>
					<text class="g-sku-item__value">{{ info.number }}</text>
				</view>
				<view class="g-sku-item">
					<text class="g-sku-item__label">销量</text>
					<text class="g-sku-item__value">{{ info.saleNumber }}</text>
				</view>
				<view class="g-sku-item">
					<text class="g-sku-item__label">运费</text>
					<text class="g-sku-item__value">{{ info.freightPrice }}</text>
				</view>
			</view>
		</view>

		<view class="g-section">
			<view class="pb-4 text-md text-bold">详细内容</view>
			<view>{{ info.detail }}</view>
		</view>
		<u-action-sheet
			:actions="list"
			:title="title"
			:show="show"
			closeOnClickOverlay
			@close="show = false"
			@select="selectClick"
		></u-action-sheet>
		<base-footer v-if="userInfo && userInfo.userLevel == 2">
			<view class="b-footer shadow-top">
				<view class="b-footer__left" @tap="handleRoute"><u-icon name="chat" color="#303133" size="22" /></view>
				<view class="b-footer__right" @click="toOrder"><text>我要下单</text></view>
			</view>
		</base-footer>
	</view>
</template>

<script>
import BaseFooter from './components/BaseFooter'
import { getCateApi, getInfoApi } from '@/api/goods'

const wayData = [
	// { id: '0', name: '线上交易' },
	{ id: '1', name: '线下交易' },
	{ id: '2', name: '老客户下单延期支付' }
]

export default {
	components: { BaseFooter },
	data() {
		return {
			userInfo: null,
			goodsId: null,
			current: 0,
			cateList: [],
			banner: [],
			info: {},
			title: '请选择',
			list: [{ id: '0', name: '线上交易' }, { id: '1', name: '线下交易' }, { id: '2', name: '老客户下单延期支付' }],
			show: false
		}
	},
	onLoad({ id }) {
		this.userInfo = uni.getStorageSync('userInfo')
		this.goodsId = id
		getCateApi({ page: 1, limit: 999 }).then(res => {
			this.cateList = res.data.list
		})
		this.getInfo(id)
	},
	methods: {
		getInfo(id) {
			getInfoApi({ id }).then(res => {
				const { gallery, ...rest } = res.data

				this.banner = gallery.split(',')
				this.info = rest
				console.log(this.info)
			})
		},
		getCateText(id) {
			return this.cateList.find(v => v.id === id)?.name
		},
		// getWayText(id) {
		//   return wayData.find(v => v.id === id)?.name
		// },
		toOrder() {
			this.show = true
		},
		selectClick(e) {
			if (e.id == '0') {
				uni.showModal({
					title: '提示',
					content: '暂未开通此功能',
					showCancel: false
				})
			} else {
				uni.$u.route('/pages_goods/order-submit', { id: this.goodsId, payType: e.id })
			}
		},
		handleRoute() {
			console.log(this.info.userId, this.userInfo.id)
			let id
			if (this.info.userId != this.userInfo.id) {
				id = this.info.userId
				const url = `/pages_chat/chat?conversationID=C2C${id}`
				uni.navigateTo({
					url
				})
			} else {
				id = this.cateList.maintenanceId
			}
		}
	}
}
</script>

<style>
page {
	background-color: #fff;
}
</style>

<style lang="scss" scoped>
.indicator-num {
	padding: 2px 0;
	background-color: rgba(0, 0, 0, 0.35);
	border-radius: 100px;
	width: 35px;
	@include flex;
	justify-content: center;

	&__text {
		color: #ffffff;
		font-size: 12px;
	}
}
.g-section {
	width: 750rpx;
	padding: 16px;
}
.g-sku {
	display: flex;
	flex-wrap: wrap;
	.g-sku-item {
		width: 50%;
		display: flex;
		&__label {
			flex-shrink: 0;
			margin-right: 20rpx;
			color: $u-tips-color;
		}
		&__value {
			flex: 1;
			color: $u-content-color;
			word-break: break-all;
		}
	}
}

.b-footer {
	flex: 1;
	display: flex;
	height: 100%;
	&__left {
		width: 96px;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $u-white;
	}
	&__right {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $u-primary;
		color: #ffffff;
	}
}
</style>
