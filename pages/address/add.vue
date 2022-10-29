<template>
  <view class="container">
    <u--form labelWidth="88px">
      <u-form-item label="联系人" borderBottom>
        <u-input v-model="formData.name" placeholder="请填写联系人姓名" border="none"></u-input>
      </u-form-item>
      <u-form-item label="手机号码" borderBottom>
        <u-input v-model="formData.tel" placeholder="请输入收货人手机号码" border="none" type="number"></u-input>
      </u-form-item>
      <u-form-item label="收货地址" borderBottom>
        <!-- <view v-if="addressText" class="picker" @click="handlePickerAddress">
          <u-input :value="addressText" placeholder="请选择所属省市区等" border="none" readonly ></u-input>
        </view> -->
        <uni-data-picker 
          ref="picker"
          :localdata="addressOptions" 
          :placeholder="addressText ? addressText : '请选择所属省市区等'" 
          popup-title="请选择"
          :map="{text: 'name', value: 'code'}"
          :clear-icon="false"
          @change="onchange"
        ></uni-data-picker>
      </u-form-item>
      <u-form-item label="详细地址" borderBottom>
        <u-input v-model="formData.addressDetail" placeholder="例如：人民街道1号楼202室" border="none"></u-input>
      </u-form-item>
      <u-form-item label="设置为默认地址" borderBottom labelWidth="120px">
        <u-switch v-model="formData.isDefault"></u-switch>
      </u-form-item>
      <view class="tips">在下单时将优先使用默认地址，避免下单时使用错误地址</view>
      
    </u--form>

    <view class="bottom">
      <u-button type="primary" @click="handleSubmit">提交</u-button>
    </view>
  </view>
</template>

<script>
import { regionList, regionQueryByPid, addressDetail, addressSave } from '@/api/address'

export default {
  data() {
    return {
      addressOptions: [],
      regionTarget: {},
      formData: {
        name: '',
        tel: '',
        isDefault: false,
        province: '',
        city: '',
        county: '',
        areaCode: '',
        addressDetail: ''
      }
    }
  },

  computed: {
    addressText() {
      const { province, city, county } = this.formData
      if (province && city && county) {
        return `${province}/${city}/${county}`
      }
      return ''
    }
  },

  created() {
    this.getRegionList()
  },

  onLoad(options) {
    if (options.id) {
      this.formData.id = options.id
      this.fetchAddressDetail(options.id)
    }
  },

  methods: {
    getRegionList() {
      regionList().then(res => {
        this.addressOptions = res.data.list
      })
    },

    fetchAddressDetail(id) {
      addressDetail({
        id
      }).then(res => {
        const data = res.data
        for (let key in this.formData) {
          if (data[key]) {
            this.formData[key] = data[key]
          }
        }
      })
    },

    handlePickerAddress() {
      console.log('gg')
      this.$refs.picker.show()
    },

    onchange(e) {
      const { value } = e.detail
      console.log(value)
      const addressType = ['province', 'city', 'county'] 
      value.forEach((item, index) => {
        if (addressType[index]) {
          this.formData[addressType[index]] = item.text
          if (addressType[index] === 'county') {
            this.formData.areaCode = item.value
          }
        }
      })
    },

    handleSubmit() {
      addressSave(this.formData).then(() => {
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
  padding: 20rpx 20rpx 120rpx;

  /deep/ {
    .input-value-border {
      padding: 0;
      border: none;
    }

    .selected-area.placeholder {
      font-size: 32rpx;
    }
  }

  // .picker {
  //   position: fixed;
  //   left: -100%;
  //   z-index: 100;
  // }

  .tips {
    margin-top: 20rpx;
    color: #666;
    font-size: 24rpx;
    line-height: 1.2;
  }

  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 40rpx;
    background: #fff;
  }
}
</style>