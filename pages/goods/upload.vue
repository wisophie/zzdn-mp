<template>
  <view class="content">
    <u-form labelPosition="top" :model="form" :rules="rules" ref="formRef" labelWidth="120">
      <u-form-item label="产品类目">
        <view class="tag-list">
          <view
            class="tag-item"
            v-for="item in cateList"
            :key="item.id"
            :class="{ active: form.categoryId === item.id }"
            @click="changeCate(item.id)"
          >
            {{ item.name }}
          </view>
        </view>
      </u-form-item>
      <u-form-item label="产品标题" prop="name">
        <u-textarea
          v-model="form.name"
          placeholder="请输入标题"
          count
          maxlength="18"
          height="24"
          style="padding: 4px 9px"
        ></u-textarea>
      </u-form-item>
      <u-form-item label="产品价格" prop="retailPrice">
        <u-input v-model="form.retailPrice" type="number" placeholder="请输入价格"></u-input>
      </u-form-item>
      <u-form-item label="产品数量" prop="number">
        <u-input v-model="form.number" type="number" placeholder="请输入数量"></u-input>
      </u-form-item>
      <u-form-item label="交易方式" prop="exchange" @click="changeWay">
        <u-input
          v-model="form.exchange.name"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择交易方式"
          suffixIcon="arrow-right"
          suffixIconStyle="color: #909399"
        ></u-input>
      </u-form-item>
      <u-form-item label="产品详情" prop="detail">
        <u-textarea
          v-model="form.detail"
          placeholder="请输入产品详情"
          count
          maxlength="200"
        ></u-textarea>
      </u-form-item>
      <u-form-item label="产品图片">
        <u-upload
          :fileList="form.gallery"
          multiple
          :maxCount="9"
          @delete="deletePic"
          @afterRead="afterRead"
        ></u-upload>
      </u-form-item>
      <u-form-item label="是否上架" prop="isOnSale">
        <u-switch v-model="form.isOnSale" activeColor="#5d51ff"></u-switch>
      </u-form-item>
      <u-action-sheet
        :show="showWay"
        :actions="ways"
        title="请选择交易方式"
        @close="showWay = false"
        @select="selectWay"
      ></u-action-sheet>
    </u-form>
    <base-footer>
      <view class="u-flex-fill px-4 pt-1">
        <u-button type="primary" text="提交" @click="submit"></u-button>
      </view>
    </base-footer>
  </view>
</template>

<script>
import { uploadApi } from '@/api/common'
import { getCateApi, createApi, getInfoApi, updateApi } from '@/api/goods'

const wayData = [
  { id: '0', name: '线上交易' },
  { id: '1', name: '线下交易' },
  { id: '2', name: '老客户下单延期支付' }
]

export default {
  data() {
    return {
      currentId: null,
      cateList: [],
      showWay: false,
      ways: wayData,
      exchangeName: '',
      form: {
        categoryId: null,
        name: '',
        detail: '',
        retailPrice: '',
        gallery: [],
        number: '',
        exchange: {},
        isOnSale: true
      },
      rules: {}
    }
  },
  onLoad({ id }) {
    this.getCate()
    if (id) {
			uni.setNavigationBarTitle({
				title:'编辑产品'
			})
      this.currentId = id
      this.getInfo(id)
    }
  },
  onReady() {
    this.$refs.formRef.setRules(this.rules)
  },
  methods: {
    getCate() {
      getCateApi({ page: 1, limit: 999 }).then(res => {
        this.form.categoryId = res.data.list[0].id
        this.cateList = res.data.list
      })
    },
    getInfo(id) {
      getInfoApi({ id }).then(res => {
        const form = res.data
        if (form.gallery) {
          const imgs = form.gallery
            .split(',')
            .map(v => ({ status: 'success', message: '', url: v }))
          form.gallery = imgs
        }
        if (form.exchange !== null) {
          const exchange = wayData.find(v => v.id === form.exchange)
          form.exchange = exchange
        }
        this.form = form
      })
    },
    changeCate(id) {
      if (this.form.categoryId === id) return
      this.form.categoryId = id
    },
    changeWay() {
      this.showWay = true
      uni.hideKeyboard()
    },
    selectWay(e) {
      this.form.exchange = e
    },
    // 删除图片
    deletePic(event) {
      const key = 'gallery'
      this.form[key].splice(event.index, 1)
    },
    async afterRead(event) {
      const key = 'gallery'
      let lists = [].concat(event.file)
      let fileListLen = this.form[key].length
      lists.map(item => {
        this.form[key].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        uploadApi(lists[i].url)
          .then(res => {
            const result = res.data
            let item = this.form[key][fileListLen]
            this.form[key].splice(
              fileListLen,
              1,
              Object.assign(item, {
                status: 'success',
                message: '',
                url: result
              })
            )
            fileListLen++
          })
          .catch(err => {
            this.form[key].splice(
              fileListLen,
              1,
              Object.assign(item, {
                status: 'fail',
                message: '上传失败'
              })
            )
            fileListLen++
          })
      }
    },
    submit() {
      const data = {
        ...this.form,
        exchange: this.form.exchange.id || null,
        gallery: this.form.gallery.map(v => v.url).join()
      }
      if (this.currentId) {
        updateApi(data).then(res => {
          uni.$u.toast('编辑成功')
          setTimeout(() => {
            uni.navigateBack()
          }, 800)
        })
      } else {
        createApi(data).then(res => {
          uni.$u.toast('上传成功')
          setTimeout(() => {
            uni.navigateBack()
          }, 800)
        })
      }
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
.content {
  padding: 0 32rpx;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.tag-item {
  margin-right: 2%;
  margin-bottom: 12rpx;
  padding: 16rpx 0;
  width: 32%;
  text-align: center;
  color: $u-tips-color;
  background-color: $u-bg-color;
  border-radius: 4px;
  &:nth-child(3n) {
    margin-right: 0;
  }
  &.active {
    color: $u-white;
    background-color: $u-primary;
  }
}
.form-section {
  position: relative;
  padding: 16rpx 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
