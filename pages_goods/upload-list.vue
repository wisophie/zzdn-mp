<template>
  <mescroll-body
    ref="mescrollRef"
    :up="upOption"
    :sticky="true"
    :down="downOption"
    @init="mescrollInit"
    @down="downCallback"
    @up="upCallback"
  >
    <view class="top-wrap">
      <u-input
        v-model="name"
        prefixIcon="search"
        shape="circle"
        placeholder="请输入关键词"
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
    <view class="up-list">
      <view class="up-item" v-for="item in goods" :key="item.id">
        <view class="up-item__avatar">
          <u-avatar :src="item.img" shape="square" size="64"></u-avatar>
        </view>
        <view class="up-item__content">
          <view class="text-bold u-line-1">{{ item.name }}</view>
          <view class="mt-1 u-content-color u-line-1 text-smm">
            {{ item.detail }}
          </view>
          <view class="mt-1 u-content-color text-smm">
            <text>价格：</text>
            <text class="u-warning text-bold">￥{{ item.retailPrice }}</text>
          </view>
          <view class="up-row mt-1">
            <view>
              <text>供货商：</text>
              <text>{{ item.username }}</text>
            </view>
            <view class="ml-1">
              <text>类别：</text>
              <text>{{ item.categoryName }}</text>
            </view>
          </view>
          <view class="up-row mt-1">
            <text>审核状态：</text>
            <text>{{ getStatus(item.status) }}</text>
          </view>
          <view class="up-row" v-if="item.rejectReason">
            <text>拒绝原因：</text>
            <text>{{ item.rejectReason }}</text>
          </view>
        </view>
        <view class="up-item__btn">
          <u-icon name="edit-pen-fill" size="18" color="#5d51ff" @click="toEdit(item)" />
          <u-icon name="trash-fill" size="18" color="#f56c6c" @click="remove(item)" />
        </view>
      </view>
    </view>
  </mescroll-body>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
import { getListApi1, removeById } from '@/api/goods'
const statusMap = {
  0: '已申请',
  1: '审核通过',
  2: '未审核通过'
}
export default {
  mixins: [MescrollMixin],
  data() {
    return {
      downOption: {
        native: true
      },
      upOption: {
        noMoreSize: 0
      },
      show: false,
      goods: [], // 数据列表
      name: null //当前搜索关键词
    }
  },
  computed: {
    date() {
      return [this.startDate, this.endDate]
    }
  },
  watch: {
    date: {
      handler(value) {
        if (value[0] && value[1]) {
          const start = new Date(value[0]).getTime()
          const end = new Date(value[1]).getTime()
          if (start > end) {
            uni.$u.toast('开始时间不得大于结束时间')
          } else {
            this.mescroll.resetUpScroll()
          }
        }
      },
      deep: true
    }
  },
  onShow() {
    if (this.show) {
      this.mescroll.resetUpScroll()
    }
    this.show = true
  },
  methods: {
    // 输入监听
    // inputWord(e) {
    //   // this.curWord = e.detail.value // 已使用v-model,无需再次赋值
    //   // 节流,避免输入过快多次请求
    //   this.searchTimer && clearTimeout(this.searchTimer)
    //   this.searchTimer = setTimeout(() => {
    //     this.doSearch(this.curWord)
    //   }, 300)
    // },
    // 搜索
    doSearch() {
      this.goods = []
      this.mescroll.resetUpScroll()
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      const params = {
        name: this.name,
        page: page.num,
        limit: page.size
      }
      getListApi1(params)
        .then(res => {
          const { list: listData, total } = res.data
          const list = listData.map(v => ({ ...v, img: v.gallery ? v.gallery.split(',')[0] : '' }))
          this.mescroll.endBySize(list.length, total)
          if (page.num == 1) this.goods = []
          this.goods = this.goods.concat(list)
        })
        .catch(() => {
          this.mescroll.endErr()
        })
    },
    toEdit(item) {
      uni.$u.route('/pages_goods/upload', { id: item.id })
    },
    remove(item) {
      uni.showModal({
        title: '提示',
        content: '是否确认删除该产品？',
        success: res => {
          if (res.confirm) {
            removeById({ id: item.id }).then(() => {
              this.mescroll.resetUpScroll()
              uni.$u.toast('删除成功')
            })
          }
        }
      })
    },
    getStatus(s) {
      return statusMap[s] || ' '
    }
  }
}
</script>

<style lang="scss" scoped>
.top-wrap {
  z-index: 99;
  position: sticky;
  top: var(--window-top); /* css变量 */
  left: 0;
  width: 100%;
  padding: 10px 16px;
  background-color: $u-white;
}

.up-item + .up-item {
  margin-top: 20rpx;
}
.up-list {
  .up-item {
    position: relative;
    display: flex;
    // align-items: flex;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    padding-right: 160rpx;
    background-color: $u-white;
    &__avatar {
      flex-shrink: 0;
      padding: 0 24rpx;
    }
    &__content {
      flex: 1;
    }
    &__btn {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 160rpx;
      padding-right: 20rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
.up-row {
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
  font-size: 13px;
  color: $u-content-color;
}
</style>
