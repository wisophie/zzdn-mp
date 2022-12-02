<template>
	<view class="main">
		
		<view class="g-section">
			
			
		  <view class="text-md text-bold">{{list.topic}}</view>
		  <view class='mt-2 u-tips-color text-s'>
			  <text >发布人：{{list.username}}</text>
			  <view class="judge">
			  	<text class="judgetype" :class="{judgetyper:list.status==2}" v-if="list.status!=1">{{judgestat}}</text>
			  	<text class="judgetyper" v-if="list.status==2">：{{list.rejectReason}}</text>
			  </view>
		  </view>
		  <view class='mt-2 u-tips-color text-s'>
		  			 <u-upload
		  			 	:fileList="banner"
		  			 	@afterRead="afterRead($event)"
		  			 	@delete="deletePic($event, 'url')"
		  			 	:deletable='false'
		  			 	name="4"
		  			 	multiple
		  			 	:maxCount="0"
		  			 ></u-upload>
		  </view>
		 
		</view>
		<view class="g-section os-price u-border-top u-border-bottom">
			<view class="os-price__row">
				<text class="os-price__row__label">投票类型</text>
				<text class="os-price__row__value">{{extype}}</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">反馈类目</text>
				<text class="os-price__row__value">{{list.feedbackType}}</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">发布时间</text>
				<text class="os-price__row__value">{{list.options[0].updateTime}}</text>
			</view>
			
		</view>
		<view class="g-section">
		  <view class="pb-4 text-md text-bold">详情</view>
		  <view>
		    {{list.progress}}
		  </view>
		  <!-- <view class="mission mt-1 u-tips-color text-md">
		    <text></text>
		    <text class="u-warning"></text>
		    <text class="u-warning text-bold text-md"></text>
		  </view> -->
		  <view class="votelist" v-if='list.type==1'>
			  <u-radio-group v-model="value2" placement="column" iconPlacement="right" :borderBottom="false">
			  			  <view class='select' v-if="form[0].content!=''">
							  <view class="top">
							  <text class="a">支持</text>
			  				  <u-radio activeColor="green" :label="form[0].content" name='0'></u-radio>
							   </view>
			  				  <u-line-progress :percentage="arate" :showText="false" >
								  <text class="u-percentage-slot1">票数：{{form[0].count}}</text>
							  </u-line-progress>
			  			  </view>
			  	<view class='select' v-if="form[1].content!=''">
					 <view class="top">
					<text class="a">支持</text>
					  <u-radio activeColor="green" :label="form[1].content" name='1'></u-radio>
					  </view>
					  <u-line-progress :percentage="brate" :showText="false" >
						   <text class="u-percentage-slot1">票数：{{form[1].count}}</text>
					  </u-line-progress>
			  	</view>
			  			<view class='select' v-if="form[2].content!=''">
						<view class="top">
							<text class="a">支持</text>
						  <u-radio activeColor="green" :label="form[2].content" name='2'></u-radio>
						</view>
						  <u-line-progress :percentage="crate" :showText="false" >
							   <text class="u-percentage-slot1">票数：{{form[2].count}}</text>
						  </u-line-progress>
			  			</view>
			  			<view class='select' v-if="form[3].content!=''">
							<view class="top">
							<text class="a">支持</text>
							 <u-radio activeColor="green" :label="form[3].content" name='3'></u-radio>
							 </view>
							 <u-line-progress :percentage="drate" :showText="false" >
								  <text class="u-percentage-slot1">票数：{{form[3].count}}</text>
							 </u-line-progress>
			  			</view>
			  			
			  
			  </u-radio-group>
		  </view>
		  <view class="votelist" v-if='list.type==0'>
			  <u-radio-group v-model="value" @change="groupChange" placement="column" iconPlacement="right" :borderBottom="false">
				  <view class='select'>
					  <view class="top">
					  	<text class="a">支持</text>
					  	<u-radio activeColor="green" label="投票" name="1"></u-radio>
					  </view>
						
					  <u-line-progress :percentage="suprate" :showText="true" height="12">
						 <text class="u-percentage-slot1">票数：{{support}}</text>
						  </u-line-progress>
				  </view>
				<view class='select'>
					 <view class="top">
					  <text class="b">反对</text>
					  <u-radio activeColor="red" label="投票" name="0"></u-radio>
					  </view>
					  <u-line-progress :percentage="objrate" :showText="false" activeColor="#ff0000" height="12">
						  <text class="u-percentage-slot2">票数：{{obj}}</text>
					  </u-line-progress>
				</view>
			  </u-radio-group>
		  </view>
		  
		</view>
		
		<view class="b-footer">
		 
		 <view class="b-footer__right" v-if='list.userId==myid' @click="toPage('pages_platform/vote-edit',list)">
		    <text class="bt" >编辑投票内容</text>
		  </view>
		  <view class="b-footer__right submitvote" v-if='list.userId!=myid' @click="Vote">
		     <text class="bt" >提交投票</text>
		   </view>
		  <view class="b-footer__left" v-if='list.userId!=myid'>
		  			  <view @tap="handleRoute" class="u">
		  				  <u-icon name="chat"  color="#303133" size="28" />
		  				  <text>联系他</text>
		  			  </view>
		    
		  </view>
		</view>
		<view class='more' @click="show6 = true" v-if='app==false'>
					  <text>更多▴</text>
		</view>
		<view class="bottom-back" v-if='app==true'>
			<view class="bottom-area">
				<view v-if="showSelectTag" class="conversation-bubble" @tap.stop="handleEditToggle">
					<view v-for="(item, index) in actions" :key="index" class="picker" :data-name="item.name" @tap="handleOnTap">{{ item.name }}</view>
				</view>
				<image @tap="showMore" class="btn-show-more" src="/static/static/assets/add.svg"></image>
				<view class="btn-show-more" @tap="showMore">
				  <text>更多▴</text>
				</view>
			</view>
		</view>
		<u-action-sheet
					:show="show6"
					@close="show6 = false"
					:actions="actions"
					@select="selectClick"
					cancelText="取消"
				>
				</u-action-sheet>
			
	</view>
	
</template>

<script>
	import { getVoteDetail,deleteVote,toVote} from '@/api/vote'
	export default {
		data() {
			return {
				
			actions: [{
							name: '删除投票',
						},
							
					],
			show6: false,
			showSelectTag: false,
			list:{},
			extype:'',
			banner:[],
			len:2,
			value:1,
			myid:0,
			support:0,
			obj:0,
			suprate:0,
			objrate:0,
			formlength:2,
			form:[{
				content:'',
				count:'',
			},{
				content:'',
				count:'',
			},{
				content:'',
				count:'',
			},{
				content:'',
				count:'',
			}],
			arate:0,
			brate:0,
			crate:0,
			drate:0,
			sum:0,
			value2:0,
			judgestat:'',
			app:false,
			};
		},
		onLoad(id){	
			this.judgestat=id.judgestat
			this.togetVoteDetail(id)
			// #ifdef  APP-PLUS
			this.rateapp()
			// #endif
			// #ifdef  APP-PLUS
			this.rate2app()
			// #endif
			// #ifdef  APP-PLUS
			this.appplus()
			// #endif
			
		},
		onShow(){
			
		},
		// onShow(id) {
		// created(){
		// 	this.rateapp()
		// }
		//  this.togetVoteDetail(id)
		// },
		computed:{
			cid(){
			  
			},
			rate(){
				this.suprate=(this.support/(this.support+this.obj))*100
				this.objrate=(this.obj/(this.support+this.obj))*100
			},
			rate2(){
				if(this.formlength==2){
					this.arate=(this.form[0].count/this.sum)*100
					this.brate=(this.form[1].count/this.sum)*100
				}else if(this.formlength==3){
					this.arate=(this.form[0].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.brate=(this.form[1].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.crate=(this.form[2].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
				}else if(this.formlength==4){
					this.arate=(this.form[0].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.brate=(this.form[1].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.crate=(this.form[2].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.drate=(this.form[3].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
				}
				
				
			}
		},
		methods:{
			showMore() {
				
				this.setData({
					showSelectTag: !this.showSelectTag
				});
			
				this.show6=true
			},
			handleEditToggle() {
				this.setData({
					showSelectTag: false
				});
			},
			handleOnTap(event) {
				this.setData(
					{
						showSelectTag: false
					},
					() => {
						switch (event.currentTarget.dataset.name) {
							case '删除投票':
								this.delevote();
								break;
							default:
								break;
						}
					}
				);
			},
			delevote(){
				const data={
					id:this.list.id
				}
				uni.showModal({
				  title: '提示',
				  content: '是否确认删除该投票？',
				  success: res => {
				    if (res.confirm) {
				      deleteVote(data).then(res => {
				        uni.$u.toast('删除成功！')
				      })
					  uni.setStorageSync("currentIndex", 1)
					  this.canceldingdan()
				    }
				  }
				})
			},
			// #ifdef  APP-PLUS
			appplus(){
				this.app=true
			},
			// #endif
			rateapp(){
				this.suprate=(this.support/(this.support+this.obj))*100
				this.objrate=(this.obj/(this.support+this.obj))*100
			},
			rate2app(){
				if(this.formlength==2){
					this.arate=(this.form[0].count/this.sum)*100
					this.brate=(this.form[1].count/this.sum)*100
				}else if(this.formlength==3){
					this.arate=(this.form[0].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.brate=(this.form[1].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.crate=(this.form[2].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
				}else if(this.formlength==4){
					this.arate=(this.form[0].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.brate=(this.form[1].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.crate=(this.form[2].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.drate=(this.form[3].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
				}
				
				
			},
			open() {
			        // console.log('open');
			      },
			      close() {
			        this.show = false
			        // console.log('close');
			      },
			groupChange(e){
				this.value=e
				console.log(this.value)
				console.log(this.list.options[this.value].id)
			},
			togetpics(item){
				
				if(item.pics==undefined){
				this.len=0
				}else{
					const banners=item.pics.split(",")
					const temp =[{ url: 1 },{ url: 1 }]
					this.banner= temp.map(((o, i) => ({ 
					url: banners[i]})))
					
					if(this.banner[1].url==undefined){
						this.banner.pop()
					}
					this.len=this.banner.length
				}
				
			},
			togetVoteDetail(item){
				console.log(item)
				const params={
					id:item.id
				}
				getVoteDetail(params).then(res=>{
					
					this.list = res.data
					this.myid=uni.getStorageSync('userInfo').id
					console.log(this.list)
					this.extype={'0':'订单纠纷','1':'意见反馈'}[this.list.type]
					if(this.list.type==0){
						this.support=this.list.options[1].count
						this.obj=this.list.options[0].count
						// #ifdef  APP-PLUS
						this.rateapp()
						// #endif
					}else{
						this.formlength=this.list.options.length
						this.form.forEach((e,i)=>{
							e.content=this.list.options[i].content;
							e.count=this.list.options[i].count;
							this.sum+=e.count
							//console.log(this.sum)
						})
						// #ifdef  APP-PLUS
						this.rate2app()
						// #endif
					}
					
				})
				this.togetpics(item)
			},
			Vote(){
				if(this.list.type==1){
					this.value=this.value2
				}
				console.log(this.list.options[this.value].id,this.value2)
				const data={
					id:this.list.options[this.value].id
				}
				toVote(data).then(res=>{
					console.log(res)
					if(res.errmsg=='成功'){
						uni.$u.toast('投票成功！')
						if(this.value==1){
							this.support++
						}else{
							this.obj++
						}
						if(this.value2==0){ 
							this.form[0].count++
						}else if(this.value2==1){ 
							this.form[1].count++
						}else if(this.value2==2){ 
							this.form[2].count++
						}else if(this.value2==3){ 
							this.form[3].count++
						}
					}else{
						uni.$u.toast('请勿重复投票！')
					}
					
				})
			
			},
			handleRoute() {
				const id =this.list.userId
				const url = `../pages_chat/chat?conversationID=C2C${id}`;
				uni.navigateTo({
					url
				});
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
					//console.log(result)
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
			toPage(url,id) {
				uni.$u.route(url,id)
			},
			selectClick(index){
				if(index.name=='删除投票'){
					const data={
						id:this.list.id
					}
					uni.showModal({
					  title: '提示',
					  content: '是否确认删除该投票？',
					  success: res => {
					    if (res.confirm) {
					      deleteVote(data).then(res => {
					        uni.$u.toast('删除成功！')
					      })
						  uni.setStorageSync("currentIndex", 1)
						  this.canceldingdan()
					    }
					  }
					})
				
				}
						console.log(index)
				},
				canceldingdan(){
					//uni.navigateBack()
					uni.switchTab({
						url:'/pages/platform/platform',
					
					})
				
				},
		}
	}
</script>
<style>
page {
	background-color: #fff;
	height:100vh;
}
</style>

<style lang="scss" scoped>
	.main{
		
		//padding-bottom:10vh;
	}
.g-section {
  width: 750rpx;
  padding: 14rpx 16rpx;
  background-color: #fff;
}
.os-price__row + .os-price__row {
	margin-top: 10px;
	
}
.os-price {
	
	&__row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: $u-main-color;
		line-height: 1.6;
		&__label {
			color: $u-content-color;
		}
	}
}
.mission{
	text-align: right; 
	margin-right:10rpx;
	margin-top:100rpx;
}
.u-percentage-slot1 {
	padding: 1px 10px;
	background-color: #28bf1d;
	color: #fff;
	border-radius: 100px;
	font-size: 10px;
	margin-right: -5px;
}
.u-percentage-slot2 {
	padding: 1px 10px;
	background-color: red;
	color: #fff;
	border-radius: 100px;
	font-size: 10px;
	margin-right: -5px;
}
.b-footer {
	position: fixed;
	bottom:60rpx;
	right:5rpx;
	display: flex;
	justify-content: flex-end;
	width: 80%;
	margin-top:40rpx;
	padding: 0 32rpx;
	height:75rpx;
	&__right{
		display: flex;
		align-items: center;
		margin-left: 32rpx;
		border-radius: 40rpx;
		padding: 10rpx 40rpx;
		color: $uni-color-error;
		background-color: #fff;
		border:1px solid $uni-color-error;
	}
	&__left{
		display: flex;
		align-items: center;
		border-radius: 40rpx;
		padding: 10rpx 40rpx;
		margin-left: 50rpx;
		background-color: $u-white;
		border:1px solid #ccc;
		
	}
	.submitvote{
		color: $u-white;
		background-color: $u-primary;
		border:1px solid $u-primary;
	}
	.u{ display: flex;
		justify-content: center;
		align-items: center;
		
	}

}
.more{
	position: fixed;
	bottom:70rpx;
	left:20rpx;
	z-index: 10;
}
.select{
	margin-top:20rpx;
	margin-bottom:30rpx;
	.a{
	  position:absolute;
	  right:90rpx;
	}
	.b{
	  position:absolute;
	  right:90rpx;
	}
}
.top{
	margin-bottom:10rpx;
}

.votelist{
	margin:10rpx 20rpx;
}
.judge{
	float:right;
	.judgetype{
		color:orange;
	}
	.judgetyper{
		color:red;
	}
}
.bottom-back {
			position: fixed;
			height: 10rpx;
			width: 100%;
			bottom:4%;
			right:430rpx;
			
			z-index: 1000;
		}
		.bottom-area {
			flex-direction: column;
			position: absolute;
			bottom: 20rpx;
			right: 0;
			width: 100px;
			display: flex;
			justify-content: center;
			align-items: right;
		}
		.conversation-bubble {
			padding-top: 10rpx;
			position: absolute;
			width: 200rpx;
			padding-right: 3px;
			background-color: #FFFFFF;
			height:100rpx;
			bottom: 60rpx;
			left:-110rpx;
			z-index: 100;
			box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.08);
			border-radius: 14rpx;
			transition-duration: all .3s;
		}
		.cbb{
			height:180rpx;
		}
		
		.conversation-bubble:before,
		.conversation-bubble:after {
			content: "";
			display: block;
			border-width:15px;
			position: absolute;
			bottom: -28px;
			left: 34px;
			border-style: solid dashed dashed;
			border-color: #fff transparent transparent;
			font-size: 0;
			line-height: 0;
			margin-left: 4px;
			transition: all .3s;
			//border:1px solid red;
		}
		
		.conversation-bubble:after {
			bottom: -28px;
			
			border-color: #fff transparent transparent;
		
		}
		.picker {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-weight: 300;
			width: 100%;
			height: 80rpx;
			&:active{
				background-color: #ccc;
			}
			
		}
		.btn-show-more {
			
			  position: fixed;
			bottom:4%;
			right:630rpx;
			  width: 80rpx;
			  height: 50rpx;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			 
			  z-index: 99;
			  &:active{
			  	background-color: #ccc;
			  }
			
		}
</style>

