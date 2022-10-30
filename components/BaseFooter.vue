<template>
  <view class="u-tabbar">
    <view class="u-tabbar__content u-tabbar--fixed" ref="u-tabbar__content">
      <view class="u-tabbar__content__item-wrapper">
        <slot />
      </view>
      <u-safe-bottom></u-safe-bottom>
    </view>
    <view class="u-tabbar__placeholder" :style="{ height: placeholderHeight + 'px' }"></view>
  </view>
</template>

<script>
export default {
  name: 'BaseFooter',
  data() {
    return {
      placeholderHeight: 0
    }
  },
  mounted() {
    this.setPlaceholderHeight()
  },
  methods: {
    // 设置用于防止塌陷元素的高度
    async setPlaceholderHeight() {
      await uni.$u.sleep(20)
      this.$uGetRect('.u-tabbar__content').then(({ height = 50 }) => {
        this.placeholderHeight = height
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.u-tabbar {
  &__content {
    @include flex(column);
    background-color: #fff;

    &__item-wrapper {
      height: 50px;
      @include flex(row);
    }
  }

  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
		z-index: 996;
  }
}
</style>
