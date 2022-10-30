<template>
  <view class="content">
    <u-form labelPosition="top" :model="form" :rules="rules" ref="formRef" labelWidth="120">
      <u-form-item label="售后类型" prop="type" @click="changeWay">
        <u-input
          v-model="form.type.name"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择售后方式"
          suffixIcon="arrow-right"
          suffixIconStyle="color: #909399"
        ></u-input>
      </u-form-item>
      <u-form-item label="退款原因" prop="reason">
        <u-input v-model="form.reason" placeholder="请输入退款原因"></u-input>
      </u-form-item>
      <u-form-item label="退款金额" prop="amount">
        <u-input v-model="form.amount" type="number" placeholder="请输入退款金额"></u-input>
      </u-form-item>
      <u-form-item label="退款说明" prop="comment">
        <u-input v-model="form.comment" placeholder="请输入退款说明"></u-input>
      </u-form-item>
      <u-form-item label="产品图片">
        <u-upload
          :fileList="form.pictures"
          multiple
          :maxCount="9"
          @delete="deletePic"
          @afterRead="afterRead"
        ></u-upload>
      </u-form-item>
      <u-action-sheet
        :show="showWay"
        :actions="ways"
        title="请选择售后类型"
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
import { applyAfterSaleApi } from '@/api/order'

const wayData = [
  { id: 1, name: '已收货（无需退货）退款' },
  { id: 2, name: '退货退款' }
]

const cates = []

export default {
  data() {
    return {
      orderId: null,
      showWay: false,
      ways: wayData,
      form: {
        type: {},
        reason: '',
        amount: '',
        comment: '',
        pictures: []
      },
      rules: {}
    }
  },
  onLoad({ id }) {
    this.orderId = id
  },
  onReady() {
    this.$refs.formRef.setRules(this.rules)
  },
  methods: {
    changeWay() {
      this.showWay = true
      uni.hideKeyboard()
    },
    selectWay(e) {
      this.form.type = e
    },
    // 删除图片
    deletePic(event) {
      const key = 'pictures'
      this.form[key].splice(event.index, 1)
    },
    async afterRead(event) {
      const key = 'pictures'
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
        type: this.form.type.id || null,
        pictures: this.form.pictures.map(v => v.url),
        orderId: this.orderId
      }
      applyAfterSaleApi(data).then(res => {
        uni.$u.toast('申请成功')
        setTimeout(() => {
          uni.navigateBack()
        }, 800)
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
.content {
  padding: 0 32rpx;
}
.form-section {
  position: relative;
  padding: 16rpx 0;
  font-size: 16px;
  font-weight: 600;
}
</style>
