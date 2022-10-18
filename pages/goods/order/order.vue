<template>
  <view>
    <view class="top-wrap">
      <u--input prefixIcon="search" shape="circle" placeholder="请输入订单号/货品编码/用户名">
        <template slot="suffix">
          <u-button
            size="mini"
            text="搜索"
            shape="circle"
            color="linear-gradient(to right, #C5C1FF, #473AFF)"
          ></u-button>
        </template>
      </u--input>
      <view class="o-tabs bg-white">
        <view
          class="o-tabs__item"
          :class="{ active: item.id === tabId }"
          v-for="item in tabs"
          :key="item.id"
          @click="changeTab(item.id)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <mescroll-body
      ref="mescrollRef"
      :up="upOption"
      top="90px"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
    >
      <u-cell v-for="(item, index) in goods" :key="index" :title="`列表长度-${index + 1}`">
        <u-avatar
          slot="icon"
          shape="square"
          size="35"
          :src="item"
          customStyle="margin: -3px 5px -3px 0"
        ></u-avatar>
      </u-cell>
    </mescroll-body>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'

export default {
  mixins: [MescrollMixin], // 使用mixin
  data() {
    return {
      tabId: 1,
      tabs: [
        {
          id: 1,
          name: '全部'
        },
        {
          id: 2,
          name: '待支付'
        },
        {
          id: 3,
          name: '进行中'
        },
        {
          id: 4,
          name: '已完成'
        },
        {
          id: 5,
          name: '已关闭'
        }
      ],
      upOption: {
        noMoreSize: 0
      },
      goods: [], // 数据列表
      curWord: '' //当前搜索关键词
    }
  },
  methods: {
    // 输入监听
    inputWord(e) {
      // this.curWord = e.detail.value // 已使用v-model,无需再次赋值
      // 节流,避免输入过快多次请求
      this.searchTimer && clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.doSearch(this.curWord)
      }, 300)
    },
    // 搜索
    doSearch(word) {
      this.curWord = word
      this.goods = [] // 先清空列表,显示加载进度
      this.mescroll.resetUpScroll()
    },
    changeTab(id) {
      if (this.tabId === id) return
      this.tabId = id
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
      this.mescroll.endSuccess(list.length)
      if (page.num == 1) this.goods = []
      this.goods = this.goods.concat(list)
      // this.mescroll.endErr()
    }
  }
}
</script>

<style lang="scss" scoped>
.top-wrap {
  z-index: 9990;
  position: fixed;
  top: var(--window-top); /* css变量 */
  left: 0;
  width: 100%;
  height: 90px;
  padding: 5px 16px 0;
  background-color: $u-white;
}
.o-tabs {
  padding: 20rpx 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  &__item {
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    color: $u-tips-color;
    background: $u-bg-color;
    border-radius: 6px;
    &.active {
      color: $u-white;
      background: $u-primary;
    }
  }
}
.o-tabs__item + .o-tabs__item {
  margin-left: 10px;
}
</style>
