<template>
	<view class="content">
		
	
		<view class="main">
			<view class="column heads">
				
				<view class="row" >
					<view class="title b">标题</view>
					<view class="cont b" @tap="get('topic',list.topic)" >
						{{list.topic}}
					</view>
					<view class="more b">
						<view class="os-addr-box__arrow"><u-icon name="arrow-right" color="#000" size="18" /></view>
					</view>
					
				</view>
				
				<view class="row head pic">
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
				<view class='text-ml name'>
						 <text >发布人：{{myusername}}</text>
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
						<view class="title">投票类型</view>
						<view class="cont">
							<picker @change="bindPickerChange" :value="index1" :range="array" v-if="id==uid">
								<view class="uni-input">{{array[index1]}}</view>
							</picker>
							<view class="uni-input" v-if="id!=uid">{{array[index]}}</view>
						</view>
						
					</view>
					<view class="lm" v-if='index1==0'>
						<text class="d">订单id</text>
						<u--input
						    placeholder="请输入订单id"
							border="bottom"	
						    v-model="list.orderId"
						    @change="change"
						  ></u--input>
					</view>
					
				</view>
				<view class="row">
					<view class="title">反馈类目</view>
					<view class="cont">
						{{fdtype}}
					</view>
				</view>
				
			</view>
		<view class="os-remark">
		  <view class="os-remark__title">反馈详情</view>
		  <view class="os-remark__content">
		    <u--textarea
		      v-model="list.progress"
		      placeholder="请输入留言信息"
		      count
			  :disabled=false
		      maxlength="50"
			  height='90'
		    ></u--textarea>
		  </view>
		  <view v-if='index1==1'>
			<u-form labelPosition="left" :model="form" :rules="rules" ref="formRef" >
		  	<u-form-item label="投票项一" prop="one" borderBottom>
		  	  <u-input v-model="form.one" border="none" placeholder="请输入"></u-input>
		  	</u-form-item>
		  	<u-form-item label="投票项二" prop="two" borderBottom>
		  	  <u-input v-model="form.two" border="none" placeholder="请输入"></u-input>
		  	</u-form-item>
		  	<u-form-item label="投票项三" prop="three" borderBottom>
		  	  <u-input v-model="form.three" border="none" placeholder="请输入"></u-input>
		  	</u-form-item>
		  	<u-form-item label="投票项四" prop="four" borderBottom>
		  	  <u-input v-model="form.four" border="none" placeholder="请输入"></u-input>
		  	</u-form-item>
			</u-form>
		  </view>
		  <view class="bt2" v-if="id==uid"@tap="toeditVote">保存修改</view>
		  <view class="func">
		  	
		  	<view class="f">
		  		<u-button class="mt-4" type="primary" :plain="true" @click="backdingdan">取消修改</u-button>
		  	</view>
		  	<view class="f">
		  		<u-button class="mt-4" type="primary" @click="tocreateVote">发布投票</u-button>
		  	</view>
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
	import { uploadApi } from '@/api/common'
	import { createVote,editVote,getVoteDetail} from '@/api/vote'
	export default {
		data() {
			return {
				fdtype:'订单纠纷问题',
				editable:'true',
				maxl:10,
				type:'',
				data:'',
				show: false,
				array: ['订单纠纷', '意见反馈'],
				index1: 0,
				index2: 0,
				list:{
					topic:'反馈标题',
					progress:'反馈内容',
					orderId:0,
				},
				form:{
					one:'',
					two:'',
					three:'',
					four:'',
				},
				banner:[],
				myusername:'',
				optionsubmit:[{
						content:'0',
					},{
						content:'1',
					}
					],
				rules: {
					'one': {
						type: 'string',
						required: true,
						message: '请填写至少2项投票内容',
						trigger: ['blur', 'change']
					},
					'two': {
						type: 'string',
						required: true,
						message: '请填写至少2项投票内容',
						trigger: ['blur', 'change']
					},
								
				},
			};
		},
		onLoad(id){
			this.togetVoteDetail(id);
		},
		onReady() {
				//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
		    	//this.$refs.formRef.setRules(this.rules)
		    },
		computed:{
			cid(){
			  this.myusername=uni.getStorageSync('userInfo').username
			  
			},
		},
		methods:{
			//还要修改
			togetpics(item){
				if(item.pics==undefined){
				}else{
					const banners=item.pics.split(",")
					const temp =[{ url: 1 },{ url: 1 }]
					this.banner= temp.map(((o, i) => ({ 
					url: banners[i]})))
					
					if(this.banner[1].url==undefined){
						this.banner.pop()
					}
					
				}
			},
			togetVoteDetail(item){
				
				const params={
					id:item.id
				}
				if(item.id!=undefined){
					getVoteDetail(params).then(res=>{
						console.log(res.data)
						this.list = res.data
						this.index1=this.list.type
						this.extype={'0':'订单纠纷','1':'意见反馈'}[this.list.type]
						if(this.index1==1){
							this.form.one=this.list.options[0].content
							this.form.two=this.list.options[1].content
							this.form.three=this.list.options[2].content
							this.form.four=this.list.options[3].content
						}
						
					})
					this.togetpics(item)
					console.log(parseInt(this.list.orderId))
				}
				
			},
			tocreateVote(){
				console.log(parseInt(this.list.orderId))
				console.log(this.index1)
				console.log(this.optionsubmit)
				this.list.pics=[]
				this.banner.map(e=>{this.list.pics.push(e.url)})
				if(this.index1==1){
					this.optionsubmit=[{
						content:this.form.one,
					},{
						content:this.form.two,
					},{
						content:this.form.three,
					},{
						content:this.form.four,
					}
					]
				}
				const data={
					orderId:parseInt(this.list.orderId),
					progress:this.list.progress,
					topic:this.list.topic,
					feedbackType:this.fdtype,  //订单纠纷
					pics:this.list.pics.toString(),
					type:this.index1,
					options:this.optionsubmit,
				}
				createVote(data).then(res=>{
					console.log(res)
					if(res.errmsg=='成功'){
						uni.$u.toast('发布成功！')
						this.canceldingdan()
					}
					
					
				})
			},
			toeditVote(){
				const data={
					id:parseInt(this.list.id),
					orderId:parseInt(this.list.orderId),
					progress:this.list.progress,
					topic:this.list.topic,
					feedbackType:this.fdtype,
					pics:this.list.pics.toString(),
					type:this.index1,
					options:this.optionsubmit,
				}
				
				editVote(data).then(res=>{
					console.log(res)
					if(res.errmsg=='成功'){
						uni.$u.toast('保存成功！')
						this.canceldingdan()
					}
				})
			},
			edit(){
				this.editable=false
			},
			get(type,e){
				let a={'title':50,'tel':11};
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
			bindPickerChange: function(e) {
				this.index1 = e.target.value
				
				if(this.index1==0){
					this.fdtype='订单纠纷问题';
					this.optionsubmit=[{
						content:'0',
					},{
						content:'1',
					}
					]
				}else if(this.index1==1){
					this.fdtype='功能不完善';
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
			canceldingdan(){
				uni.switchTab({
					url:'/pages/platform/platform',
				})
			},
			backdingdan(){
				uni.navigateBack()
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		height:100vh;
		background-color: #fff;
	}
.main {
		padding-top: 30rpx;
		
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
						margin-left: 40rpx;
						
					}
				}
				.d{
					font-size: 30rpx;
					text-align: center;
					line-height: 70rpx;
				}
			}

			.title {
				flex: none;
				// flex: auto;
				//padding: 0 40rpx;
				font-size: 30rpx;
				font-weight: 520;
				color: #333;
				line-height: 70rpx;
			}
			

			.user-head {
				flex: auto;
				margin-left:40rpx;
			}

			.head {
				height: 148rpx;
				display: flex;
				align-items: center;
				margin-bottom:10rpx;
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
				font-size: 28rpx;
				color: #333;
				line-height: 70rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				.uni-input{
					font-size: 30rpx;
					color: #555dff;
					border-bottom: 1px dotted #ccc;
				}
				
			}

			.more {
				flex: none;
				line-height: 70rpx;
				display: flex;
				align-items: center;
				image {
					width: 80rpx;
					height: 28rpx;
				}
			}
			.b{
				line-height: 90rpx;
				font-size:30rpx;
				font-weight: 400;
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
	.func{
		
		display: flex;
		margin-top: 20rpx;
		width:100%;
		bottom: 60rpx;
		padding:0 20rpx;
		.f{
			flex:1;
			padding:0 20rpx;
		}
		
	}
	.bt2 {
		margin-top: 10rpx;
		bottom:350rpx;
		left:320rpx;
		text-align: center;
		font-size: 32rpx;
		color: $uni-color-error;
		line-height: 88rpx;
	}
	.name{
		margin-bottom: 10rpx;
	}
	
	
</style>
