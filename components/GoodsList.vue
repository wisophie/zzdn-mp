<template>
  <view class="g-list">
    <view
      class="g-list__item"
      v-for="(item, i) in list"
      :key="item.id"
      :class="{ 'u-border-top': i !== 0 }"
      @click="toDetail(item.id)"
    >
      <view class="g-list__item__img">
        <image :src="item.img" />
      </view>
      <view class="g-list__item__content">
        <view class="u-line-2">{{ item.name }}</view>
        <view class="mt-4 text-bold u-warning">
          {{ getPrice(item.retailPrice) }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// userLevel: 账户身份 0 游客，1 供货商，2 采购商
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      userInfo: {
        userLevel: 0
      }
    }
  },
  mounted() {
    this.userInfo = uni.getStorageSync('userInfo')
  },
  methods: {
    getPrice(p) {
      if (this.userInfo.userLevel == 0) return '--'
      return `￥ ${p}`
    },
    toDetail(id) {
      uni.$u.route('/pages_goods/goods-detail', { id })
    }
  }
}
</script>

<style lang="scss" scoped>
.g-list {
  &__item {
    display: flex;
    align-items: center;
    padding: 16rpx 0;
    &__img {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      image {
        width: 80px;
        height: 80px;
        border-radius: 6px;
      }
    }
    &__content {
      flex: 1;
      margin-left: 20rpx;
    }
  }
}
</style>
