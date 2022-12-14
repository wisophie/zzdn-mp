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
      <order-search
        :selectList="selectList"
        v-model="name"
        @search="doSearch"
        @confirm="doSearch"
        @change="changeSelect"
      />
      <view class="o-tabs">
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
      <view class="o-dates">
        <view class="date-item">
          <view @click="showPicker('start')">
            <u-input
              v-model="startDateText"
              disabled
              disabledColor="#ffffff"
              placeholder="开始时间"
              prefixIcon="calendar"
              prefixIconStyle="font-size: 20px;color: #909399"
            />
          </view>
          <view class="date-clear">
            <u-icon
              v-show="!!startDate"
              style="z-index: 99"
              name="close-circle-fill"
              color="#909399"
              @click="startDate = null"
            />
          </view>
        </view>
        <text class="mx-2 u-tips-color">至</text>
        <view class="date-item">
          <view @click="showPicker('end')">
            <u-input
              v-model="endDateText"
              disabled
              disabledColor="#ffffff"
              placeholder="结束时间"
              prefixIcon="calendar"
              prefixIconStyle="font-size: 20px;color: #909399"
            />
          </view>
          <view class="date-clear">
            <u-icon
              v-show="!!endDate"
              style="z-index: 99"
              name="close-circle-fill"
              color="#909399"
              @click="endDate = null"
            />
          </view>
        </view>
      </view>
    </view>
    <order-list :list="goods" @refresh="refresh" />
    <u-datetime-picker
      v-model="initDate"
      :show="showDate"
      mode="date"
      closeOnClickOverlay
      @confirm="confirmDate"
      @cancel="showDate = false"
      @close="showDate = false"
    />
  </mescroll-body>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
import OrderSearch from './components/OrderSearch'
import OrderList from './components/OrderList'
import { getOrderApi } from '@/api/order'

const statusList = [
  {
    id: 0,
    name: '全部'
  },
  {
    id: 1,
    name: '待支付'
  },
  {
    id: 2,
    name: '待发货'
  },
  {
    id: 3,
    name: '待收货'
  },
  {
    id: 4,
    name: '待评价'
  }
]

export default {
  mixins: [MescrollMixin], // 使用mixin
  components: { OrderSearch, OrderList },
  data() {
    return {
      selectIndex: 0,
      selectList: [
        {
          id: 'goodsName',
          name: '商品名'
        },
        {
          id: 'username',
          name: '用户名'
        },
        {
          id: 'orderSn',
          name: '订单号'
        }
      ],
      tabId: 0,
      tabs: statusList,
      showDate: false,
      initDate: Number(new Date()),
      dateType: '',
      startDate: null,
      startDateText: null,
      endDate: null,
      endDateText: null,
      downOption: {
        native: true
      },
      upOption: {
        noMoreSize: 0
      },
      goods: [], // 数据列表
      name: null
    }
  },
  computed: {
    date() {
      return [this.startDateText, this.endDateText]
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
            this.goods = []
            this.mescroll.resetUpScroll()
          }
        }
      },
      deep: true
    }
  },
  onLoad() {},
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
    changeSelect(index) {
      if (this.selectIndex !== index) {
        this.name = ''
        this.selectIndex = index
      }
    },
    doSearch() {
      this.goods = [] // 先清空列表,显示加载进度
      this.mescroll.resetUpScroll()
    },
    changeTab(id) {
      if (this.tabId === id) return
      this.tabId = id
      this.goods = []
      this.mescroll.resetUpScroll()
    },
    showPicker(type) {
      uni.hideKeyboard()
      this.dateType = type
      this.showDate = true
    },
    confirmDate(e) {
      const date = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
      if (this.dateType === 'start') {
        this.startDate = date
        this.startDateText = date
      }
      if (this.dateType === 'end') {
        this.endDate = date
        this.endDateText = date
      }
      this.showDate = false
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    upCallback(page) {
      const params = {
        showType: this.tabId,
        page: page.num,
        limit: page.size,
        start: this.startDate,
        end: this.endDate
      }
      const key = this.selectList[this.selectIndex].id
      if (this.name) {
        params[key] = this.name
      }

      getOrderApi(params)
        .then(res => {
          // const { list, total } = res.data
          const { list, total } = res.data
          this.mescroll.endBySize(list.length, total)
          if (page.num == 1) this.goods = []
          this.goods = this.goods.concat(list)
        })
        .catch(() => {
          this.mescroll.endErr()
        })
    },
    refresh() {
      this.mescroll.resetUpScroll()
    }
  }
}
</script>

<style lang="scss" scoped>
.top-wrap {
  z-index: 99;
  position: sticky;
  // position: fixed;
  top: var(--window-top); /* css变量 */
  left: 0;
  width: 100%;
  padding: 10px 16px;
  background-color: $u-white;
}
.o-tabs {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.o-dates {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.date-item {
  position: relative;
  display: flex;
  align-items: center;
}
.date-clear {
  position: absolute;
  right: 10px;
  top: 0;
  transform: translateY(50%);
}
</style>
