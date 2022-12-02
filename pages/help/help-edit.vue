<template>
	<view class="content">
		
		<view class="main">
			<view class="column heads">
				
				<view class="row" >
					<view class="title">标题</view>
					<view class="cont" @tap="get('topic',list.item[0].topic)" >
						{{list.item[0].topic}}
					</view>
					<view class="more">
						<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
					</view>
				</view>
				<view class="row">
					<view class="title">选择地点</view>
					<view class="fff">
						<view class="form-item">
						  <uni-data-picker 
						    :localdata="addressOptions" 
						    :placeholder="defaultformData" 
						    popup-title="请选择"
						    :map="{text: 'name', value: 'code'}"
						    :clear-icon="false"
						    @change="onchange"
						  ></uni-data-picker>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="lm">
						<view class="title">交易类型</view>
						<view class="cont">
							<picker @change="bindPickerChange3" :value="index3" :range="exchangetype" v-if="id==uid">
								<view class="uni-input">{{exchangetype[index3]}}</view>
							</picker>
							<view class="uni-input" v-if="id!=uid">{{array[index]}}</view>
						</view>
						<!-- <view class="more" v-if="id==uid">
							<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
						</view> -->
					</view>
				</view>
				
			</view>
			<view class="column heads">
				<!-- <view class="row" @tap="modify('name','昵称',user.name,false)">
					<view class="title">明细</view>
					<view class="cont">
						{{list[0].detail}}
					</view>
					<view class="more">
						<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
					</view>
				</view> -->
				<view class="row cc">
					
					
				</view>
				<view class="row" >
					<view class="lm">
					<view class="title">总费用(元)</view>
					<!-- <view class="cont" @tap="get('amount',list.amount)" >
						{{list.amount}}
					</view> -->
					<u--input
					    placeholder="请输入价格"
						border="bottom"	
					    v-model="list.amount"
						maxlength='5'
					  ></u--input>
				  </view>
				</view>
				
				<view class="row" @tap="get('mobile',list.mobile)">
					<view class="title">联系方式</view>
					<view class="cont"   >
						{{list.mobile}}
					</view>
					<view class="more">
						<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
					</view>
				</view>
				
			</view>
		<view class="os-remark">
		  <view class="os-remark__title">任务内容</view>
		  <view class="os-remark__content">
		    <u--textarea
		      v-model="list.item[0].content"
		      placeholder="请输入内容信息"
		      count
			  :disabled=false
		      maxlength="300"
			  height='180'
		    ></u--textarea>
		  </view>
		</view>
			

			<view class="bt2"  @tap="toupdateHelp">保存商品</view>
			<view class="func">
				<view class="f">
					<u-button class="mt-4" type="primary" :plain="true" @click="canceldingdan">取消修改</u-button>
				</view>
				<view class="f">
					<u-button class="mt-4" type="primary" @click="tocreateHelp">发布任务</u-button>
				</view>
			</view>
		</view>
		
		<u-popup :show="show" @close="close" @open="open">
		 <view>
		  	<view class="modify-header">
		  		<view class="close" @tap="close">取消</view>
		  		<view class="title">修改</view>
		  		<view class="define" @tap="modify(type,data)">确定</view>
		  	</view>
		  	<view class="modify-main">
		  		<u--textarea
		  		  v-model="data"
		  		  placeholder="请输入留言信息"
		  		  count
		  		  :maxlength="maxl"
		  		  height='90'
		  		></u--textarea>
		  	</view>
		  </view>
		</u-popup>
		
	</view>
</template>

<script>
	import { createHelp,getHelpDetail,updateHelp} from '@/api/help'
	import { regionList } from '@/api/address'
	export default {
		data() {
			return {
				formData: {
				  province: '',
				  city: '',
				  country:'',
				},
				defaultformData:'选择地址',
				banner: [],
				editable:'true',
				maxl:10,
				type:'',
				data:'',
				show: false,
				remark: "sfsafsf",
				array: ['滞销货物', '共享信息', '未知'],
				index1: 0,
				index2: 0,
				index3: 0,
				extype:false,
				amount:'',
				exchangetype:['跑腿订单', '帮忙订单'],
				list:{
					item:[{
						topic:'任务标题',
						content:'',
					}],
					mobile:'输入手机号码',
					
				},
				addressOptions: [],
			};
		},
		onLoad(id){
			
			this.gethelpInfo(id)
		},
		created() {
		  
		  this.getRegionList()
		},
		methods:{
			getlist(id){
				console.log(id.id)
				if(id.city!==undefined){
				
				}else{
					
				}
				
				// const banners=id.gallery.split(",")
				// const temp =[{ url: 1 },{ url: 1 }]
				// this.banner= temp.map(((o, i) => ({ 
				// url: (i < banners.length) ? banners[i]  : ''})))
				
				
			},
			
				async gethelpInfo(item){
					console.log(item)
					if(item.id!=undefined){
					const params={
						orderId:item.id
					}
					let res =await getHelpDetail(params)
						this.list= res.data
						this.defaultformData=this.list.province+'/'+this.list.city
						console.log(this.list)
					}
			},
			
			// 删除图片
			// deletePic(event, key) {
			//      this.banner.splice(event.index,1)
			// },
			// 新增图片
			// async afterRead(event, key) {
				
			//   let lists = [].concat(event.file)
			//   let fileListLen = this.banner.length
			//   lists.map(item => {
			//     this.banner.push({
			//       ...item,
			//       status: 'uploading',
			//       message: '上传中'
			//     })
			//   })
			//   for (let i = 0; i < lists.length; i++) {
			//     let type = null
			//     uploadApi(lists[i].url, type)
			//       .then(res => {
			//         const result = res.data
			// 		console.log(result)
			//         let item = this.banner[fileListLen]
			//         this.banner.splice(
			//           fileListLen,
			//           1,
			//           Object.assign(item, {
			//             status: 'success',
			//             message: '',
			//             url: result
			//           })
			//         )
			//         fileListLen++
			//       })
			//       .catch(err => {
			//         this.banner.splice(
			//           fileListLen,
			//           1,
			//           Object.assign(item, {
			//             status: 'fail',
			//             message: '上传失败'
			//           })
			//         )
			//         fileListLen++
			//       })
			//   }
			// },
			getRegionList() {
			  regionList().then(res => {
			    this.addressOptions = res.data.list
			  })
			},
			onchange(e) {
			  console.log(e)
			  const { value } = e.detail
			  const addressType = ['province', 'city','country']
			  value.forEach((item, index) => {
			    if (addressType[index]) {
			      this.formData[addressType[index]] = item.text
			    }
			  })
			  console.log(this.formData)
			},
			
			edit(){
				this.editable=false
			},
			get(type,e){
				let a={'topic':20,'mobile':11};
				this.show = true;
				if(e=='任务标题' || e=='输入手机号码'){
					this.data='';
				}else{
					this.data=e;
				}
				this.type=type;
				this.maxl=a[type];
			},
			open() {
			         
			        },
			        close() {
			          this.show = false
			          // console.log('close');
			        },
					modify(type,data){
						if(type=='mobile'){
						  let result= uni.$u.test.mobile(this.data)
						   if(result==false){
							   uni.$u.toast('请输入正确的手机号码')
						   }else{
							   this.list[type]=this.data
							   this.close()
						   }
						}else if(type=='topic'){
							if(this.data==''){
								uni.$u.toast('标题不能为空')
							}else{
								this.list.item[0].topic=this.data
								this.close()
							}
							
						}
					},
			bindPickerChange: function(e) {
				this.index1 = e.target.value
				let sex='asexual';
				if(this.index1==0){
					sex='male'
				}else if(this.index1==1){
					sex='female';
				}
				},
				bindPickerChange2: function(e) {
					this.index2 = e.target.value
					let sex='asexual';
					if(this.index2==0){
						sex='male'
					}else if(this.index2==1){
						sex='female';
					}
				//this.update(sex,'sex')
			},
			bindPickerChange3: function(e) {
					this.index3 = e.target.value
					if(this.index3==0){
						this.extype=false
					}else if(this.index3==1){
						this.extype=true
					}
				console.log(this.index3)
			},
			toupdateHelp(){
				console.log(this.list.id)
				if(this.list.city==''){
					uni.$u.toast('请选择发布地点！')
				}else if(this.list.item[0].topic=='任务标题'){
					uni.$u.toast('输入标题！')
				}else if(this.list.amount==undefined){
					uni.$u.toast('请输入价格！')
				}else if(this.list.mobile=='输入手机号码'){
					uni.$u.toast('请输入手机号码！')
				}else if(this.list.item[0].content==''){
					uni.$u.toast('请输入任务详情！')
				}else{
					const data = {
					  id:this.list.id,
					  orderType:this.index3,   //订单类型0跑腿订单 1帮忙订单	
					  topic: this.list.item[0].topic,
					  content: this.list.item[0].content,
					  amount:this.list.amount,
					  mobile: this.list.mobile,
					  // province:this.formData.province,
					  // city:this.formData.city,
					  // country:this.formData.country,
					}
					console.log(data)
					updateHelp(data).then(res=>{
						console.log(res)
						if(res.errmsg=='成功'){
							uni.$u.toast('更新成功！')
							this.canceldingdan()
						}
						
					})
					
				}
				
			},
			tocreateHelp(){
				console.log(this.list)
				if(this.formData.city==''){
					uni.$u.toast('请选择发布地点！')
				}else if(this.list.item[0].topic=='任务标题'){
					uni.$u.toast('输入标题！')
				}else if(this.list.amount==undefined){
					uni.$u.toast('请输入价格！')
				}else if(this.list.mobile=='输入手机号码'){
					uni.$u.toast('请输入手机号码！')
				}else if(this.list.item[0].content==''){
					uni.$u.toast('请输入任务详情！')
				}else{
					const data = {
					  orderType: this.index3,   //订单类型0跑腿订单 1帮忙订单	
					  topic: this.list.item[0].topic,
					  content: this.list.item[0].content,
					  amount:this.list.amount,
					  mobile: this.list.mobile,
					  province:this.formData.province,
					  city:this.formData.city,
					  country:this.formData.country,
					}
					createHelp(data).then(res=>{
						console.log(res)
						if(res.errmsg=='成功'){
							uni.$u.toast('发布成功！')
							this.canceldingdan()
						}
						
					})
					
				}
				
			},
			canceldingdan(){
				uni.navigateTo({
					url:'/pages/help/help-list',
				})
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
.main {
		padding-top: 60rpx;
		padding-bottom: 360rpx;
		display: flex;
		flex-direction: column;
		height:100vh;
        background-color: #fff;
		.column {
			display: flex;
			flex-direction: column;
			//border:1px solid red;
			border-bottom: 1px dashed #ccc;
			margin:0 40rpx;
			
			.row {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.lm{
					display: flex;
					flex:0.62;
					flex-direction: row;
					.cont{
						margin-left: 80rpx;
						
					}
				}
			}

			.title {
				flex: none;
				// flex: auto;
				//padding: 0 40rpx;
				font-size: 32rpx;
				font-weight: 520;
				color: #333;
				line-height: 80rpx;
			}

			.user-head {
				flex: auto;
				margin-left:40rpx;
			}

			.head {
				height: 148rpx;
				display: flex;
				align-items: center;
			}

			.user-img {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10rpx;
			}

			.cont {
				flex: auto;
				// display: flex;
				// align-items: center;
				margin-left: 40rpx;
				font-size: 30rpx;
				color: gray;
				line-height: 80rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				.uni-input{
					font-size: 30rpx;
				}
				
				
			}

			.more {
				flex: none;
				height: 80rpx;
				display: flex;
				align-items: center;
				image {
					width: 80rpx;
					height: 28rpx;
				}
			}
		}

		.bt2 {
			position:fixed;
			left:320rpx;
			bottom:150rpx;
			text-align: center;
			font-size: 32rpx;
			color: $uni-color-error;
			line-height: 88rpx;
		}
	}
	
	.os-remark {
		padding: 0px 40rpx;
	  &__title {
	    padding: 12px 0rpx;
		font-size:32rpx;
	    color: #333;
	  }
	  
	}

		.modify-header{
			width: 100%;
			height: 88rpx;
			display:flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1px solid $uni-border-color;
			background-color: #5555ff;
			.close{
				padding-left:32rpx;
				font-size:32rpx;
				color: #fff;
				line-height: 44rpx;
			}
			.title{
				flex:auto;
				text-align: center;
				font-size:40rpx;
				color: #fff;
				line-height: 88rpx;
			}
			.define{
				padding-right:32rpx;
				font-size:32rpx;
				color: #fff;
				line-height: 44rpx;
			}
		}
		.modify-main{
			display: flex;
			padding: $uni-spacing-col-base;
			flex-direction: column;
			
			.modify-pwd{
				flex: auto;
				margin-bottom: $uni-spacing-col-base;
				padding: 0 20rpx;
				height:88rpx;
				box-sizing: border-box;
				background: $uni-border-color;
				border-radius: $uni-border-radius-base;
				font-size:32rpx;
				color: $uni-text-color;
				line-height: 88rpx;
			}
			
		}
	.func{
		position:fixed;
		display: flex;
		bottom:70rpx;
		padding:0 20rpx;
		width:100%;
		.f{
			flex:1;
			padding:0 20rpx;
		}
	}
	.fff{
		display: flex;
		align-items: center;
		position: absolute;
		top:150rpx;
		left:230rpx;
		 
	}
	.form-item {
	  position: relative;
	  background: #fff;
	  height: 56rpx;
	  //border-bottom: 1px solid #d9d9d9;
	
	}
	
	.form-item .username, .form-item .password, .form-item .mobile, .form-item .code {
	  position: absolute;
	  top: 26rpx;
	  left: 0rpx;
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
	  //border: 1px solid #d9d9d9;
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
</style>
