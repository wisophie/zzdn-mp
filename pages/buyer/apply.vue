<template>
  <view class="content">
    <view
      v-if="[0, 2].includes(progress)"
      class="content-tag"
      :class="{'is-reject': progress === 2}"
    >{{ progress === 0 ? '已申请' : '已拒绝' }}</view>
    <u-form labelPosition="top" :model="form" :rules="rules" ref="formRef" labelWidth="120">
      <view class="form-section">手持身份证照片</view>
      <view>
        <u-upload
          :fileList="form.handIdCardUrl"
          :maxCount="1"
          width="160"
          height="100"
          @afterRead="afterRead($event, 'handIdCardUrl')"
          @delete="deletePic($event, 'handIdCardUrl')"
        ></u-upload>
      </view>

      <u-form-item label="收货地址" prop="address" borderBottom>
        <u-input v-model="form.address" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <view class="form-section">地址照片</view>
      <view>
        <u-upload
          :fileList="form.addressUrl"
          :maxCount="1"
          width="160"
          height="100"
          @afterRead="afterRead($event, 'addressUrl')"
          @delete="deletePic($event, 'addressUrl')"
        ></u-upload>
      </view>

      <u-form-item label="企业及商户采购商" prop="companyMark" borderBottom>
        <u-radio-group v-model="form.companyMark">
          <u-radio label="是" :name="true" :customStyle="{marginRight: '8px'}"></u-radio>
          <u-radio label="否" :name="false"></u-radio>
        </u-radio-group>
      </u-form-item>
      <view class="form-section">营业执照</view>
      <view>
        <u-upload
          :fileList="form.license"
          :maxCount="1"
          width="160"
          height="100"
          @afterRead="afterRead($event, 'license')"
          @delete="deletePic($event, 'license')"
        ></u-upload>
      </view>
      <view class="form-section">法人身份证照片</view>
      <view>
        <u-upload
          :fileList="form.legalIdCardUrl"
          :maxCount="1"
          width="160"
          height="100"
          @afterRead="afterRead($event, 'legalIdCardUrl')"
          @delete="deletePic($event, 'legalIdCardUrl')"
        ></u-upload>
      </view>

      <u-form-item label="厂址或办公地址" prop="factory" borderBottom>
        <u-input v-model="form.factory" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <view class="form-section">地址照片（能显示门头或门牌号）</view>
      <view>
        <u-upload
          :fileList="form.factoryUrl"
          :maxCount="1"
          width="160"
          height="100"
          @afterRead="afterRead($event, 'factoryUrl')"
          @delete="deletePic($event, 'factoryUrl')"
        ></u-upload>
      </view>

      <view class="row-agree">
        <view class="row-agree__checkbox" :class="{ active: agree }" @click="agree = !agree">
          <u-icon v-show="agree" name="checkmark" color="#fff" size="12" />
        </view>
        <text>我已阅读并同意</text>
        <text class="u-warning" @click="toAgreement">《用户协议》</text>
      </view>
    </u-form>
    <base-footer>
      <view class="u-flex-fill px-4 pt-1">
        <u-button type="primary" :loading="submitLoading" :text="progress === 2 ? '重新申请' : '提交申请'" @click="submit"></u-button>
      </view>
    </base-footer>
  </view>
</template>

<script>
import { uploadApi } from '@/api/common'
import { buyerApply, buyerFindById, buyerUpdate } from '@/api/goods'

export default {
  data() {
    return {
      form: {
        handIdCardUrl: [],
        address: '',
        addressUrl: [],
        companyMark: true,
        license: [],
        legalIdCardUrl: [],
        factory: '',
        factoryUrl: [],
      },
      rules: {},
      agree: false,
      submitLoading: false,
      progress: null, // null-未申请, 0-申请中, 1-已申请，2-已拒绝 
    }
  },

  onReady() {
    this.$refs.formRef.setRules(this.rules)
  },

  onLoad() {
    const userInfo = uni.getStorageSync('userInfo')
    const { id } = userInfo
    this.fetchDetail(id)
  },

  methods: {
    fetchDetail(id) {
      buyerFindById().then(res => {
        const data = res.data
        if (data && data.progress !== 1) {
          this.form.id = id
          for (const key in this.form) {
            if (data[key]) {
              if (Array.isArray(this.form[key])) {
                this.form[key] = [{url: data[key]}]
              } else {
                this.form[key] = data[key]
              }
            }
          }
          this.progress = data.progress
        }
      })
    },
    toAgreement() {
      uni.$u.route('/pages/agreement/agreement')
    },
    changeType() {
      this.showType = true
      uni.hideKeyboard()
    },
    confirmType(e) {
      this.form.organizationType = e
    },
    // 删除图片
    deletePic(event, key) {
      this.form[key].splice(event.index, 1)
    },
    // 新增图片
    async afterRead(event, key) {
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
        let type = null
        if (['idCardPortrait', 'idCardNational'].includes(key)) type = 'v3'
        uploadApi(lists[i].url, type)
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
      if (!this.agree) return uni.$u.toast('请阅读并同意《用户协议》')
      this.loading = true
      let data = {}
      for (const key in this.form) {
        if (Array.isArray(this.form[key])) {
          data[key] = this.form[key].map(v => v.url).join(',')
        } else {
          data[key] = this.form[key]
        }
      }
      const isUpdate = !!this.form.id
      const requestFunc = isUpdate ? buyerUpdate : buyerApply
      requestFunc(data)
        .then(res => {
          this.loading = false
          uni.$u.toast('提交成功')
          setTimeout(() => {
            uni.navigateBack()
          }, 800)
        })
        .catch(err => {
          this.loading = false
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

  .content-tag {
    position: absolute;
    right: 24rpx;
    top: 20rpx;
    width: 160rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 40rpx;
    text-align: center;
    color: #5d51ff;
    border: 1rpx solid #5d51ff;

    &.is-reject {
      color: #fa3534;
      border-color: #fa3534;
    }
  }
}
.form-section {
  position: relative;
  padding: 16rpx 0 16rpx 24rpx;
  font-size: 16px;
  font-weight: 600;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    height: 44%;
    width: 3px;
    background: $u-primary;
    transform: translateY(-50%);
    border-radius: 2px;
  }
}
.row-agree {
  display: flex;
  align-items: center;
  padding: 32rpx 0;
  font-size: 26rpx;
  &__checkbox {
    margin-right: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%;
    border: 1px solid $u-border-color;
    &.active {
      background-color: $u-primary;
      border-color: $u-primary;
    }
  }
}
</style>
