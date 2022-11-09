<template>
	<view class="page-wrap">
		<view class="wl-menu">
			<view class="wl-menu__img">
				<u--image src="https://cdn.uviewui.com/uview/album/1.jpg" width="48" height="48" radius="4" />
			</view>
			<view class="wl-menu__detail">
				<view class="u-flex">
					<text class="u-content-color">询价单号：</text>
					<text>x1231312321313123</text>
				</view>
				<view class="u-flex mt-2">
					<text class="u-content-color">快递单号：</text>
					<text class="mr-2">x1231312321313123</text>
					<u--text type="warning" text="复制" @click="onCopy('x1231312321313123')" />
				</view>
			</view>
		</view>
		<view class="wl-arrive u-border-bottom">
			<u-icon name="order" size="20" color="#5d51ff" />
			<text class="u-content-color ml-1">预计到达时间：</text>
			<text>2022-06-01</text>
		</view>
		<view class="wl-timeline">
			<u-steps :current="3" direction="column">
				<u-steps-item title="2022-02-31 10:30" desc="快件已到达徐州分拣中心,下一站:xxx分拣中心"></u-steps-item>
				<u-steps-item title="2022-02-31 10:30" desc="快件已到达徐州分拣中心,下一站:xxx分拣中心"></u-steps-item>
				<u-steps-item title="2022-02-31 10:30" desc="快件已到达徐州分拣中心,下一站:xxx分拣中心"></u-steps-item>
				<u-steps-item title="2022-02-31 10:30" desc="快件已到达徐州分拣中心,下一站:xxx分拣中心"></u-steps-item>
				<u-steps-item title="2022-02-31 10:30" desc="快件已到达徐州分拣中心,下一站:xxx分拣中心"></u-steps-item>
			</u-steps>
			<view class="u-flex u-flex-y-center mt-4 pl-4">
				<u-icon name="question-circle-fill" color="#fc852b" size="18" />
				<text class="ml-2 text-smm u-tips-color">有疑问请</text>
				<u--text type="warning" text="联系客服" size="13" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		onCopy(data) {
			uni.setClipboardData({
				data: data,
				success: function() {
					uni.$u.toast('复制成功')
				}
			})
		}
	}
}
</script>

<style>
page {
	height: 100%;
}
</style>

<style lang="scss" scoped>
.page-wrap {
	width: 750rpx;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.wl-menu {
	width: 100%;
	padding: 32rpx;
	display: flex;
	align-items: center;
	background-color: $u-white;
	&__img {
		flex-shrink: 0;
		margin-right: 20rpx;
	}
	&__detail {
		flex: 1;
	}
}
.wl-arrive {
	width: 100%;
	margin-top: 10px;
	display: flex;
	align-items: center;
	padding: 20rpx 32rpx;
	background-color: $u-white;
}
.wl-timeline {
	flex: 1;
	padding: 32rpx;
	background-color: $u-white;
}
</style>
