<template>
  <view class="content">
    <u-form labelPosition="top" :model="form" :rules="rules" ref="formRef" labelWidth="120">
      <view class="form-section">基本信息</view>
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
    </u-form>
    <base-footer>
      <view class="u-flex-fill px-4 pt-1">
        <u-button type="primary" text="提交"></u-button>
      </view>
    </base-footer>
  </view>
</template>

<script>
import { uploadApi } from '@/api/common'
import { applyApi } from '@/api/goods'
const typeData = [
  { name: '小微商户', id: 2401 },
  { name: '个人卖家', id: 2500 },
  { name: '个体工商户', id: 4 },
  { name: '企业', id: 2 },
  { name: '事业单位', id: 3 },
  { name: '政府机关', id: 2502 },
  { name: '社会组织', id: 1708 }
]

export default {
  data() {
    return {
      showType: false,
      typeList: typeData,
      form: {
        companyName: '',
        organizationType: {}, // 主体类型
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
        idCardValidTime: '' // 身份证有效期末
      },
      rules: {},
      agree: false
    }
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
    confirmType(e) {
      this.form.organizationType = e
    },
    // 删除图片
    deletePic(event, key) {
      this.form[key].splice(event.index, 1)
    },
    // 新增图片
    async afterRead(event, key) {
      console.log('%c 【 event 】-204', 'font-size:14px; color:rgb(210, 110, 210);', event)
      console.log('%c 【 key 】-204', 'font-size:14px; color:rgb(210, 110, 210);', key)
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
        try {
          let type = null
          if (['idCardPortrait', 'idCardNational'].includes(key)) type = 'v3'
          const result = await uploadApi(lists[i].url, type)
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
        } catch (error) {
          this.form[key].splice(
            fileListLen,
            1,
            Object.assign(item, {
              status: 'fail',
              message: '上传失败'
            })
          )
          fileListLen++
        }
      }

      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式

      // let lists = [].concat(event.file)
      // let fileListLen = this[`fileList${event.name}`].length
      // lists.map(item => {
      //   this[`fileList${event.name}`].push({
      //     ...item,
      //     status: 'uploading',
      //     message: '上传中'
      //   })
      // })
      // for (let i = 0; i < lists.length; i++) {
      //   const result = await this.uploadFilePromise(lists[i].url)
      //   let item = this[`fileList${event.name}`][fileListLen]
      //   this[`fileList${event.name}`].splice(
      //     fileListLen,
      //     1,
      //     Object.assign(item, {
      //       status: 'success',
      //       message: '',
      //       url: result
      //     })
      //   )
      //   fileListLen++
      // }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
          filePath: url,
          name: 'file',
          formData: {
            user: 'test'
          },
          success: res => {
            setTimeout(() => {
              resolve(res.data.data)
            }, 1000)
          }
        })
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
