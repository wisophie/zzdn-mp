<template>
  <view class="container">
    <view class="header">
      提升账户安全 使用更安全
    </view>
    <view class="content">
      <view class="content-title">填写个人信息</view>
      <u-form labelWidth="80px">
        <u-form-item label="您的姓名" borderBottom>
          <u-input v-model="formData.realName" placeholder="请输入真实姓名" border="none" :readonly="certify"></u-input>
        </u-form-item>
        <u-form-item label="证件号码" borderBottom>
          <u-input v-model="formData.idCard" placeholder="请输入证件号码" border="none" :readonly="certify"></u-input>
        </u-form-item>
      </u-form>

      <view class="content-title">上传手持证件照</view>
      <view class="content-image">
        <u-upload
          :fileList="fileList"
          @afterRead="e => afterRead(e, 'portraitUrl')"
          name="1"
          :maxCount="1"
          :disabled="certify"
        >
          <image :src="formData.portraitUrl || '/static/home/img-portrait.png'" 
         style="width: 300rpx;height: 200rpx;"></image>
         <view class="image-tips">身份证头像面</view>
        </u-upload>
        <u-upload
          :fileList="fileList1"
          @afterRead="e => afterRead(e, 'nationalUrl')"
          name="1"
          :maxCount="1"
          :disabled="certify"
        >
          <image :src="formData.nationalUrl || '/static/home/img-national.png'" 
         style="width: 300rpx;height: 200rpx;"></image>
         <view class="image-tips">身份证国徽面</view>
        </u-upload>
      </view>
    </view>

    <view v-if="!certify" class="bottom">
      <u-button type="primary" @click="handleSubmit">提交</u-button>
    </view>
  </view>
</template>

<script>
import { uploadApi } from '@/api/common'
import { certifySave, certifyDetail } from '@/api/home'
export default {
  data() {
    return {
      fileList: [],
      fileList1: [],
      formData: {
        realName: '',
        idCard: '',
        portraitUrl: '',
        nationalUrl: ''
      },
      certify: false
    }
  },

  created() {
    const { certify } = uni.getStorageSync('userInfo')
    if (certify) {
      this.certify = true
      this.fetchCertifyDetail()
    }
  },

  methods: {
    fetchCertifyDetail() {
      certifyDetail().then(res => {
        const data = res.data || {}
        for(let key in this.formData) {
          if (data[key]) {
            this.formData[key] = data[key]
          }
        }
      })
    },

    afterRead(e, key) {
      console.log(e)
      uploadApi(e.file.url, '').then(res => {
        console.log(res)
        this.formData[key] = res.data
      })
    },

    handleSubmit() {
      certifySave(this.formData).then(res => {
        console.log(res)
        uni.$u.toast('提交成功')
        uni.navigateBack({
           delta: 1
        });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {

  .header {
    padding: 40rpx 0 80rpx;
    background: #5c4ffe;
    text-align: center;
    color: #fff;
    font-size: 36rpx;
  }

  .content {
    padding: 0 40rpx 80rpx;
    margin-top: -40rpx;
    border-radius: 100rpx 100rpx 0 0;
    background: #fff;
    overflow: hidden;

    .content-title {
      margin-top: 60rpx;
      color: #5c4ffe;
      font-size: 32rpx;
      font-weight: bold;
    }

    .content-image {
      margin-top: 40rpx;
      display: flex;
      justify-content: space-between;

      img {
        width: 300rpx;
        height: 200rpx;
      }
    }
  }

  .bottom {
    margin: 80rpx 40rpx;
  }

  .image-tips {
    margin-top: 20rpx;
    text-align: center;
    color: #666;
    font-size: 28rpx;
  }
}
</style>