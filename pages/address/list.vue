<template>
  <view class="container">
    <view v-if="list.length" class="list">
      <view class="list-item" v-for="(item, index) in list" :key="index">
        <view class="item-name">{{ item.name }}</view>
        <view class="item-address">{{ `${item.province}${item.city}${item.county}${item.addressDetail}` }}</view>
        <view class="item-operation">
          <radio class="item-radio" :checked="item.isDefault" color="#5c4ffe" @click="handleUpdate(item)"></radio>
          <view class="item-text">设为默认</view>
          <view class="item-handle">
            <view class="item-handle-item" @click="clickDel(item)">
              <u-icon name="trash" color="#fa3534"></u-icon>
            </view>
            <view class="item-handle-item"  @click="handleEdit(item.id)">
              <u-icon name="edit-pen" color="#5c4ffe"></u-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
    <u-empty v-else mode="list" marginTop="300rpx"></u-empty>
    <view class="bottom">
      <u-button type="primary" @click="handleAdd">添加地址</u-button>
    </view>
  </view>
</template>

<script>
import { addressList, addressDelete, addressSave } from '@/api/address'

export default {
  data() {
    return {
      loading: false,
      list: [],
      queryParams: {
        page: 1,
        limit: 20,
        sort: '',
        order: ''
      },
    }
  },

  // created() {
  //   this.fetchAddressList()
  // },

  onShow() {
    this.list = []
    this.queryParams.page = 1
    this.fetchAddressList()
  },

  onReachBottom() {
    if (this.total > this.list.length && !this.loading) {
      this.loading = true
      this.queryParams.page ++
      this.fetchAddressList()
    }
  },

  methods: {
    fetchAddressList() {
      addressList(this.queryParams).then(res => {
        this.total = res.data.total
        this.list = [...this.list, ...res.data.list]
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    handleAdd() {
      uni.navigateTo({
         url: '/pages/address/add'
      });
    },

    clickDel(item) {
      uni.showModal({
        title: '提示',
        content: '确认删除',
        success: (res) => {
          if (res.confirm) {
            this.handleDelete(item)
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },

    handleDelete(item) {
      addressDelete({
        id: item.id
      }).then(() => {
        this.list = this.list.filter(it => it.id !== item.id)
        this.total -= 1
      })
    },

    handleEdit(id) {
      uni.navigateTo({
         url: `/pages/address/add?id=${id}`
      });
    },

    handleUpdate(item) {
      if (!item.isDefault) {
        this.list.forEach(it => {
          it.isDefault = false
        })
        item.isDefault = true

        const {
          id,
          name,
          tel,
          province,
          city,
          county,
          areaCode,
          addressDetail
        } = item

        addressSave({
          id,
          name,
          tel,
          province,
          city,
          county,
          areaCode,
          addressDetail,
          isDefault: true
        }).then(() => {
          console.log('sucess')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 120rpx;

  .list {

    .list-item {
      background: #fff;
      padding: 20rpx 20rpx;
      margin-bottom: 20rpx;

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

  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 40rpx;
    background: #fff;
  }
}
</style>