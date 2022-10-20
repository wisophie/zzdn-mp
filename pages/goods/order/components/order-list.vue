<template>
	<view class="o-list">
		<view class="o-list__item" v-for="item in list" :key="item">
			<view class="o-list__item__header u-border-bottom">
				<view class="u-flex u-flex-fill">
					<u-icon name="order" color="#5d51ff" size="18" />
					<text class="ml-1">询价单号：x123123123123</text>
				</view>
				<u--text type="warning" text="已完成" />
			</view>
			<view class="o-list__item__content">
				<view class="o-list__item__content__img"><u--image :src="item" width="48" height="48" radius="4" /></view>
				<view class="o-list__item__content__detail">
					<view class="u-flex">
						<view class="u-flex-fill">商品名称：这个一个商品哈哈哈哈</view>
						<view>￥99.00</view>
					</view>
					<view class="u-flex mt-2">
						<view class="u-flex-fill">
							<text>规格：xxx</text>
							<text class="ml-2">型号：xxx</text>
						</view>
						<view>x2</view>
					</view>
				</view>
			</view>
			<view class="o-list__item__footer u-border-top">
				<view class="u-flex-fill mr-2">
					用户：
					<text>xxx</text>
				</view>
				<u--text type="primary" text="查看物流" @click="toWuliu" />
				<view class="ml-2">
					合计：
					<text>￥1212.00</text>
					<text>(含运费12.00)</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {}
	},
	methods:{
		toWuliu(){
			uni.$u.route('/pages/goods/wuliu')
		}
	}
}
</script>

<style lang="scss" scoped>
.o-list__item + .o-list__item {
	margin-top: 20rpx;
}
.o-list {
	padding: 20rpx 0;
	&__item {
		background-color: $u-white;
		&__header {
			padding: 20rpx 32rpx;
			display: flex;
			align-items: center;
			color: $u-content-color;
		}
		&__footer {
			padding: 20rpx 32rpx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: $u-content-color;
		}
		&__content {
			padding: 32rpx;
			display: flex;
			align-items: center;
			font-size: 13px;
			&__img{
				flex-shrink: 0;
				margin-right: 20rpx;
			}
			&__detail{
				flex: 1;
			}
		}
	}
}
</style>
