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
      >
        <template slot="suffix">
          <u-button
            size="mini"
            text="搜索"
            shape="circle"
            color="linear-gradient(to right, #C5C1FF, #473AFF)"
          ></u-button>
        </template>
      </u-input>
    </view>
    <view class="up-list">
      <view class="up-item" v-for="item in goods" :key="item">
        <view class="up-item__avatar">
          <u-avatar :src="item" shape="square" size="64"></u-avatar>
        </view>
        <view class="up-item__content">
          <view class="text-bold u-line-1">标题标题</view>
          <view class="mt-1 u-content-color u-line-1 text-smm">
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容
          </view>
          <view class="mt-1 u-content-color text-smm">
            <text>价格：</text>
            <text class="u-warning text-bold">￥20.00</text>
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
      goods: [], // 数据列表
      name: '' //当前搜索关键词
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
    doSearch(word) {
      this.name = word
      this.goods = [] // 先清空列表,显示加载进度
      this.mescroll.resetUpScroll()
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      const list = [
        'https://cdn.uviewui.com/uview/album/1.jpg',
        'https://cdn.uviewui.com/uview/album/2.jpg',
        'https://cdn.uviewui.com/uview/album/3.jpg',
        'https://cdn.uviewui.com/uview/album/4.jpg',
        'https://cdn.uviewui.com/uview/album/5.jpg',
        'https://cdn.uviewui.com/uview/album/6.jpg',
        'https://cdn.uviewui.com/uview/album/7.jpg',
        'https://cdn.uviewui.com/uview/album/8.jpg',
        'https://cdn.uviewui.com/uview/album/9.jpg',
        'https://cdn.uviewui.com/uview/album/10.jpg'
      ]
      this.mescroll.endBySize(list.length, 10)
      if (page.num == 1) this.goods = []
      this.goods = this.goods.concat(list)
      // this.mescroll.endErr()
    },
    toEdit(item) {},
    remove(item) {
      uni.showModal({
        title: '提示',
        content: '是否确认删除该产品？',
        success: res => {
          if (res.confirm) {
          }
        }
      })
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
    align-items: center;
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
</style>
