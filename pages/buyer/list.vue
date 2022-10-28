<template>
  <view class="contain">
    <u-list>
      <u-list-item v-for="(item, index) in list" :key="index">
        <view class="list-item">
          <view class="item-title">
            <view class="title">商品名称</view>
            <view class="item-handle">
              <view class="item-handle-item" @click="handleDelete(item)">
                <u-icon name="trash" color="#fa3534"></u-icon>
              </view>
              <view class="item-handle-item">
                <u-icon name="edit-pen" color="#5c4ffe" @click="handleEdit(item.id)"></u-icon>
              </view>
            </view>
          </view>
          <view>材质：材质材质</view>
          <view>规格：规格规格规格</view>
          <view>工期：工期工期工期工期</view>
        </view>
      </u-list-item>
    </u-list>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [{}, {}, {}]
    }
  },

  methods: {
    handleDelete(item) {},

    handleEdit(id) {}
  }
}
</script>

<style lang="scss" scoped>
.contain {

  .list-item {
    padding: 20rpx;
    background: #fff;
    border-bottom: 1rpx solid #ccc;

    .item-title {
      position: relative;
      font-size: 36rpx;
      color: #333;
      font-weight: bold;
      margin-bottom: 10rpx;
      display: flex;
      align-items: center;

      .title {
        flex: 1;
      }

      .item-handle {
        display: flex;

        .item-handle-item {
          padding: 10rpx;
          margin-left: 20rpx;
        }
      }
    }
  }
}
</style>