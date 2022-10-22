// 完善信息
<template>
  <view class="container">
    <view>请完善个人信息</view>

    <view class="form-box">
      <view class="form-item">
        <input class="username" v-model="formData.username" placeholder="用户名" />
      </view>

      <view class="form-item">
        <uni-data-picker
          v-model="formData.gender"
          :localdata="genderOption" 
          placeholder="性别" 
          popup-title="请选择"
          :clear-icon="false"
        ></uni-data-picker>
      </view>

      <!-- <view class="form-item">
        <input class="mobile" v-model="formData.birthday" placeholder="生日（例：2022-02-02）" />
      </view> -->

      <view class="form-item">
        <uni-data-picker 
          :localdata="addressOptions" 
          placeholder="地址" 
          popup-title="请选择"
          :map="{text: 'name', value: 'code'}"
          :clear-icon="false"
          @change="onchange"
        ></uni-data-picker>
      </view>

      <button
        type="primary"
        class="register-btn" 
        :open-type="isBindMobile ? '' : 'getPhoneNumber'"
        @getPhoneNumber="getPhoneNumber"
        @click="handleSubmit"
      >保存</button>

    </view>
  </view>
</template>

<script>
import { bindPhone, fetchUserInfo, updateInfo } from '@/api/login'
import { regionList } from '@/api/address'
export default {
  data() {
    return {
      formData: {
        username: '',
        gender: '',
        province: '',
        city: ''
      },
      isBindMobile: false, // 是否已绑定手机号
      phoneInfo: {},

      genderOption: [
        { text: '男', value: 1 },
        { text: '女', value: 2 },
      ],
      addressOptions: []
    }
  },

  created() {
    this.fetchUserInfo()
    this.getRegionList()
  },

  methods: {
    fetchUserInfo() {
      fetchUserInfo({}).then(res => {
        for(let key in this.formData) {
          this.formData[key] = res.data[key]
        }
        this.isBindMobile = !!res.data.mobile
      })
    },

    getRegionList() {
      regionList().then(res => {
        this.addressOptions = res.data.list
      })
    },

    onchange(e) {
      console.log(e)
      const { value } = e.detail
      const addressType = ['province', 'city']
      value.forEach((item, index) => {
        if (addressType[index]) {
          this.formData[addressType[index]] = item.text
        }
      })
    },

    getPhoneNumber(e) {
      if (e.detail.errMsg !== "getPhoneNumber:ok") {
        return;
      }
      this.phoneInfo = e.detail
      this.doBindPhone()
    },

    doBindPhone() {
      const { encryptedData, iv } = this.phoneInfo
      bindPhone({
        encryptedData,
        iv
      }).then((res) => {
        this.isBindMobile = true
        this.handleSubmit()
      })
    },

    handleSubmit() {
      if(!this.isBindMobile) return

      updateInfo(this.formData).then(res => {
        uni.navigateBack({
          delta: 2
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #fff;
  overflow: auto;
}
.form-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0 40rpx;
  margin-top: 96rpx;
  background: #fff;
}

.form-item {
  position: relative;
  background: #fff;
  height: 96rpx;
  border-bottom: 1px solid #d9d9d9;
}

.form-item .username, .form-item .password, .form-item .mobile, .form-item .code {
  position: absolute;
  top: 26rpx;
  left: 0;
  display: block;
  width: 100%;
  height: 44rpx;
  background: #fff;
  color: #333;
  font-size: 30rpx;
}

.form-item-code {
  margin-top: 32rpx;
  height: auto;
  overflow: hidden;
  width: 100%;
}

.form-item-code .form-item {
  float: left;
  width: 350rpx;
}

.form-item-code .code-btn {
  float: right;
  padding: 20rpx 40rpx;
  border: 1px solid #d9d9d9;
  border-radius: 10rpx;
  color: #fff;
  background: green;
}

.form-item .clear {
  position: absolute;
  top: 32rpx;
  right: 18rpx;
  z-index: 2;
  display: block;
  background: #fff;
}

.register-btn {
  margin: 60rpx 0 40rpx 0;
  height: 96rpx;
  line-height: 96rpx;
  color: #fff;
  font-size: 30rpx;
  width: 100%;
  border-radius: 6rpx;
}

/deep/ {
  .input-value-border {
    padding: 0;
    border: none;
  }
}
</style>