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
      <view class="text-md text-bold">标题标题标题标题标题标题标题标题</view>
      <view class="mt-1 u-tips-color text-sm">副标题副标题副标题副标题副标题</view>
      <view class="mt-1 u-tips-color text-xs">
        <text>现价</text>
        <text class="u-warning">￥</text>
        <text class="u-warning text-bold text-md">20</text>
      </view>
    </view>

    <view class="g-section bg-gray">
      <view class="g-sku">
        <view class="g-sku-item">
          <text class="g-sku-item__label">品牌</text>
          <text class="g-sku-item__value">DIOR</text>
        </view>
        <view class="g-sku-item">
          <text class="g-sku-item__label">型号</text>
          <text class="g-sku-item__value">xxxxxx</text>
        </view>
        <view class="g-sku-item mt-2">
          <text class="g-sku-item__label">规格</text>
          <text class="g-sku-item__value">30x20x40</text>
        </view>
        <view class="g-sku-item mt-2">
          <text class="g-sku-item__label">成色</text>
          <text class="g-sku-item__value">全新</text>
        </view>
      </view>
    </view>

    <view class="g-section">
      <view class="pb-4 text-md text-bold">详细内容</view>
      <view>
        这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容
      </view>
    </view>

    <base-footer>
      <view class="b-footer shadow-top">
        <view class="b-footer__left">
          <u-icon name="chat" color="#303133" size="22" />
        </view>
        <view class="b-footer__right" @click="toOrder">
          <text>我要下单</text>
        </view>
      </view>
    </base-footer>
  </view>
</template>

<script>
import BaseFooter from '@/components/BaseFooter'
export default {
  components: { BaseFooter },
  data() {
    return {
      current: 0,
      banner: [
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        'https://cdn.uviewui.com/uview/swiper/swiper1.png'
      ]
    }
  },
  methods: {
    toOrder() {
      uni.$u.route('/pages/goods/order-submit')
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
