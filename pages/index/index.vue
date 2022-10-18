<template>
	<view class="content full">
		<view class="text-sm u-primary">{{ title }}</view>
		<u-button class="mt-4" type="primary" @click="test">测试接口</u-button>
	</view>
</template>

<script>
import { getDemo } from '@/api/common'
export default {
	data() {
		return {
			title: '点按钮试试'
		}
	},
	onLoad() {},
	methods: {
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
.mt-4 {
	margin-top: 16px;
}
</style>
