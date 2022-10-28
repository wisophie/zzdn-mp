<template>
  <view class="o-list">
    <view class="o-list__item" v-for="item in list" :key="item">
      <view class="o-list__item__header u-border-bottom">
        <view class="u-flex u-flex-fill">
          <u-icon name="order" color="#5d51ff" size="18" />
          <text class="ml-1">发布者：xxxxx</text>
        </view>
        <u--text type="warning" text="滞销货物" />
      </view>
      <view class="o-list__item__content" @click="toDetail">
        <view class="o-list__item__content__img">
          <u--image :src="item" width="48" height="48" radius="4" />
        </view>
        <view class="o-list__item__content__detail">
          <view class="u-flex">
            <view class="u-flex-fill">标题：这里写标题内容</view>
          
          </view>
          <view class="u-flex mt-2">
            <view class="u-flex-fill miaoshu">
              <text>明细：这里写详细描述，这里写详细描述，这里写详细描述</text>
            </view>
          </view>
        </view>
      </view>
      <view class="o-list__item__footer u-border-top">
        <view class="u-flex u-flex-between">
			<view>
				地址：xxxx
			</view>
			
          <view>
            价格：
            <text>￥100.00</text>
            
          </view>
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
  methods: {
    toDetail() {
      uni.$u.route('/pages/share/share-detail')
    },
  }
}
</script>

<style lang="scss" scoped>
.o-list__item + .o-list__item {
  margin-top: 20rpx;
}
.o-list {
  padding: 20rpx;
  &__item {
    background-color: $u-white;
    border-radius: 6px;
    &__header {
      padding: 20rpx 32rpx;
      display: flex;
      align-items: center;
      color: $u-content-color;
    }
    &__footer {
      padding: 20rpx 32rpx;
      color: $u-content-color;
	  text-align: right;
    }
    &__content {
      padding: 32rpx;
      display: flex;
      align-items: center;
      font-size: 13px;
      &__img {
        flex-shrink: 0;
        margin-right: 20rpx;
      }
      &__detail {
        flex: 1;
		.miaoshu{
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			/*显示的行数*/
			overflow: hidden;
		}	
      }
    }
  }
}
</style>
