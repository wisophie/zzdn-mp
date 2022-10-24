<template>
  <view class="content">
    <u-form labelPosition="left" :model="form" :rules="rules" ref="formRef" labelWidth="80">
      <view class="form-section">企业信息</view>
      <u-form-item label="公司名称" prop="val1" borderBottom>
        <u-input v-model="form.val1" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="机构代码" prop="val2" borderBottom>
        <u-input v-model="form.val2" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="公司地址" prop="val3" borderBottom>
        <u-input v-model="form.val3" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="联系方式" prop="val4" borderBottom>
        <u-input v-model="form.val4" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <u-form-item label="公司邮箱" prop="val5" borderBottom>
        <u-input v-model="form.val5" border="none" placeholder="请输入"></u-input>
      </u-form-item>
      <view class="form-section">营业执照</view>
      <view>
        <u-upload
          :fileList="fileList1"
          :maxCount="1"
					width="160"
					height="100"
          @afterRead="afterRead"
          @delete="deletePic"
        ></u-upload>
      </view>

      <view class="form-section">法人/经营者证件</view>
      <view class="u-flex u-flex-x-center">
        <u-upload
          :fileList="fileList1"
          :maxCount="1"
					width="160"
					height="100"
          @afterRead="afterRead"
          @delete="deletePic"
        ></u-upload>
        <u-upload
          :fileList="fileList1"
          :maxCount="1"
					width="160"
					height="100"
          @afterRead="afterRead"
          @delete="deletePic"
        ></u-upload>
      </view>

      <view class="form-section">办公环境/厂房照片(非必填)</view>
      <view>
        <u-upload
          :fileList="fileList1"
					width="160"
					height="100"
          multiple
          :maxCount="4"
          @delete="deletePic"
          @afterRead="afterRead"
        ></u-upload>
      </view>
      <view class="form-section">网店后台界面(非必填)</view>
      <view>
        <u-upload
          :fileList="fileList1"
					width="160"
					height="100"
          :maxCount="4"
          multiple
          @delete="deletePic"
          @afterRead="afterRead"
        ></u-upload>
      </view>
      <view class="py-4">
        <u--text type="warning" text="点击此处查看《入驻协议》"></u--text>
      </view>
    </u-form>
    <base-footer>
      <view class="u-flex-fill px-4 pt-1">
        <u-button type="primary" text="提交"></u-button>
      </view>
    </base-footer>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        val1: '',
        val2: '',
        val3: '',
        val4: '',
        val5: ''
      },
      rules: {}
    }
  },
  onReady() {
    this.$refs.formRef.setRules(this.rules)
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1)
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = this[`fileList${event.name}`].length
      lists.map(item => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this[`fileList${event.name}`][fileListLen]
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: 'success',
            message: '',
            url: result
          })
        )
        fileListLen++
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
          filePath: url,
          name: 'file',
          formData: {
            user: 'test'
          },
          success: res => {
            setTimeout(() => {
              resolve(res.data.data)
            }, 1000)
          }
        })
      })
    }
  }
}
</script>

<style>
page {
  background-color: #fff;
}
</style>

<style lang="scss" scoped>
.content {
  padding: 0 32rpx;
}
.form-section {
  position: relative;
  padding: 16rpx 0 16rpx 24rpx;
  font-size: 16px;
  font-weight: 600;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    height: 44%;
    width: 3px;
    background: $u-primary;
    transform: translateY(-50%);
    border-radius: 2px;
  }
}
</style>
