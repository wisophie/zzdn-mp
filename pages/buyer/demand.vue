<template>
  <view class="container">
    <u-form labelPosition="top" :model="form" :rules="rules" ref="formRef" labelWidth="120">
      <u-form-item label="商品名" prop="goodsName" borderBottom>
        <u-input v-model="form.goodsName" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="材质" prop="texture" borderBottom>
        <u-input v-model="form.texture" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="规格" prop="specification" borderBottom>
        <u-input v-model="form.specification" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="需求数量" prop="num" borderBottom>
        <u-input v-model="form.num" border="none" placeholder="请输入" type="number"></u-input>
      </u-form-item>
      <u-form-item label="工期" prop="duration" borderBottom>
        <u-input v-model="form.duration" border="none" placeholder="请输入" type="number"></u-input>
      </u-form-item>
      <u-form-item label="其他要求" prop="extra" borderBottom>
        <u-input v-model="form.extra" border="none" placeholder="请输入"></u-input>
      </u-form-item>
    </u-form>

    <view class="bottom">
      <u-button type="primary" @click="handleSubmit">提交</u-button>
    </view>
  </view>
</template>

<script>
import { buyNeedCreate } from '@/api/goods'

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
      rules: {}
    }
  },

  methods: {
    handleSubmit() {
      buyNeedCreate(this.form).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {

  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 40rpx;
    background: #fff;
  }
}
</style>