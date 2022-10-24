<template>
  <!-- mescroll-uni本质是scroll-view,支持局部区域滚动,可使用flex布局灵活的嵌在某个view中, 而mescroll-body只能靠fixed定位其他元素变相实现'局部滚动' -->
  <view class="page-warp">
    <view class="top-warp">
      <u-input
        v-model="name"
        prefixIcon="search"
        shape="circle"
        placeholder="请输入关键词"
        confirmType="search"
        :customStyle="{ background: '#fff' }"
      >
        <template slot="suffix">
          <u-button
            size="mini"
            text="搜索"
            shape="circle"
            color="linear-gradient(to right, #C5C1FF, #473AFF)"
            @click="doSearch"
            @confirm="doSearch"
          />
        </template>
      </u-input>
      <me-tabs v-model="sortIndex" :tabs="sortList" :tabWidth="96"></me-tabs>
    </view>

    <view class="center-warp">
      <scroll-view class="left-warp" :scroll-y="true">
        <view
          class="tab"
          :class="{ active: i == tabIndex }"
          v-for="(tab, i) in tabs"
          :key="i"
          @click="tabChange(i)"
        >
          {{ tab }}
        </view>
      </scroll-view>

      <view class="right-warp">
        <mescroll-uni
          :fixed="false"
          ref="mescrollRef"
          @init="mescrollInit"
          @down="downCallback"
          @up="upCallback"
        >
          <goods-list :list="goods"></goods-list>
        </mescroll-uni>
      </view>
    </view>
    <view class="g-fab" @click="showAction">
      <u-icon name="more-dot-fill" size="24" color="#fff" />
    </view>
  </view>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
import GoodsList from '@/components/GoodsList'
import { getCateApi, getListApi } from '@/api/goods'
const sorts = [
  { name: '综合', id: 'add_time' },
  { name: '销量', id: 'sale_num' },
  { name: '价格', id: 'real_price' }
]
const cates = ['热门推荐', '分类一', '分类二']

export default {
  mixins: [MescrollMixin],
  components: { GoodsList },
  data() {
    return {
      name: '',
      sortIndex: 0,
      sortList: sorts,
      tabIndex: 0,
      tabs: cates,
      goods: []
    }
  },
  watch: {
    sortIndex() {
      this.mescroll.resetUpScroll(true)
    }
  },
  methods: {
    upCallback(page) {
      if (this.tabs.length === 0) {
        getCateApi({ page: 1, limit: 100 })
          .then(res => {
            this.tabs = res.data.list
            this.mescroll.resetUpScroll()
          })
          .catch(() => {
            this.mescroll.endErr()
          })
        return
      }

      const listData = [
        {
          id: '1',
          name: '日本进口缝隙收纳架厨房置物架冰箱夹缝车可移动多层落地超窄柜',
          gallery:
            'https://gw.alicdn.com/bao/uploaded/i1/2785650117/O1CN01cDrJqs1Cjd5NJwOTR_!!2785650117-0-picasso.jpg_300x300q90.jpg',
          retailPrice: '29'
        },
        {
          id: '2',
          name: '北美红雀冬青浆果欧式陶瓷餐具汤锅汤碗汤盆手绘浮雕彩绘带盖耐热',
          gallery:
            'https://gw.alicdn.com/bao/uploaded/i3/2833970451/TB2Jq8oXPihSKJjy0FlXXadEXXa_!!2833970451.jpg_300x300q90.jpg,https://gw.alicdn.com/bao/uploaded/i2/504369715/O1CN01VDTglP2LdWUZPQ849_!!0-item_pic.jpg_300x300q90.jpg',
          retailPrice: '118'
        },
        {
          id: '3',
          name: '他山集.日式皆川明风刺绣布艺锅盖把手防烫帽 烤箱隔热帽',
          gallery:
            'https://gw.alicdn.com/bao/uploaded/i2/2273872997/O1CN01F9w7VR1Y0fgB6hZMD_!!2273872997.jpg_300x300q90.jpg',
          retailPrice: '11.5'
        }
      ]
      const list = listData.map(v => ({ ...v, img: v.gallery ? v.gallery.split(',')[0] : '' }))
      const total = 3
      this.mescroll.endBySize(list.length, total)
      if (page.num == 1) this.goods = []
      this.goods = this.goods.concat(list)

      // const sort = this.sortList[this.sortIndex].id
      // const categoryId = this.tabs[this.tabIndex].id
      // const params = {
      //   name: this.name,
      //   page: page.num,
      //   limit: page.size,
      //  categoryId,
      //   sort
      // }
      // getListApi(params)
      //   .then(res => {
      //     const { list:listData, total } = res.data
      //     const list = listData.map(v => ({ ...v, img: v.gallery ? v.gallery.split(',')[0] : '' }))
      //     const total = 3
      //     this.mescroll.endBySize(list.length, total)
      //     if (page.num == 1) this.goods = []
      //     this.goods = this.goods.concat(list)
      //   })
      //   .catch(() => {
      //     this.mescroll.endErr()
      //   })
    },
    doSearch() {
      this.mescroll.resetUpScroll(true)
    },
    tabChange(i) {
      if (this.tabIndex != i) {
        this.tabIndex = i
        this.goods = []
        this.mescroll.resetUpScroll()
      }
    },
    showAction() {
      const isGHS = false // 是否是供货商
      uni.showActionSheet({
        itemList: ['供货商入驻', '上传产品', '我的产品', '采购订单'],
        success: res => {
          if (isGHS) {
            switch (res.tapIndex) {
              case 0:
                uni.$u.route('/pages/goods/provider')
                break
              case 1:
                uni.$u.route('/pages/goods/upload')
                break
              case 2:
                uni.$u.route('/pages/goods/upload-list')
                break
              case 3:
                uni.$u.route('/pages/goods/order-list')
                break
              default:
                break
            }
          } else {
            switch (res.tapIndex) {
              case 0:
                uni.$u.route('/pages/goods/provider')
                break
              case 1:
              case 2:
              case 3:
                uni.showModal({
                  title: '提示',
                  content: '抱歉，你未成为供货商',
                  confirmText: '立即申请',
                  success: function (res) {
                    if (res.confirm) {
                      uni.$u.route('/pages/goods/provider')
                    }
                  }
                })
                break
              default:
                break
            }
          }
        }
      })
    }
  }
}
</script>

<style>
page {
  height: 100%;
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
/*根元素需要有固定的高度*/

.page-warp {
  height: 100%;
  display: flex;
  flex-direction: column;

  /* 顶部区域 */
  .top-warp {
    padding: 10px 16px;
    background-color: $u-primary;
  }

  /* 中间 */
  .center-warp {
    flex: 1;
    min-width: 0;
    min-height: 0; /* 需给flex:1的元素加上最小高,否则内容超过会溢出容器 (如:小程序Android真机) */
    display: flex;
    // 左边
    .left-warp {
      width: 180rpx;
      height: 100%;
      background-color: $u-bg-color;
      .tab {
        padding: 28rpx;
        text-align: center;
        font-size: 28rpx;
        &.active {
          font-weight: 600;
          color: $u-primary;
          background-color: #fff;
        }
      }
    }
    .right-warp {
      flex: 1;
      min-width: 0;
      padding: 0 10px;
    }
  }
}
.g-fab {
  position: fixed;
  right: 32rpx;
  bottom: calc(var(--window-bottom) + 32rpx);
  width: 80rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: $u-primary;
  box-shadow: 0px 1px 4px 1px rgba($color: $u-primary, $alpha: 0.5);
  z-index: 99;
}
</style>
