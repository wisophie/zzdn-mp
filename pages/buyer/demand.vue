<template>
  <view class="container">
    <u-form labelPosition="top" :model="form" :rules="rules" ref="formRef" labelWidth="120">
      <u-form-item label="商品名" prop="goodsName" borderBottom>
        <u-input v-model="form.goodsName" border="none" placeholder="请输入" :readonly="isDetail"></u-input>
      </u-form-item>
      <u-form-item label="材质" prop="texture" borderBottom>
        <u-input v-model="form.texture" border="none" placeholder="请输入" :readonly="isDetail"></u-input>
      </u-form-item>
      <u-form-item label="规格" prop="specification" borderBottom>
        <u-input v-model="form.specification" border="none" placeholder="请输入" :readonly="isDetail"></u-input>
      </u-form-item>
      <u-form-item label="需求数量" prop="num" borderBottom>
        <u-input v-model="form.num" border="none" placeholder="请输入" type="number" :readonly="isDetail"></u-input>
      </u-form-item>
      <u-form-item label="工期（日）" prop="duration" borderBottom>
        <u-input v-model="form.duration" border="none" placeholder="请输入" type="number" :readonly="isDetail"></u-input>
      </u-form-item>
      <u-form-item label="其他要求" prop="extra" borderBottom>
        <u-input v-model="form.extra" border="none" placeholder="请输入" :readonly="isDetail"></u-input>
      </u-form-item>
    </u-form>

    <view class="bottom">
      <u-button v-if="!isDetail" type="primary" @click="handleSubmit">提交</u-button>
      <u-button v-else type="primary" @click="handleConnect">在线沟通</u-button>
    </view>
  </view>
</template>

<script>
import { buyNeedCreate, buyNeedDetail, buyNeedUpdate } from '@/api/goods'

export default {
  data() {
    return {
      form: {
        goodsName: '',
        texture: '',
        specification: '',
        num: '',
        duration: '',
        extra: ''
      },
      rules: {},
      isDetail: false
    }
  },

  onLoad({id, detail}) {
    if (id) {
      this.form.id = id
      this.fetchDetail(id)
      this.isDetail = +detail === 1
    }
  },

  methods: {
    fetchDetail(id) {
      buyNeedDetail({
        id
      }).then(res => {
        const data = res.data
        for(let key in this.form) {
          if (data[key]) {
            this.form[key] = data[key]
          }
        }
      })
    },

    handleSubmit() {
      const isEdit = !!this.form.id
      const requestFunc = isEdit ? buyNeedUpdate : buyNeedCreate
      requestFunc(this.form).then(res => {
        if (isEdit) {
          uni.navigateBack({
             delta: 1
          });
        } else {
          uni.redirectTo({
             url: '/pages/buyer/list'
          });
        }
      })
    },

    handleConnect() {
      if (!uni.getStorageSync('token')) {
        uni.navigateTo({
					 url: '/pages/login/login'
				})
				return
      }
      const id =this.form.userId
      const url = `/pages_chat/chat?conversationID=C2C${id}`;
      uni.navigateTo({
        url
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx 32rpx 160rpx;

  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 40rpx;
    background: #fff;
  }
}
</style>