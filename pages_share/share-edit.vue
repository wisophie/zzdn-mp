<template>
	<view class="content">
		
		<view class="main">
			<view class="column heads">
					<view class="bannerline" v-if="list.category==undefined">
						<view class="bannerlinem" >
							<view class="meal" v-for="(item,index) in array" :key="index" @click="clickmeal(index)" :class="{active1:index1==index}"><a class="t">{{item}}</a></view>
						</view>
					</view>
					<view class="row" v-if="list.category!==undefined">
						<view class="title l">类目</view>
						<view class="cont leimu l">
							{{list.category}}
						</view>
					</view>
					<!-- <view class="more" v-if="id==uid">
						<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
					</view> -->
			
				<view class="row head">
					<view class="title">图片</view>
					<view class="user-head" v-if="id==uid">
						<u-upload
							:fileList="banner"
							@afterRead="afterRead($event)"
							@delete="deletePic($event, 'url')"
							name="3"
							multiple
							:maxCount="2"
							:previewFullImage="true"
						></u-upload>
					</view>
					
				</view>
				<view class="row" >
					<view class="title">标题</view>
					<view class="cont" @tap="get('title',list.title)" >
						{{list.title}}
					</view>
					<view class="more">
						<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
					</view>
				</view>
				<view class="row" v-if="index1==0">
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
				<view class="row" v-if="index1==0">
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
			<view class="column heads"  v-if="index1==0">
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
					
					
					<view class="lm" >
						<view class="title">规格</view>
						<!-- <view class="cont">
							<picker @change="bindPickerChange2" :value="index2" :range="specification" v-if="id==uid">
								<view class="uni-input">{{specification[index2]}}</view>
							</picker>
							<view class="uni-input" v-if="id!=uid">{{array[index]}}</view>
							
						</view> -->
						<u--input
						    placeholder="请输入规格"
							border="bottom"
							maxlength='20'
							color='#a8a8a8'
						    v-model="list.specification"
						  ></u--input>
						<!-- <view class="more" v-if="id==uid">
							<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
						</view> -->
					</view>
				</view>
				
				
				<view class="row" v-if="index1==0" @tap="get('tel',list.tel)">
					<view class="title">联系方式</view>
					<view class="cont"   >
						{{list.tel}}
					</view>
					<view class="more">
						<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
					</view>
				</view>
				
			</view>
		<view class="os-remark">
		  <view class="os-remark__title">详情</view>
		  <view class="os-remark__content">
		    <u--textarea
		      v-model="list.detail"
		      placeholder="请输入详情"
		      count
			  :disabled=false
		      maxlength="300"
			  height='180'
		    ></u--textarea>
		  </view>
		</view>
			
			<view class="bt2"  @tap="toeditshare">保存商品</view>
			<view class="func">
				<view class="f">
					<u-button class="mt-4" type="primary" :plain="true" @click="canceldingdan">取消修改</u-button>
				</view>
				<view class="f">
					<u-button class="mt-4" type="primary" @click="tocreateshare">发布商品</u-button>
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
		  		  placeholder="请输入内容"
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
	import { uploadApi } from '@/api/common'
	import { editShare,createShare} from '@/api/share'
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
				array: ['滞销', '共享'],
				index1: 0,
				index2: 0,
				index3: 0,
				extype:false,
				exchangetype:['提供货物', '需求货物'],
				list:{
					title:'输入标题',
					tel:'输入手机号码',
					detail:'',
					specification:'默认规格',
					//category:'滞销'
				},
				addressOptions: [],
			};
		},
		onLoad(id){
			
			this.getlist(id)
			
		},
		created() {
		  this.getRegionList()
		  
		},
		methods:{
			clickmeal(e){
				this.index1=e;		
			},
			getlist(id){
				console.log(id)
				const banners=id.gallery.split(",")
				const temp =[{ url: 1 },{ url: 1 }]
				this.banner= temp.map(((o, i) => ({ 
				url: banners[i]})))
				if(id.city!==undefined){
					this.list = id
					this.defaultformData=this.list.province+'/'+this.list.city+'/'+this.list.country
					if(this.list.category=='共享'){
						this.index1=1
					}
				}else{
					
				}
				if(this.banner[1].url==undefined){
					this.banner.pop()
				}
				console.log(this.list)
			},
			// 删除图片
			deletePic(event, key) {
			     this.banner.splice(event.index,1)
			},
			// 新增图片
			async afterRead(event, key) {
				
			  let lists = [].concat(event.file)
			  let fileListLen = this.banner.length
			  lists.map(item => {
			    this.banner.push({
			      ...item,
			      status: 'uploading',
			      message: '上传中'
			    })
			  })
			  for (let i = 0; i < lists.length; i++) {
			    let type = null
			    uploadApi(lists[i].url, type)
			      .then(res => {
			        const result = res.data
					console.log(result)
			        let item = this.banner[fileListLen]
			        this.banner.splice(
			          fileListLen,
			          1,
			          Object.assign(item, {
			            status: 'success',
			            message: '',
			            url: result
			          })
			        )
			        fileListLen++
			      })
			      .catch(err => {
			        this.banner.splice(
			          fileListLen,
			          1,
			          Object.assign(item, {
			            status: 'fail',
			            message: '上传失败'
			          })
			        )
			        fileListLen++
			      })
			  }
			},
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
				let a={'title':20,'tel':11};
				this.show = true;
				if(e=='输入标题' || e=='输入手机号码'){
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
						if(type=='tel'){
						  let result= uni.$u.test.mobile(this.data)
						   if(result==false){
							   uni.$u.toast('请输入正确的手机号码')
						   }else{
							   this.list[type]=this.data
							   this.close()
						   }
						}else if(type=='title'){
							if(this.data==''){
								uni.$u.toast('标题不能为空')
							}else{
								this.list[type]=this.data
								this.close()
							}
							
						}
						
						// this.list[type]=this.data
						// this.close()
					},
			bindPickerChange: function(e) {
				this.index1 = e.target.value
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
			toeditshare(){
				this.list.gallery=[]
				this.banner.map(e=>{this.list.gallery.push(e.url)})
				if(this.list.gallery.length==0){
					uni.$u.toast('请上传至少一张图片！')
				}else if(this.index1==0&&this.list.city==''){
					uni.$u.toast('请选择发布地点！')
				}else if(this.index1==0&&this.list.tel=='输入手机号码'){
					uni.$u.toast('请输入正确的手机号码！')
				}else if(this.list.detail==''){
					uni.$u.toast('请输入详情！')
				}else{
					const data = {
					  id: this.list.id,
					  exchange: this.extype,   //0提供货物1需求货物
					  category: this.list.category||'滞销',
					  title: this.list.title,
					  gallery: this.list.gallery.toString(),
					  specification: this.list.specification,
					  detail: this.list.detail,
					  tel: this.list.tel,
					  province:this.list.province,
					  city:this.list.city,
					  country:this.list.country,
					}
					editShare(data).then(res=>{
						if(res.errmsg=='成功'){
							uni.$u.toast('保存成功！')
							uni.setStorageSync("currentIndex", 1)
							this.canceldingdan()
						}
					})
				}
				
			},
			tocreateshare(){
				this.list.gallery=[]
				this.banner.map(e=>{this.list.gallery.push(e.url)})
				console.log(this.list.tel)
				if(this.list.gallery.length==0){
					uni.$u.toast('请上传至少一张图片！')
				}else if(this.list.title=='输入标题'){
					uni.$u.toast('请输入标题！')
				}else if(this.index1==0&&this.formData.city==''){
					uni.$u.toast('请选择发布地点！')
				}else if(this.index1==0&&this.list.tel=='输入手机号码'){
					uni.$u.toast('请输入正确的手机号码！')
				}else if(this.list.detail==''){
					uni.$u.toast('请输入详情！')
				}else{
					const data = {
					  exchange: this.extype,   //0提供货物1需求货物
					  category: this.array[this.index1],
					  title: this.list.title,
					  gallery: this.list.gallery.toString(),
					  specification: this.list.specification,
					  detail: this.list.detail,
					  tel: this.list.tel,
					  province:this.formData.province,
					  city:this.formData.city,
					  country:this.formData.country,
					}
					createShare(data).then(res=>{
						if(res.errmsg=='成功'){
							uni.$u.toast('发布成功！')
							uni.setStorageSync("currentIndex", 1)
							this.canceldingdan()
						}
						
					})
				}
				
				
			},
			canceldingdan(){
				uni.setStorageSync("currentIndex", 1)
				uni.switchTab({
					url:'/pages/share/share',
				})
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
.main {
		padding-top: 5rpx;
		padding-bottom: 320rpx;
		display: flex;
		flex-direction: column;
        background-color: #fff;
		height:100vh;
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
			.l{
				height: 105rpx;
			}
.leimu{
				color:#5555ff;
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
		.bt2 {
			position:fixed;
			left:320rpx;
			bottom:150rpx;
			text-align: center;
			font-size: 32rpx;
			color: $uni-color-error;
			line-height: 88rpx;
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
		top:345rpx;
		left:240rpx;
		 
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
	.bannerline {
	    height: 45px;
	    // border-bottom: 1px solid #edeef0;
	    // border-top: 1px solid #edeef0;
	    background-color: #dfdfdf;
	    line-height: 45px;
		//border:1px solid red;
		text-align: center;
		color:#afafaf;
		margin-bottom: 25rpx;
	}
	
	
	.bannerline .bannerlinem {
		display:flex;
	   justify-content: space-between;
	   .meal{
		flex:1;
		
	   }
	}
	.active1 {
	    background-color: #ffffff;
		.t{
			//padding-bottom:10rpx;
			//border-bottom:1px solid #5555ff;
			color:#5555ff;
			//border:1px solid red;
		}
	}
	
</style>
