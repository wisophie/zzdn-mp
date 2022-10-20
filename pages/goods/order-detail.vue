<template>
	<view>
		<view class="os-addr">
			<view class="os-addr-box u-border">
				<view class="os-addr-box__icon"><image src="/static/img/icon-wuliu.png" /></view>
				<view class="os-addr-box__content">
					<view>
						<text>张小三</text>
						<text class="ml-3">13348840101</text>
					</view>
					<view class="mt-1">
						<text>四川省</text>
						<text class="ml-2">成都市</text>
						<text class="ml-2">金牛区</text>
						<text class="ml-2">营通街66号10栋1单元4楼</text>
					</view>
				</view>
				<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#fff" size="18" /></view>
			</view>
		</view>

		<view class="os-content">
			<view class="os-goods">
				<view class="os-goods__img">
					<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" width="81" height="81" radius="4" />
				</view>
				<view class="os-goods__content">
					<view class="os-goods__content__row"><text class="text-bold">这是一个商品名称</text></view>
					<view class="os-goods__content__row">
						<text class="label">规格：</text>
						<text>xxxx</text>
						<text class="label ml-3">型号：</text>
						<text>xxxx</text>
					</view>
					<view class="os-goods__content__row">
						<text class="label">单价：</text>
						<text>￥99.00</text>
					</view>
					<view class="os-goods__content__row">
						<text class="label">数量：</text>
						<text>x2</text>
					</view>
				</view>
			</view>
			<view class="os-price u-border-top u-border-bottom">
				<view class="os-price__row">
					<text class="os-price__row__label">商品总价</text>
					<text class="os-price__row__value">￥99.00</text>
				</view>
				<view class="os-price__row">
					<text class="os-price__row__label">运费(快递)</text>
					<text class="os-price__row__value">￥12.00</text>
				</view>
				<view class="os-price__row">
					<text class="os-price__row__label">实付款</text>
					<text class="os-price__row__value u-warning">￥200.00</text>
				</view>
			</view>
			<view class="os-order">
				<view class="os-order__row">
					<text class="os-order__row__label">订单编号</text>
					<text class="os-order__row__value">x1231312321313123</text>
				</view>
				<view class="os-order__row">
					<text class="os-order__row__label">创建时间</text>
					<text class="os-order__row__value">2022-02-02 16:30</text>
				</view>
				<view class="os-order__row">
					<text class="os-order__row__label">付款时间</text>
					<text class="os-order__row__value">2022-02-02 16:30</text>
				</view>
				<view class="os-order__row">
					<text class="os-order__row__label">成交时间</text>
					<text class="os-order__row__value">2022-02-02 16:30</text>
				</view>
			</view>
		</view>
		<base-footer>
			<view class="b-footer">
				<view class="b-footer__item"><u-button size="mini" text="删除订单" @click="onRemove" /></view>
				<view class="b-footer__item"><u-button size="mini" text="物流详情" @click="toWuliu" /></view>
				<view class="b-footer__item"><u-button size="mini" text="联系客服" /></view>
			</view>
		</base-footer>
	</view>
</template>

<script>
import BaseFooter from '@/components/BaseFooter'
export default {
	components: { BaseFooter },
	data() {
		return {}
	},
	methods: {
		onRemove() {
			uni.showModal({
				title: '提示',
				content: '是否确认删除该订单？',
				success: res => {
					if (res.confirm) {
						uni.navigateBack()
					}
				}
			})
		},
		toWuliu() {
			uni.$u.route('/pages/goods/wuliu')
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
.os-addr {
	padding: 20px 16px;
	background-color: $u-primary;
	color: $u-white;
	&-box {
		padding: 20rpx 60rpx 20rpx 20rpx;
		position: relative;
		display: flex;
		align-items: center;
		border-radius: 6px;
		&__icon {
			flex-shrink: 0;
			margin-right: 20rpx;
			image {
				width: 72rpx;
				height: 72rpx;
			}
		}
		&__arrow {
			position: absolute;
			right: 0;
			top: 0;
			width: 60rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
.os-content {
	padding: 16px;
}
.os-goods {
	display: flex;
	padding-bottom: 10px;
	&__img {
		flex-shrink: 0;
	}
	&__content {
		flex: 1;
		margin-left: 10px;
		font-size: 13px;
		line-height: 1.6;
		&__row {
			display: flex;
			flex-wrap: wrap;
			color: $u-content-color;
			&.num {
				flex-wrap: nowrap;
				justify-content: space-between;
				align-items: center;
			}
			.label {
				color: $u-tips-color;
			}
		}
	}
}
.os-price__row + .os-price__row {
	margin-top: 10px;
}
.os-price {
	padding: 10px 0;
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
.os-order__row + .os-order__row {
	margin-top: 10px;
}
.os-order {
	padding: 10px 0;
	font-size: 13px;
	&__row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: $u-main-color;
		&__label {
			color: $u-content-color;
		}
	}
}

.b-footer__item + .b-footer__item {
	margin-left: 32rpx;
}
.b-footer {
	display: flex;
	justify-content: flex-end;
	width: 100%;
	padding: 0 32rpx;
}
</style>
