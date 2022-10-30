<template>
	<view class="content">
		
		<view class="main">
			<view class="column heads">
				<view class="row head">
					<view class="title">图片</view>
					<view class="user-head" v-if="id==uid">
						<u-upload
							:fileList="fileList3"
							@afterRead="afterRead"
							@delete="deletePic"
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
				<view class="row">
					<view class="title">发布时间</view>
					<view class="cont">
						{{changeTime(new Date())}}
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
					<view class="lm">
						<view class="title">类目</view>
						<view class="cont">
							<picker @change="bindPickerChange" :value="index1" :range="array" v-if="id==uid">
								<view class="uni-input">{{array[index1]}}</view>
							</picker>
							<view class="uni-input" v-if="id!=uid">{{array[index]}}</view>
						</view>
						<!-- <view class="more" v-if="id==uid">
							<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
						</view> -->
					</view>
					
					<view class="lm">
						<view class="title">规格</view>
						<view class="cont">
							<picker @change="bindPickerChange2" :value="index2" :range="specification" v-if="id==uid">
								<view class="uni-input">{{specification[index2]}}</view>
							</picker>
							<view class="uni-input" v-if="id!=uid">{{array[index]}}</view>
						</view>
						<!-- <view class="more" v-if="id==uid">
							<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
						</view> -->
					</view>
				</view>
				
				
				<view class="row" @tap="get('tel',list.tel)">
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
		  <view class="os-remark__title">商品详情</view>
		  <view class="os-remark__content">
		    <u--textarea
		      v-model="remark"
		      placeholder="请输入留言信息"
		      count
			  :disabled=false
		      maxlength="50"
			  height='90'
		    ></u--textarea>
		  </view>
		</view>
			
			<view class="bt2" v-if="id==uid"@tap="toeditshare">保存商品</view>
			<view class="bt2" v-if="id!=uid"@tap="deleteFriend">联系买家</view>
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
	import myfunction from './myfunction.js'
	import { editShare,createShare} from '@/api/share'
	export default {
		data() {
			return {
				fileList3: [{
							url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						}],
				editable:'true',
				maxl:10,
				type:'',
				data:'',
				show: false,
				remark: '这里是商品详情这里是商品详情这里是商品详情',
				array: ['滞销', '共享', '未知'],
				index1: 0,
				index2: 0,
				specification:['金属', '不锈钢', '未知'],
				list:{
					'title':'商品标题',
					'tel':'13202125125'
				},
				
				token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGxpdGVtYWxsIHRva2VuIiwiYXVkIjoiTUlOSUFQUCIsImlzcyI6IkxJVEVNQUxMIiwiZXhwIjoxNjY2NjM5MjU2LCJ1c2VySWQiOjYsImlhdCI6MTY2NjYxNzY1Nn0.3LDrT2DyOOXYPeel8PWYvlEh3hJa_BrbgKhPQSoNUKc"
			};
		},
		onLoad(){
			
		},
		methods:{
			edit(){
				this.editable=false
			},
			get(type,e){
				let a={'title':30,'tel':11};
				this.show = true;
				this.data=e;
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
						this.list[type]=this.data
						this.close()
					},
			//处理时间
			changeTime:function(date){
				return myfunction.detailTime(date)
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
			toeditshare(){
				const data = {
				  id: 1,
				  exchange: 0,   //0提供货物1需求货物
				  category: '',
				  title: '',
				  gallery: '',
				  specification: '',
				  detail: '',
				  tel: '',
				  province:'',
				  city:'',
				  country:'',
				}
				editShare(data).then(res=>{
					console.log(res)
				})
			},
			tocreateshare(){
				const data = {
				  id: 1,
				  exchange: 0,   //0提供货物1需求货物
				  category: '',
				  title: '',
				  gallery: '',
				  specification: '',
				  detail: '',
				  tel: '',
				  province:'',
				  city:'',
				  country:'',
				}
				createShare(data).then(res=>{
					console.log(res)
				})
			},
			canceldingdan(){
				uni.navigateBack()
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.main {
		padding-top: 60rpx;
		padding-bottom: 90rpx;
		display: flex;
		flex-direction: column;
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
					flex:1;
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
				line-height: 112rpx;
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
				line-height: 112rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				.uni-input{
					font-size: 30rpx;
				}
				
			}

			.more {
				flex: none;
				height: 112rpx;
				display: flex;
				align-items: center;
				image {
					width: 80rpx;
					height: 28rpx;
				}
			}
		}

		.bt2 {
			margin-top: 50rpx;
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
		display: flex;
		margin-top: 20rpx;
		padding:0 20rpx;
		.f{
			flex:1;
			padding:0 20rpx;
		}
	}
	
</style>
