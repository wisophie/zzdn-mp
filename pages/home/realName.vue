<template>
  <view class="container">
    <view class="header">
      提升账户安全 使用更安全
    </view>
    <view class="content">
      <view class="content-title">填写个人信息</view>
      <u-form labelWidth="80px">
        <u-form-item label="您的姓名" borderBottom>
          <u-input v-model="formData.realName" placeholder="请输入真实姓名" border="none"></u-input>
        </u-form-item>
        <u-form-item label="证件号码" borderBottom>
          <u-input v-model="formData.idCard" placeholder="请输入证件号码" border="none"></u-input>
        </u-form-item>
      </u-form>

      <view class="content-title">填写个人信息</view>
      <view class="content-image">
        <u-upload
          :fileList="fileList"
          @afterRead="e => afterRead(e, 'portraitUrl')"
          name="1"
          :maxCount="1"
        >
          <image :src="formData.portraitUrl || '/static/home/img-portrait.png'" 
          mode="widthFix" style="width: 300rpx;height: 200rpx;"></image>
        </u-upload>
        <u-upload
          :fileList="fileList1"
          @afterRead="e => afterRead(e, 'nationalUrl')"
          name="1"
          :maxCount="1"
        >
          <image :src="formData.nationalUrl || '/static/home/img-national.png'" 
          mode="widthFix" style="width: 300rpx;height: 200rpx;"></image>
        </u-upload>
      </view>
    </view>

    <view class="bottom">
      <u-button type="primary" @click="handleSubmit">提交</u-button>
    </view>
  </view>
</template>

<script>
import { uploadApi } from '@/api/common'
import { certifySave } from '@/api/home'
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
      }
    }
  },

  methods: {
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
}
</style>