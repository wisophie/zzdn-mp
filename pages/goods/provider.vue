<template>
  <view class="content">
    <u-form labelPosition="top" :model="form" :rules="rules" ref="formRef" labelWidth="360">
      <view class="form-section">
        基本信息
        <text class="form-section__status">{{ progressText }}</text>
      </view>
      <u-form-item label="公司名称" prop="companyName" borderBottom>
        <u-input v-model="form.companyName" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="机构代码" prop="organizationCode" borderBottom>
        <u-input v-model="form.organizationCode" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="公司地址" prop="address" borderBottom>
        <u-input v-model="form.address" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="联系方式" prop="tel" borderBottom>
        <u-input
          v-model="form.tel"
          border="none"
          type="number"
          maxlength="11"
          placeholder="请输入"
        ></u-input>
      </u-form-item>
      <u-form-item label="公司邮箱" prop="mail" borderBottom>
        <u-input v-model="form.mail" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="主体类型" prop="organizationType" borderBottom @click="changeType">
        <u-input
          v-model="form.organizationType.name"
          border="none"
          placeholder="请选择"
          disabled
          disabledColor="#ffffff"
        ></u-input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item label="店铺名称" prop="netshopName" borderBottom>
        <u-input v-model="form.netshopName" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="真实姓名" prop="realName" borderBottom>
        <u-input v-model="form.realName" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="身份证号" prop="idCardNumber" borderBottom>
        <u-input
          v-model="form.idCardNumber"
          type="idcard"
          border="none"
          placeholder="请输入"
        ></u-input>
      </u-form-item>
      <u-form-item label="身份证有效期始" prop="idCardValidTimeBegin" borderBottom>
        <u-input v-model="form.idCardValidTimeBegin" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="身份证有效期末" prop="idCardValidTime" borderBottom>
        <u-input v-model="form.idCardValidTime" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="营业执照注册号" prop="licenseNo" borderBottom>
        <u-input v-model="form.licenseNo" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="证件的经营者/法定代表人姓名" prop="legalPerson" borderBottom>
        <u-input v-model="form.legalPerson" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="营业执照/登记证书的商家名称" prop="licenseName" borderBottom>
        <u-input v-model="form.licenseName" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="账户类型" prop="bankAccountType" borderBottom @click="changeType1">
        <u-input
          v-model="form.bankAccountType.name"
          border="none"
          placeholder="请选择"
          disabled
          disabledColor="#ffffff"
        ></u-input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item label="开户银行" prop="accountBank" borderBottom>
        <u-input v-model="form.accountBank" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="开户人名称" prop="accountName" borderBottom>
        <u-input v-model="form.accountName" border="none" placeholder="请输入"></u-input>
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

      <view class="form-section">法人/经营者证件</view>
      <view class="u-flex u-flex-x-center">
        <view>
          <u-upload
            :fileList="form.idCardPortrait"
            :maxCount="1"
            width="160"
            height="100"
            @afterRead="afterRead($event, 'idCardPortrait')"
            @delete="deletePic($event, 'idCardPortrait')"
          ></u-upload>
          <view class="text-xs u-tips-color" style="textalign: center">身份证头像面</view>
        </view>
        <view>
          <u-upload
            :fileList="form.idCardNational"
            :maxCount="1"
            width="160"
            height="100"
            @afterRead="afterRead($event, 'idCardNational')"
            @delete="deletePic($event, 'idCardNational')"
          ></u-upload>
          <view class="text-xs u-tips-color text-center" style="textalign: center">
            身份证国徽面
          </view>
        </view>
      </view>

      <view class="form-section">办公环境/厂房照片(非必填)</view>
      <view>
        <u-upload
          :fileList="form.workshopPhoto"
          width="160"
          height="100"
          multiple
          :maxCount="8"
          @delete="deletePic($event, 'workshopPhoto')"
          @afterRead="afterRead($event, 'workshopPhoto')"
        ></u-upload>
      </view>
      <view class="form-section">网店后台界面(非必填)</view>
      <view>
        <u-upload
          :fileList="form.netshopPhoto"
          width="160"
          height="100"
          :maxCount="8"
          multiple
          @delete="deletePic($event, 'netshopPhoto')"
          @afterRead="afterRead($event, 'netshopPhoto')"
        ></u-upload>
      </view>
      <view class="row-agree">
        <view class="row-agree__checkbox" :class="{ active: agree }" @click="agree = !agree">
          <u-icon v-show="agree" name="checkmark" color="#fff" size="12" />
        </view>
        <text>我已阅读并同意</text>
        <text class="u-warning" @click="toAgreement">《用户协议》</text>
      </view>
      <u-action-sheet
        :show="showType"
        :actions="typeList"
        title="请选择主体类型"
        @close="showType = false"
        @select="confirmType"
      ></u-action-sheet>
      <u-action-sheet
        :show="showType1"
        :actions="typeList1"
        title="请选择账户类型"
        @close="showType1 = false"
        @select="confirmType1"
      ></u-action-sheet>
    </u-form>
    <base-footer>
      <view class="u-flex-fill px-4 pt-1">
        <u-button type="primary" :loading="submitLoading" text="提交" @click="submit"></u-button>
      </view>
    </base-footer>
  </view>
</template>

<script>
import { uploadApi } from '@/api/common'
import { applyApi, applyUpdateApi, getApplyInfoApi } from '@/api/goods'
const typeData = [
  { name: '小微商户', id: 2401 },
  { name: '个人卖家', id: 2500 },
  { name: '个体工商户', id: 4 },
  { name: '企业', id: 2 },
  { name: '事业单位', id: 3 },
  { name: '政府机关', id: 2502 },
  { name: '社会组织', id: 1708 }
]
const typeData1 = [
  { name: '对公账户', id: 74 },
  { name: '对私账户', id: 75 }
]
const progressMap = {
  0: '已申请',
  1: '已通过',
  2: '已拒绝'
}
export default {
  data() {
    return {
      progress: null,
      showType: false,
      showType1: false,
      typeList: typeData,
      typeList1: typeData1,
      form: {
        companyName: '',
        organizationType: { name: '' }, // 主体类型
        organizationCode: '',
        address: '',
        tel: '',
        mail: '',
        license: [], // 营业执照
        idCardPortrait: [], // 身份证头像面
        idCardNational: [], // 身份证国徽面
        workshopPhoto: [], // 办公环境
        netshopName: '', //网店名称
        netshopPhoto: [], // 网店照片
        realName: '', // 真实姓名
        idCardNumber: '', // 身份证号
        idCardValidTimeBegin: '', // 身份证有效期始
        idCardValidTime: '', // 身份证有效期末
        licenseNo: '', // 新增字段
        legalPerson: '',
        licenseName: '',
        bankAccountType: { name: '' },
        accountBank: '',
        accountName: ''
      },
      rules: {},
      agree: false,
      submitLoading: false
    }
  },
  computed: {
    progressText() {
      return this.progress === null ? '' : progressMap[this.progress]
    }
  },
  onLoad() {
    getApplyInfoApi().then(res => {
      if (!res.data) return
      const { progress, ...rest } = res.data
      this.progress = progress
      const form = rest
      const imgArr = [
        'license',
        'idCardPortrait',
        'idCardNational',
        'workshopPhoto',
        'netshopPhoto'
      ]
      for (const key of imgArr) {
        if (form[key]) {
          const imgs = form[key].split(',').map(v => ({ status: 'success', message: '', url: v }))
          form[key] = imgs
        }
      }
      if (form.organizationType !== null && form.organizationType !== undefined) {
        const organizationType = typeData.find(v => v.id === form.organizationType)
        form.organizationType = organizationType
      }
      if (form.bankAccountType !== null && form.bankAccountType !== undefined) {
        const bankAccountType = typeData1.find(v => v.id === form.bankAccountType)
        form.bankAccountType = bankAccountType
      }
      this.form = Object.assign(this.form, form)
    })
  },
  onReady() {
    this.$refs.formRef.setRules(this.rules)
  },
  methods: {
    toAgreement() {
      uni.$u.route('/pages/agreement/agreement')
    },
    changeType() {
      this.showType = true
      uni.hideKeyboard()
    },
    changeType1() {
      this.showType1 = true
      uni.hideKeyboard()
    },
    confirmType(e) {
      this.form.organizationType = e
    },
    confirmType1(e) {
      this.form.bankAccountType = e
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
          if (key === 'organizationType') {
            data[key] = this.form[key].id
          } else {
            data[key] = this.form[key]
          }
        }
      }
      if (data.id) {
        applyUpdateApi(data)
          .then(res => {
            this.loading = false
            uni.$u.toast('更新成功')
            setTimeout(() => {
              uni.navigateBack()
            }, 800)
          })
          .catch(err => {
            this.loading = false
          })
      } else {
        applyApi(data)
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
  &__status {
    position: absolute;
    right: 0;
    top: 0;
    padding: 20rpx 0;
    color: $u-warning;
    font-size: 13px;
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
