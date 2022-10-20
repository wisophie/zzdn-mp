<template>
	<view class="content full">
		<view class="text-sm u-primary">{{ title }}</view>
		<view class="mt-4"><u-button type="primary" @click="toPage('/pages/goods/goods-detail')">商品详情</u-button></view>
		<view class="mt-4"><u-button type="primary" @click="toPage('/pages/goods/order-list')">订单列表</u-button></view>
		<view class="mt-4"><u-button type="primary" @click="test">测试接口</u-button></view>
	</view>
</template>

<script>
import { getDemo } from '@/api/common'
import user from '@/utils/user'
export default {
	data() {
		return {
			title: '点按钮试试'
		}
	},
	onLoad() {
		user
			.checkLogin()
			.then(res => {
				console.log(res, '--gg')
			})
			.catch(err => {
				console.log(err, '--gg2')
				uni.navigateTo({
					url: '/pages/login/login'
				})
			})
	},
	methods: {
		toPage(url) {
			uni.$u.route(url)
		},
		test() {
			getDemo().then(res => {
				this.title = res.content
			})
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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 32rpx;
}
</style>
