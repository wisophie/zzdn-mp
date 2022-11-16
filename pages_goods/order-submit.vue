<template>
  <view>
    <view class="os-addr">
      <view class="os-addr-box u-border" @click="showP = true">
        <view class="os-addr-box__icon">
          <image src="/static/img/icon-wuliu.png" />
        </view>
        <view class="os-addr-box__content" v-if="currentAd">
          <view>
            <text>{{ currentAd.name }}</text>
            <text class="ml-3">{{ currentAd.tel }}</text>
          </view>
          <view class="mt-1">
            <text>{{ currentAd.province }}</text>
            <text class="ml-2">{{ currentAd.city }}</text>
            <text class="ml-2">{{ currentAd.county }}</text>
            <text class="ml-2">{{ currentAd.addressDetail }}</text>
          </view>
        </view>
        <view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#fff" size="18" /></view>
      </view>
    </view>

    <view class="os-content">
      <view class="os-goods">
        <view class="os-goods__img">
          <u--image :src="goodsInfo.picUrl" width="81" height="81" radius="4" />
        </view>
        <view class="os-goods__content">
          <view class="os-goods__content__row">
            <text class="text-bold">{{ goodsInfo.name }}</text>
          </view>
          <!-- <view class="os-goods__content__row">
            <text class="label">规格：</text>
            <text>xxxx</text>
            <text class="label ml-3">型号：</text>
            <text>xxxx</text>
          </view> -->
          <view class="os-goods__content__row">
            <text class="label">单价：</text>
            <text>￥{{ goodsInfo.retailPrice }}</text>
          </view>
          <view class="os-goods__content__row num">
            <text class="label">数量：</text>
            <u-number-box v-model="num">
              <view slot="minus" class="minus">
                <u-icon name="minus" size="12"></u-icon>
              </view>
              <text slot="input" style="width: 50px; text-align: center" class="input">
                {{ num }}
              </text>
              <view slot="plus" class="plus">
                <u-icon name="plus" color="#FFFFFF" size="12"></u-icon>
              </view>
            </u-number-box>
          </view>
        </view>
      </view>
      <view class="os-price u-border-top u-border-bottom">
        <view class="os-price__row">
          <text class="os-price__row__label">商品总价</text>
          <text class="os-price__row__value">￥{{ totalPrice }}</text>
        </view>
        <view class="os-price__row">
          <text class="os-price__row__label">运费(快递)</text>
          <text class="os-price__row__value">￥{{ freightPrice }}</text>
        </view>
        <view class="os-price__row">
          <text class="os-price__row__label">应付款</text>
          <text class="os-price__row__value u-warning">￥{{ actualPrice }}</text>
        </view>
      </view>
      <view class="os-remark">
        <view class="os-remark__title">留言备注</view>
        <view class="os-remark__content">
          <u--textarea
            v-model="remark"
            placeholder="请输入留言信息"
            count
            maxlength="50"
          ></u--textarea>
        </view>
      </view>
<!--      <view class="os-pay">
        <view class="os-pay__title">支付方式</view>
        <view class="os-pay__content">
          <u-radio-group v-model="pay">
            <u-radio
              :customStyle="{ marginRight: '16px' }"
              v-for="item in payList"
              :key="item.value"
              :label="item.name"
              :name="item.value"
            ></u-radio>
          </u-radio-group>
        </view>
      </view> -->
    </view>
    <u-popup :show="showP" round @close="showP = false" closeOnClickOverlay>
      <scroll-view scroll-y="true" class="scroll-view">
        <view class="list">
          <view
            class="list-item u-border-bottom"
            v-for="(item, index) in adList"
            :key="index"
            @click="changeAd(item)"
          >
            <view class="item-name">{{ item.name }}</view>
            <view class="item-address">
              {{ `${item.province}${item.city}${item.county}${item.addressDetail}` }}
            </view>
          </view>
        </view>
      </scroll-view>
    </u-popup>
    <base-footer>
      <view class="b-footer">
        <view class="b-footer__left u-border">
          <text>实付￥{{ actualPrice }}</text>
        </view>
        <view class="b-footer__right">
          <u-button type="primary" text="立即下单" @click="toPay" />
        </view>
      </view>
    </base-footer>
  </view>
</template>

<script>
import BaseFooter from './components/BaseFooter'
import { createApi } from '@/api/order'
import { getInfoApi } from '@/api/goods'
import { addressList } from '@/api/address'
import Big from 'big.js'

export default {
  components: { BaseFooter },
  data() {
    return {
      goodsId: null,
      goodsInfo: {},
      num: 1,
      remark: '',
      pay: 'wxpay',
      payList: [{ name: '微信支付', value: 'wxpay' }],
      retailPrice: 0,
      freightPrice: 0,
      payType: null,
      exchange: null,
      showP: false,
      currentAd: null,
      adList: []
    }
  },
  onLoad({ id, payType }) {
    this.goodsId = id
    this.exchange = +payType
    addressList({ page: 1, limit: 999 }).then(res => {
      this.adList = res.data.list
      this.currentAd = this.adList[0]
    })
    getInfoApi({ id }).then(res => {
      this.retailPrice = res.data.retailPrice
      this.freightPrice = +res.data.freightPrice
      this.goodsInfo = res.data
    })
  },
  computed: {
    totalPrice() {
      const p = Big(this.retailPrice)
      const n = this.num
      return p.times(n)
    },
    actualPrice() {
      if (this.exchange == 0) {
        const p = Big(this.totalPrice)
        const f = this.freightPrice
        return p.plus(f)
      } else {
        return 0
      }
    }
  },
  methods: {
    changeAd(item) {
      if (item === this.currentAd) {
        this.showP = false
      } else {
        this.currentAd = item
        this.showP = false
      }
    },
    toPay() {
      let payType = null
      if (this.exchange === 0) {
        payType = 'WX_PAY'
      } else if (this.exchange === 1) {
        payType = 'XIANXIA_PAY'
      } else if (this.exchange === 2) {
        payType = 'DELAY_PAY'
      }
      const data = {
        addressId: this.currentAd.id,
        message: this.remark,
        number: this.num,
        goodsId: this.goodsId,
        exchange: this.exchange,
        payType: payType
      }
      createApi(data).then(res => {
        uni.$u.route('/pages_goods/order-detail', { id: res.data.orderId })
      })
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
.minus {
  width: 22px;
  height: 22px;
  border-width: 1px;
  border-color: #e6e6e6;
  border-style: solid;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
  @include flex;
  justify-content: center;
  align-items: center;
}

.input {
  padding: 0 10px;
}

.plus {
  width: 22px;
  height: 22px;
  background-color: $u-primary;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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
.os-remark {
  &__title {
    padding: 12px 0;
    font-weight: 600;
    color: $u-content-color;
  }
}
.os-pay {
  &__title {
    padding: 12px 0;
    font-weight: 600;
    color: $u-content-color;
  }
}
.b-footer {
  display: flex;
  justify-content: center;
  width: 100%;
  &__left {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 32rpx;
    padding: 0 48rpx;
    height: 40px;
    color: $u-warning;
    border-radius: 3px;
    font-weight: 600;
  }
  &__right {
    width: 50%;
  }
}
.scroll-view {
  height: 640rpx;
}
.list {
  padding-top: 16px;
  .list-item {
    background: #fff;
    padding: 20rpx 20rpx;
    .item-name {
      font-size: 36rpx;
      color: #333;
    }

    .item-address {
      font-size: 28rpx;
      color: #333;
    }

    .item-operation {
      margin-top: 30rpx;
      display: flex;
      align-items: center;

      .item-radio {
        transform: scale(0.7);
      }

      .item-text {
        flex: 1;
        color: #333;
        font-size: 28rpx;
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
