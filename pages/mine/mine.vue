// 个人中心
<template>
  <view class="contain">
    <view class="header">
      <view class="user-avatar">
        <img v-if="mineInfo.avatar" :src="mineInfo.avatar" alt="">
      </view>

      <view class="user-info">
        <view class="name" @click="toPage('/pages/login/perfectInfo')">{{ mineInfo.nickName }}</view>
        <view>{{ userLevelText }}</view>
      </view>
    </view>
    <view class="content">
      <view class="content-item" @click="toPage(`/pages/mine/bindMobile?mobile=${mineInfo.mobile}`)">
        <text class="item-label">绑定手机号</text>
        <text class="item-info">{{ mineInfo.mobile }}</text>
        <u-icon name="arrow-right"></u-icon>
      </view>
      <!-- <view class="content-item">
        <text class="item-label">登录微信号</text>
        <text class="item-info">sdfsdf</text>
        <u-icon name="arrow-right"></u-icon>
      </view> -->
      <view class="content-item" @click="toPage('/pages/mine/realName')">
        <text class="item-label">实名认证</text>
        <text class="item-info">{{ mineInfo.certify ? '已实名' : '未实名' }}</text>
        <u-icon name="arrow-right"></u-icon>
      </view>
      <view class="content-item" @click="toPage('/pages/address/list')">
        <text class="item-label">地址</text>
        <u-icon name="arrow-right"></u-icon>
      </view>
    </view>
    <view class="bottom">
      <view class="bottom-left">
        <u-button @click="handleLogout">退出</u-button>
      </view>
      <view class="bottom-right">
        <u-button type="primary" @click="handleSwitch">切换身份</u-button>
      </view>
    </view>

    <SwitchIdentity ref="identity" @success="val => userLevel = val"></SwitchIdentity>
  </view>
</template>

<script>
	import logger from '../../utils/logger';
	const app = getApp();
import { logout, bindPhone, fetchUserInfo, updateInfo } from '@/api/login'
import SwitchIdentity from '@/components/SwitchIdentity'

export default {
  components: {
		SwitchIdentity
  },
  
  data() {
    return {
      mineInfo: {
        avatar: '',
        nickName: '',
        mobile: '',
        province: '',
        city: '',
        certify: false
      },
      userLevel: 0
    }
  },

  computed: {
    userLevelText() {
			return this.userLevel === 0 
				? '游客' 
				: this.userLevel === 1
				? '供货商'
				: '采购商'
		}
  },

  onShow() {
    this.fetchUserInfo()
  },

  methods: {
    fetchUserInfo() {
      fetchUserInfo({}).then(res => {
        this.mineInfo = res.data
        this.userLevel = res.data.userLevel
      })
    },

    handleLogout() {
      logout().then(res => {
        uni.removeStorageSync('token');
        uni.removeStorageSync('userInfo');
        uni.navigateTo({
           url: '/pages/login/login'
        });
		this.quit()
      })
    },

    toPage(url) {
      console.log(url)
      uni.navigateTo({
         url: url
      });
    },

    handleSwitch() {
			this.$refs.identity.show()
		},
		//退出IM登录
		quit() {
			// TUIKit xxxx | mine | quit | xxxx
			logger.log('| TUI-User-Center | mine  | quit-logout ');
			uni.$TUIKit.logout().then(() => {
				uni.clearStorage();
				
			});
		},
  }
}
</script>

<style lang="scss" scoped>
.contain {
  
  .header {
    height: 200rpx;
    display: flex;
    align-items: center;
    padding-left: 24rpx;
    background: #fff;
    border-bottom: 1rpx solid #f6f6f6;

    .user-avatar {
      width: 110rpx;
      height: 110rpx;
      margin-left: 24rpx;
      margin-right: 32rpx;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user-info {
      font-size: 32rpx;

      .name {
        margin-bottom: 20rpx;
      }
    }
  }

  .content {
    background: #fff;

    .content-item {
      display: flex;
      align-items: center;
      padding: 24rpx 24rpx;
      border-bottom: 1rpx solid #f6f6f6;

      .item-label {
        flex: 1;
      }

      .item-info {
        margin-right: 10rpx;
      }

    }
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 80rpx 24rpx;

    .bottom-left {
      flex: 1;
      margin-right: 30rpx;
    }
    .bottom-right {
      flex: 2;
    }
  }
}
</style>