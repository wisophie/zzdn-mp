<template>
  <u-popup :show="visible" mode="center" closeable @close="close">
    <view class="identity-wrap">
      <view class="title">请选择要切换的身份</view>
      <view class="radio-group">
        <u-radio-group
          v-model="userLevel"
          placement="row"
        >
          <u-radio label="供货商" :name="1" :customStyle="{marginRight: '60rpx'}"></u-radio>
          <u-radio label="采购商" :name="2"></u-radio>
        </u-radio-group>
      </view>
      <view class="bottom">
        <u-button type="primary" @click="handleSwitch">确认切换</u-button>
      </view>
    </view>
  </u-popup>
</template>

<script>
import { fetchUserInfo, loginByAccount } from '@/api/login'
export default {
  data() {
    return {
      visible: false,
      userLevel: 0, // 0 游客，1 供货商，2 采购商
      userInfo: {}
    }
  },

  methods: {
    show() {
      this.visible = true
      this.userInfo = uni.getStorageSync('userInfo')
      this.userLevel = this.userInfo.userLevel
    },

    close() {
      this.visible = false
    },

    handleSwitch() {
      if (this.userLevel !== this.userInfo.userLevel) {
        const otherLevel = this.userInfo.otherLevel
        console.log('%c 【 otherLevel 】-46', 'font-size:14px; color:rgb(210, 110, 210);', this.userInfo)
        const item = otherLevel.find(item => item.userLevel === this.userLevel)
        if (item) {
          this.handleLogin(item)
          return
        } else {
          uni.showModal({
            title: '提示',
            content: `抱歉，你未成为${this.userLevel === 1 ? '供货商' : '采购商'}`,
            confirmText: '立即申请',
            success: (res) => {
              if (res.confirm) {
                uni.$u.route(this.userLevel === 1 ? '/pages/goods/provider' : '/pages/buyer/apply')
              } else {
                this.close()
              }
            }
          })
        }
        this.close()
      } else {
        uni.$u.toast('请选择您要切换的身份')
      }
    },

    fetchUserInfo(id){
      fetchUserInfo({
        id
      }).then(res => {
        uni.$u.toast('切换成功')
        this.$emit('success', this.userLevel)
        this.close()
      })
    },

    handleLogin(item) {
      loginByAccount({
        username: item.username,
        password: item.password,
        noPwd: true
      }).then(res => {
        uni.setStorageSync('token', res.data.token)
        this.fetchUserInfo(item.id)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.identity-wrap {
  width: 600rpx;

  .title {
    margin-top: 40rpx;
    text-align: center;
    font-size: 36rpx;
    color: #333;
  }

  .radio-group {
    margin: 80rpx;
  }

  .bottom {
    margin: 60rpx 40rpx 40rpx;
  }
}
</style>