<template>
  <view class="contain">
    <view class="top-wrap">
      <u-input
        v-model="query.goodsName"
        prefixIcon="search"
        shape="circle"
        placeholder="请输入商品名称"
        confirmType="search"
        @confirm="doSearch"
      >
        <template slot="suffix">
          <u-button
            size="mini"
            text="搜索"
            shape="circle"
            color="linear-gradient(to right, #C5C1FF, #473AFF)"
            @click="doSearch"
          ></u-button>
        </template>
      </u-input>
    </view>
    <u-list v-if="list.length">
      <u-list-item v-for="(item, index) in list" :key="index">
        <view class="list-item" @click="handleDetail(item.id)">
          <view class="item-title">
            <view class="title">{{ item.goodsName }}</view>
            <view v-if="isBuyer" class="item-handle">
              <view class="item-handle-item" @click.stop="handleDelete(item)">
                <u-icon name="trash" color="#fa3534"></u-icon>
              </view>
              <view class="item-handle-item" @click.stop="handleEdit(item.id)">
                <u-icon name="edit-pen" color="#5c4ffe"></u-icon>
              </view>
            </view>
          </view>
          <view>发布人：{{ item.username || '-' }}</view>
          <view>材质：{{ item.texture }}</view>
          <view>规格：{{ item.specification }}</view>
          <view>工期：{{ item.duration }}</view>
          <view>
            <text class="status" :class="{'is-fail': item.status === 2}">{{ item.status === 0 ? '已申请' : item.status === 1 ? '审核通过' : '审核不通过' }}</text>
            <text v-if="item.status === 2" class="is-fail">（{{ 'item.rejectReason' }}）</text>
          </view>
        </view>
      </u-list-item>
    </u-list>
    <u-empty v-else mode="list" marginTop="300rpx"></u-empty>
  </view>
</template>

<script>
import { buyNeedList, buyNeedDelete } from '@/api/goods'
import user from '@/utils/user'
export default {
  data() {
    return {
      list: [],
      query: {
        goodsName: '',
        page: 1,
        limit: 20,
        sort: '', // 排序规则，默认传add_time, 价格：real_price 商品销售数量sale_num
        order: ''
      },
      isLogin: false
    }
  },

  computed: {
    isBuyer() {
      const userInfo = uni.getStorageSync('userInfo')
      return userInfo.userLevel === 2
    },
  },

  onShow() {
    user
			.checkLogin()
			.then(() => {
				this.isLogin = true
			})
			.catch(err => {
				this.isLogin = false
      })
      
    this.query.page = 1
    this.getList()
  },

  onReachBottom() {
    if (this.total > this.list.length && !this.loading) {
      this.query.page ++
      this.getList()
    }
  },

  methods: {
    getList() {
      this.loading = true
      console.log(this.isBuyer)
      buyNeedList(this.query, this.isBuyer).then(res => {
        const data = res.data
        this.total = data.total
        this.list = this.query.page === 1 ? data.list : [...this.list, ...data.list]
        this.loading = false
      })
    },

    doSearch() {
      this.query.page = 1
      this.getList()
    },
    
    handleDelete(item) {
      uni.showModal({
        title: '提示',
        content: '确认删除',
        success: (res) => {
          if (res.confirm) {
            buyNeedDelete({
              id: item.id
            }).then(() => {
              this.list = this.list.filter(it => it.id !== item.id)
              this.total -= 1
            })
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },

    handleEdit(id) {
      uni.navigateTo({
         url: `/pages/buyer/demand?id=${id}`
      });
    },

    handleDetail(id) {
      if (!this.isLogin) {
				uni.navigateTo({
					 url: '/pages/login/login'
				})
				return
			}
      uni.navigateTo({
         url: `/pages/buyer/demand?id=${id}&detail=1`
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.contain {
  height: 100%;

  .top-wrap {
    z-index: 99;
    position: sticky;
    top: var(--window-top); /* css变量 */
    left: 0;
    width: 100%;
    padding: 10px 16px;
    background-color: $u-white;
  }

  .list-item {
    padding: 20rpx;
    margin-top: 20rpx;
    background: #fff;

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

    .status {
      margin-top: 20rpx;
      color: #3c9cff;
    }
    .is-fail {
      color: #f56c6c;
    }
  }

  .empty {
    width: 100%;
    height: 500rpx;
  }
}
</style>