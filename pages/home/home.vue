<template>
  <view class="content full">
    <view class="text-sm u-primary">{{ title }}</view>
    <u-button class="mt-4" type="primary" @click="toPage('/pages/goods/order/order')">
      订单页面
    </u-button>
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
