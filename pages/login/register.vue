<template>
  <div class="container">
    <div class="form-box">

      <div class="form-item">
        <input class="username" v-model="username" placeholder="用户名" auto-focus/>
      </div>

      <div class="form-item">
        <input class="password" v-model="password" password placeholder="密码" />
      </div>

      <div class="form-item">
        <input class="password" v-model="confirmPassword" password placeholder="确认密码" />
      </div>

      <!-- <div class="form-item">
        <input class="mobile" :value="genderValue" placeholder="性别" readonly  @click="genderShow = true" />
        <u-picker :show="genderShow" :columns="genderOption" keyName="label" @confirm="handleGender" @cancel="genderShow=false"></u-picker>
      </div> -->

      <div class="form-item">
        <input class="mobile" v-model="birthday" placeholder="生日（例：2022-02-02）" />
      </div>

      <div class="form-item">
        <input class="mobile" v-model="mobile" placeholder="手机号" />
      </div>

      <div class="form-item-code">
        <div class="form-item code-item">
          <input class="code" v-model="code" placeholder="验证码" />
        </div>
        <div class="code-btn" @click="sendCode">获取验证码</div>
      </div>

      <button type="primary" open-type="getUserInfo" class="register-btn" @getuserinfo="startRegister">注册</button>

    </div>
  </div>
</template>

<script>
import { register, regCaptcha } from '@/api/login'
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      code: '',
      gender: 0,
      birthday: '',
      userInfo: {},

      genderShow: false,
      genderOption: [
        [
          { label: '男', id: 1 },
          { label: '女', id: 2 },
        ]
      ],
      birthdayShow: false,
      // minDate: new Date().getTime() - 100 * 365 * 12 * 30 * 24 * 60 * 60 * 1000
    }
  },

  computed: {
    genderValue() {
      const genderMap = ['', '男', '女']
      return genderMap[this.gender]
    }
  },

  onReady() {
    // 微信小程序需要用此写法
    this.$refs.datetimePicker.setFormatter(this.formatter)
  },

  methods: {
    handleGender({ value }) {
      this.gender = value[0].id
      this.genderShow = false
    },

    sendCode() {
      let that = this;

      if (this.mobile.length == 0) {
        uni.showModal({
          title: '错误信息',
          content: '手机号不能为空',
          showCancel: false
        });
        return false;
      }

      regCaptcha({
        mobile: this.mobile
      }).then(res => {
        if (res.data.errno == 0) {
          uni.showModal({
            title: '发送成功',
            content: '验证码已发送',
            showCancel: false
          });
        } else {
          uni.showModal({
            title: '错误信息',
            content: res.data.errmsg,
            showCancel: false
          });
        }
      })
    },

    requestRegister(wxCode) {
      let that = this;
      const { country, province, city } = this.userInfo
      register({
        username: that.username,
        password: that.password,
        mobile: that.mobile,
        code: that.code,
        wxCode: wxCode,
        birthday: this.birthday,
        country,
        province,
        city
      }).then(res => {
        console.log(res, '---ggg')
        if (res.data.errno == 0) {
          app.globalData.hasLogin = true;
          uni.setStorageSync('userInfo', res.data.data.userInfo);
          uni.setStorage({
            key: "token",
            data: res.data.data.token,
            success: function() {
              uni.switchTab({
                url: '/pages/ucenter/index/index'
              });
            }
          });
        } else {
          uni.showModal({
            title: '错误信息',
            content: res.data.errmsg,
            showCancel: false
          });
        }
      })
    },

    startRegister(e) {
      var that = this;
      this.userInfo = e.detail.userInfo
      if (this.password.length < 6 || this.username.length < 6) {
        uni.showModal({
          title: '错误信息',
          content: '用户名和密码不得少于6位',
          showCancel: false
        });
        return false;
      }

      if (this.password != this.confirmPassword) {
        uni.showModal({
          title: '错误信息',
          content: '确认密码不一致',
          showCancel: false
        });
        return false;
      }

      if (this.mobile.length == 0 || this.code.length == 0) {
        uni.showModal({
          title: '错误信息',
          content: '手机号和验证码不能为空',
          showCancel: false
        });
        return false;
      }

      uni.login({
        success: function(res) {
          if (!res.code) {
            uni.showModal({
              title: '错误信息',
              content: '注册失败',
              showCancel: false
            });
          }

          that.requestRegister(res.code);
        }
      });
    },

    formatter(type, value) {
      if (type === 'year') {
          return `${value}年`
      }
      if (type === 'month') {
          return `${value}月`
      }
      if (type === 'day') {
          return `${value}日`
      }
      return value
  },
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

</style>