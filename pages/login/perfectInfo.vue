// 完善信息
<template>
  <view class="container">
    <view class="container-title">请完善个人信息</view>


    <view class="form-box">
      <view class="form-item">
        <input v-model="formData.nickname" type="nickname" class="username" placeholder="请输入昵称"/>
        <!-- <input class="username" v-model="formData.nickname" placeholder="请输入昵称" /> -->
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
        v-if="isBindMobile"
        type="primary"
        class="register-btn" 
        @click="handleSubmit"
      >保存</button>

      <button
        v-else
        type="primary"
        class="register-btn" 
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
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
        avatar: '',
        nickname: '',
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
      const userInfo = uni.getStorageSync('userInfo')
      for(let key in this.formData) {
        this.formData[key] = userInfo[key]
      }
      this.formData.nickname = userInfo.nickName === '微信用户' ? '' : userInfo.nickName
      this.isBindMobile = !!userInfo.mobile
    },

    getRegionList() {
      regionList().then(res => {
        this.addressOptions = res.data.list
      })
    },

    onchange(e) {
      const { value } = e.detail
      const addressType = ['province', 'city']
      value.forEach((item, index) => {
        if (addressType[index]) {
          this.formData[addressType[index]] = item.text
        }
      })
    },

    onChooseAvatar(e) {
      const { avatarUrl } = e.detail 
      this.formData.avatar = avatarUrl
    },

    getPhoneNumber(e) {
      console.log(e, '--gg1')
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
      if (!this.formData.nickname) {
        uni.$u.toast('请输入昵称')
        return
      }
      if(!this.isBindMobile) return

      updateInfo(this.formData).then(res => {
		  
        uni.navigateBack(1)
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

  .container-title {
    margin: 40rpx;
    font-size: 36rpx;
    font-weight: 600;
  }
}
.form-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0 40rpx;
  background: #fff;
  box-sizing: border-box;
}

.avatar-wrapper {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;

  image {
    width: 100%;
    height: 100%;
  }
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