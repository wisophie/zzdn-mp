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
          @afterRead="afterRead"
          name="1"
          :maxCount="1"
        >
          <image src="/static/home/img-portrait.png" 
          mode="widthFix" style="width: 300rpx;height: 200rpx;"></image>
        </u-upload>
        <img src="/static/home/img-national.png" alt="" @click="handleChoose">
        <input v-show="false" ref="upload" type="file" @change="handleUpload">
      </view>
    </view>
  </view>
</template>

<script>
import { uploadImg } from '@/api/home'
export default {
  data() {
    return {
      fileList: []
    }
  },

  methods: {
    handleChoose() {
      // uni.chooseImage({
      //   success: (chooseImageRes) => {
      //     console.log(chooseImageRes)
      //   }
      // });
    },

    handleUpload(e) {
      console.log(e)
    },

    afterRead(e) {
      // console.log(e)
      // uploadImg({
      //   file: e.file,
      //   type: ''
      // }).then(res => {
      //   console.log(res)
      // })
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
}
</style>