<template>
  <view class="o-list">
    <view class="o-list__item" v-for="item in list" :key="item.id">
      <view class="o-list__item__header u-border-bottom">
        <view class="u-flex u-flex-fill">
          <u-icon name="order" color="#5d51ff" size="18" />
          <text class="ml-1">询价单号：{{ item.orderSn }}</text>
        </view>
        <u--text type="warning" :text="getStatus(item.orderStatusText)" />
      </view>
      <view
        class="o-list__item__content"
        v-for="item1 in item.goodsList"
        :key="item1.id"
        @click="toDetail"
      >
        <view class="o-list__item__content__img">
          <u--image :src="item1.picUrl" width="48" height="48" radius="4" />
        </view>
        <view class="o-list__item__content__detail">
          <view class="u-flex">
            <view class="u-flex-fill">商品名称：{{ item1.goodsName }}</view>
            <view>￥{{ item1.price }}</view>
          </view>
          <view class="u-flex mt-2">
            <!-- <view class="u-flex-fill">
              <text>规格：xxx</text>
              <text class="ml-2">型号：xxx</text>
            </view> -->
            <view>x{{ item1.number }}</view>
          </view>
        </view>
      </view>
      <view class="o-list__item__footer u-border-top">
        <view class="u-flex u-flex-between">
          <view>
            用户：
            <text>{{ item.nickname }}</text>
          </view>
          <u--text type="primary" text="查看物流" @click="toWuliu" />
        </view>
        <view class="mt-2">
          合计：
          <text>￥{{ item.actualPrice }}</text>
          <text>(含运费{{ item.freightPrice }})</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 101 订单生成，未支付；102，下单未支付用户取消；103，下单未支付超期系统自动取消
// 201 支付完成，商家未发货；202，订单生产，已付款未发货，用户申请退款；203，管理员执行退款操作，确认退款成功；
// 301 商家发货，用户未确认；
// 401 用户确认收货，订单结束； 402 用户没有确认收货，但是快递反馈已收货后，超过一定时间，系统自动确认收货，订单结束。
// 当101用户未付款时，此时用户可以进行的操作是取消或者付款
// 当201支付完成而商家未发货时，此时用户可以退款
// 当301商家已发货时，此时用户可以有确认收货
// 当401用户确认收货以后，此时用户可以进行的操作是退货、删除、去评价或者再次购买
// 当402系统自动确认收货以后，此时用户可以删除、去评价、或者再次购买
const statusMap = {
  101: '待支付',
  102: '未支付已取消',
  103: '超时已取消',
  201: '待发货',
  202: '申请退款',
  203: '已退款',
  301: '待收货',
  401: '确认收货',
  402: '确认收货(系统)'
}
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
    getStatus(s) {
      return statusMap[s] || ''
    },
    toDetail() {
      uni.$u.route('/pages/goods/order-detail')
    },
    toWuliu() {
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
      }
    }
  }
}
</style>
