<template>
	<view>
		<view class="g-section">
		  <view class="text-lg text-bold">{{list.item[0].topic}}</view>
		 <view class='mt-2 u-tips-color text-s'>
			  <text >发布人：{{list.username}}</text>
			  
			  <view class="judge">
			  	<text class="judgetype" :class="{judgetyper:list.auditStatus==2}" v-if="list.auditStatus!=1">{{judgestat}}</text>
			  	<text class="judgetyper" v-if="list.auditStatus==2">：{{list.rejectReason}}</text>
			  </view>
		  </view>
		
		 	
		
		 
		</view>
		<view class="g-section os-price u-border-top u-border-bottom">
			<view class="os-price__row">
				<text class="os-price__row__label">订单状态</text>
				<text class="os-price__row__value u-primary" >{{statustype}}</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">所在地点</text>
				<text class="os-price__row__value">{{list.province}}-{{list.city}}</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">发布时间</text>
				<text class="os-price__row__value">{{list.addTime}}</text>
			</view>
			
		</view>
		<view class="g-section">
		  <view class="pb-4 text-md text-bold">任务详情</view>
		  <view>
		    {{list.item[0].content}}
		  </view>
		  <view class="mission mt-1 u-tips-color text-md">
		    <text>任务报酬</text>
		    <text class="u-warning">￥</text>
		    <text class="u-warning text-bold text-md">{{list.amount}}</text>
		  </view>
		</view>
		
			<view class="ff" v-if="list.userId!==myid&&list.status==3">请上传完成凭证</view>
			<view class="u-flex tt" v-if="(list.userId!==myid&&list.status==3)||list.status==4">
			  <view>
			    <u-upload
			      :fileList="banner1"
			      :maxCount="1"
			      width="120"
			      height="100"
			      @afterRead="afterRead($event, 'one')"
			      @delete="deletePic($event, 'one')"
				  :previewFullImage="true"
				  :deletable='dtable'
			    ></u-upload>
			    <view class="text-xs u-tips-color" style="textalign: center">到场拍的照片</view>
			  </view>
			  <view>
			    <u-upload
			      :fileList="banner2"
			      :maxCount="1"
			      width="120"
			      height="100"
			      @afterRead="afterRead($event, 'two')"
			      @delete="deletePic($event, 'two')"
				  :previewFullImage="true"
				  :deletable='dtable'
				  
			    ></u-upload>
			    <view class="text-xs u-tips-color text-center" style="textalign: center">
			      结束拍的照片
			    </view>
			  </view>
			</view>
		
		
		<view class="b-footer1">
		 
		 <!-- <view class="b-footer1__right1" @click="toPage('pages/share/share-edit')">
		    <text class="bt" >取消任务</text>
		  </view> -->
		  <!-- <view class="b-footer1__left1">
		  			  <view @tap="tofulfillHelp" class="u">
		  				  
		  				  <text>完成任务</text>
		  			  </view>
		    
		  </view> -->
		</view>
		<view class="b-footer shadow-top">
		  <view class="b-footer__left">
			  <view @tap="handleRoute()">
				  <u-icon name="chat" class="u" color="#303133" size="28" v-if="app==false"/>
				  <image class="u1" src="./contact.png" v-if="app==true"></image> 
				  <text>联系他</text>
			  </view>
		    
		  </view>
		  <view class="b-footer__right" :class="{bt:clickeble==0}" @click="bb">
		    <text >{{ordertext}}</text>
		  </view>
		</view>
		
		<view class="da">
			<view class="dashang" v-if="list.status==6" @click="dashang">
			   <text class="bt" >打赏平台</text>
			 </view>
			 <view class="edit" v-if="list.status==2&&list.userId==myid" @click="toPage('pages/help/help-edit',list)">
			    <text class="" >编辑订单</text>
			  </view>
		</view>
	
		<view class='more' @tap="toOrder" v-if='app==false'>
					  <text>更多▴</text>
		</view>
		<view class="bottom-back" v-if='app==true'>
			<view class="bottom-area">
				<view v-if="showSelectTag" class="conversation-bubble" :class="{cbb:iscancelord==0}" @tap.stop="handleEditToggle">
					<view v-for="(item, index) in actions" :key="index" class="picker" :data-name="item.name" @tap="handleOnTap">{{ item.name }}</view>
				</view>
				<image @tap="showMore" class="btn-show-more" src="/static/static/assets/add.svg"></image>
				<view class="btn-show-more" @tap="showMore">
				  <text>更多▴</text>
				</view>
			</view>
		</view>
		<u-action-sheet
			:actions="actions"
			:show="showh"
			closeOnClickOverlay
			@close="showh = false"
			@select="selectClick"
			cancelText="取消"
		></u-action-sheet>
		<u-overlay :show="show" >
				<view class="dashangpic">
				   <image class="dpic" src="https://steel-ren.oss-cn-beijing.aliyuncs.com/y1cvhp64uxpk5uvhw6v6.jpg"></image> 
				    <u-button @click="show = false">确认</u-button>
				</view>
			</u-overlay>
			<view class="dashangpic2" v-if='show3==true'>
			   <image class="dpic" src="https://steel-ren.oss-cn-beijing.aliyuncs.com/y1cvhp64uxpk5uvhw6v6.jpg"></image> 
			    <u-button @click="show3= false">确认</u-button>
			</view>
			
	</view>
</template>

<script>
	import { uploadApi } from '@/api/common'
	import { getHelpDetail,takeHelp,fulfillHelp,agreeHelp,unAgreeHelp,cancelTakeOrder} from '@/api/help'
	
	export default {
		data() {
			return {
				actions: [],
				    showh: false,
					 show3: false,
					myid:0,
					list:[],
					statustype:',',
					ordertext:'',
					banner1:[],
					banner2:[],
					clickeble:0,
					dtable:1,
					judgestat:'',
					show:false,
					app:false,
				    showSelectTag: false,
					iscancelord:1,
				     fileList1:[{
			url: "https://steel-ren.oss-cn-beijing.aliyuncs.com/y1cvhp64uxpk5uvhw6v6.jpg",
		}],
			};
		},
		onLoad(id ){
			this.judgestat=id.judgestat
			this.cid()
			this.gethelpInfo(id)
			
			// #ifdef  APP-PLUS
			this.appplus()
			// #endif
		},
		// onShow(){
		// 	// #ifdef  APP-PLUS
		// 	this.cid()
		// 	this.canclick()
		// 	// #endif
		// },
		// computed:{
		// 	cid(){
		// 		this.myid=uni.getStorageSync('userInfo').id
		// 	},
		// 	canclick(){
		// 		if((this.list.userId!==this.myid&&this.list.status==2)||(this.list.userId!==this.myid&&this.list.status==3)||(this.list.userId==this.myid&&this.list.status==4)){
		// 			this.clickeble=1
		// 		}else{
		// 			this.clickeble=0
		// 		}
		// 	}
		// },
		methods:{
			dashang(){
				this.show=true
				// #ifdef  APP-PLUS
				this.show3=true
				// #endif
				
			},
			showMore() {
				
				this.setData({
					showSelectTag: !this.showSelectTag
				});
				if(this.list.status>=3){
					this.actions=[ {
								name: '取消接单',
							},{
								name: '取消订单或者不认同订单完成',
							},
							{
								name: '提交纠纷',
							},
						]
						this.iscancelord=1
				}else{
					this.actions=[{
								name: '取消订单或者不认同订单完成',
							},
							{
								name: '提交纠纷',
							},
						]
						this.iscancelord=0
				}
				this.showh=true
			},
			handleEditToggle() {
				this.setData({
					showSelectTag: false
				});
			},
			untakeorder(){
				const data={
					orderId:this.list.item[0].orderId,
				}
				uni.showModal({
				  title: '提示',
				  content: '是否确认取消订单？',
				  success: res => {
				    if (res.confirm) {
				     cancelTakeOrder(data).then(res=>{
				     	if(res.errmsg=='成功'){
				     		uni.$u.toast('接单取消成功！')
							this.canceldingdan()
				     	}
				     })
					   
				    }
				  }
				})
			},
			cancelorder(){
				const data={
					orderId:this.list.item[0].orderId,
				}
				uni.showModal({
				  title: '提示',
				  content: '是否确认取消订单？',
				  success: res => {
				    if (res.confirm) {
				     unAgreeHelp(data).then(res=>{
				     	if(res.errmsg=='成功'){
				     		uni.$u.toast('订单取消成功！')
							this.canceldingdan()
				     	}
				     })
					   
				    }
				  }
				})
			},
			handleOnTap(event) {
				this.setData(
					{
						showSelectTag: false
					},
					() => {
						switch (event.currentTarget.dataset.name) {
							case '取消接单':
								this.untakeorder();
								break;
			
							case '取消订单或者不认同订单完成':
								this.cancelorder();
								break;
								
							case '提交纠纷':
								uni.$u.route('/pages_platform/vote-edit', this.list);
								break;
							default:
								break;
						}
					}
				);
			},
			// #ifdef  APP-PLUS
			appplus(){
				this.app=true
			},
			// #endif
			toOrder() {
				if(this.list.status>=3){
					this.actions=[ {
								name: '取消接单',
							},{
								name: '取消订单或者不认同订单完成',
							},
							{
								name: '提交纠纷',
							},
						]
				}else{
					this.actions=[{
								name: '取消订单或者不认同订单完成',
							},
							{
								name: '提交纠纷',
							},
						]
				}
				this.showh=true
			},
			
			cid(){
				this.myid=uni.getStorageSync('userInfo').id
			},
			canclick(){
				console.log(this.myid,this.list.userId)
				if((this.list.userId!==this.myid&&this.list.status==2)||(this.list.userId!==this.myid&&this.list.status==3)||(this.list.userId==this.myid&&this.list.status==4)){
					this.clickeble=1
				}else{
					this.clickeble=0
				}
			},
			async gethelpInfo(item){
				console.log(item)
				const params={
					orderId:item.id
				}
				let res =await getHelpDetail(params)
					this.list= res.data
					 this.canclick()
					console.log(this.list)
					this.statustype = {'1':'等待接单','2':'等待接单','3':'已接单','4':'跑腿完成，等待确认','5':'已取消','6':'订单已完成'}[res.data.status]
				    this.list.username=item.username
					
			
				let sts =this.list.status
				if(item.userId==this.myid&&sts==2){
					this.ordertext='等待接单'
				}else if(item.userId!==this.myid&&sts==2){
					this.ordertext='我要接单'
				}else if(item.userId==this.myid&&sts==3){
					this.ordertext='已接单，等待完成'
				}else if(item.userId!==this.myid&&sts==3){
					this.ordertext='提交凭证'
				}else if(item.userId==this.myid&&sts==4){
					this.banner1=[{
							url:this.list.detail.beforeRepairPhoto,
						}],
					this.banner2=[{
							url:this.list.detail.afterRepairPhoto,
						}],
					this.dtable=0
					this.ordertext='已完成，请点击确认'
				}else if(item.userId!==this.myid&&sts==4){
					this.banner1=[{
							url:this.list.detail.beforeRepairPhoto,
						}],
					this.banner2=[{
							url:this.list.detail.afterRepairPhoto,
						}],
					this.dtable=0
					this.ordertext='已完成，等待确认'
				}else if(sts==5){
					this.ordertext='订单已取消'
				}else if(sts==6){
					this.ordertext='订单已完成'
			}
			},
			bb(){
				let sts =this.list.status
				if(this.list.userId!=uni.getStorageSync('userInfo').id&&sts==2){
					this.totakeHelp()
				}else if(this.list.userId!=uni.getStorageSync('userInfo').id&&sts==3){
					this.tofulfillHelp()
				}else if(this.list.userId==uni.getStorageSync('userInfo').id&&sts==4){
					this.toagreeHelp()
				}
			},
			refresh(id) {
			  uni.redirectTo({
			         url:'/pages/help/help-detail'
			     },id);
			},
			tounagreeHelp(){
				const data={
					orderId:this.list.item[0].orderId
				}
					unagreeHelp(data).then(res=>{
						console.log(res)
						this.gethelpInfo(this.list)
					})
			},
			toagreeHelp(){
				const data={
					orderId:this.list.item[0].orderId
				}
				uni.showModal({
				  title: '提示',
				  content: '是否确认完成？',
				  success: res => {
				    if (res.confirm) {
				     agreeHelp(data).then(res=>{
				     	if(res.errmsg=='成功'){
							this.gethelpInfo(this.list)
				     		uni.$u.toast('订单已完成！')
				     	}
				     })
					 
				    }
				  }
				})
			
			},
			canceldingdan(){
				//uni.navigateBack()
				uni.navigateTo({
					url:'/pages/help/help-list',
				
				})
			
			},
			tofulfillHelp(){
				console.log(this.banner2[0].url.toString())
				const data={
					orderId:this.list.item[0].orderId,
					afterRepairPhoto:this.banner2[0].url.toString(),
					beforeRepairPhoto:this.banner1[0].url.toString(),
				}
				uni.showModal({
				  title: '提示',
				  content: '是否确认上传？',
				  success: res => {
				    if (res.confirm) {
				     fulfillHelp(data).then(res=>{
						 console.log(res)
				     	if(res.errmsg=='成功'){
							this.gethelpInfo(this.list)
				     		uni.$u.toast('上传成功，等待确认！')
				     	}
				     })
					  
				    }
				  }
				})
			},
			totakeHelp(){
			const data={
				orderId:this.list.item[0].orderId
			}
				takeHelp(data).then(res=>{
					console.log(res)
					uni.$u.toast('接单成功！')
					this.gethelpInfo(this.list)
				})
			},
			togetHelpDetail(id){
				const params={
					orderId:id
				}
				getHelpDetail(params).then(res=>{
					console.log(res)
				})
			},
			handleRoute() {
				let id
				console.log(this.list.userId,this.myid,this.list.status)
				if(this.list.userId!=this.myid){
					id =this.list.userId
					const url = `../../pages_chat/chat?conversationID=C2C${id}`;
					uni.navigateTo({
						url
					});
				}else{
					if(this.list.status==2){
						uni.$u.toast('等待接单中！')
					}else{
						id =this.list.maintenanceId
						const url = `../../pages_chat/chat?conversationID=C2C${id}`;
						uni.navigateTo({
							url
						});
					}
					
				}
				
			},
			// 删除图片
			deletePic(event, key) {
				if(key=='one'){
					this.banner1.splice(event.index,1)
				}else{
					this.banner2.splice(event.index,1)
				}
			     
			},
			// 新增图片
			async afterRead(event, key) {
				let banner={'one':this.banner1,'two':this.banner2}[key]
			  let lists = [].concat(event.file)
			  let fileListLen = banner.length
			  lists.map(item => {
			    banner.push({
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
			        let item = banner[fileListLen]
			        banner.splice(
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
			        banner.splice(
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
				if(index.name=="取消订单或者不认同订单完成"){
				const data={
					orderId:this.list.item[0].orderId,
				}
				uni.showModal({
				  title: '提示',
				  content: '是否确认取消订单？',
				  success: res => {
				    if (res.confirm) {
				     unAgreeHelp(data).then(res=>{
				     	if(res.errmsg=='成功'){
				     		uni.$u.toast('订单取消成功！')
							this.canceldingdan()
				     	}
				     })
					   
				    }
				  }
				})
					
			}else if(index.name=="取消接单"){
				const data={
					orderId:this.list.item[0].orderId,
				}
				uni.showModal({
				  title: '提示',
				  content: '是否确认取消订单？',
				  success: res => {
				    if (res.confirm) {
				     cancelTakeOrder(data).then(res=>{
				     	if(res.errmsg=='成功'){
				     		uni.$u.toast('接单取消成功！')
							this.canceldingdan()
				     	}
				     })
					   
				    }
				  }
				})
					
			}else{
				uni.$u.route('/pages_platform/vote-edit', this.list)
				
			}
				
						
		}
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
.g-section {
  width: 750rpx;
  padding:14rpx 16rpx;
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

.b-footer {
	position: fixed;
	height:110rpx;
	left:0;
	bottom:0;
	display: flex;
	width: 100%;
	//padding: 0 32rpx;
	&__right{
		flex:1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $u-white;
		background-color: $u-primary;
		
	}
	.bt{
			background-color: #8fabc3;
			color:#fff;
		}
	
	&__left{
		flex:0.3;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $u-white;
		
	}
	.u{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 28rpx;
		height:28rpx;
	}
	.u1{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70rpx;
		height:60rpx;
	}
	
}

.b-footer1 {
	position: absolute;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top:100rpx;
	padding: 0 32rpx;
	height:80rpx;
	bottom:320rpx;
	right:0rpx;
	//padding: 0 32rpx;
	&__right1{
		display: flex;
		align-items: center;
		margin-left: 50rpx;
		border-radius: 40rpx;
		padding: 10rpx 40rpx;
		color: $uni-color-error;
		background-color: #fff;
		border:1px solid $uni-color-error;
		
	}
	&__left1{
		display: flex;
		align-items: center;
		border-radius: 40rpx;
		padding: 10rpx 40rpx;
		margin-left: 50rpx;
		margin-right: 0rpx;
		background-color: $u-white;
		border:1px solid #ccc;
		
	}
	.u{ display: flex;
		justify-content: center;
		align-items: center;
		
	}
	

}
.more{
	position: fixed;
	bottom:10%;
	right:630rpx;
	z-index:10;
}
.tt{
	position: absolute;
	margin-left: 25rpx;
}
.ff{
	margin-left: 25rpx;
	margin-bottom:10rpx;
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
.da{
	position: absolute;
	bottom:130rpx;
	left:5rpx;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top:40rpx;
	padding: 0 32rpx;
	height:75rpx;
	.dashang{
		display: flex;
		align-items: center;
		margin-left: 32rpx;
		border-radius: 40rpx;
		padding: 10rpx 40rpx;
		color: orange;
		background-color: #fff;
		border:1px solid orange;
		
		&:active{
			background-color: #e1e1e1;
			
		}
	}
	.edit{
		display: flex;
		align-items: center;
		margin-left: 32rpx;
		border-radius: 40rpx;
		padding: 10rpx 40rpx;
		color: $u-primary;
		background-color: #fff;
		border:1px solid $u-primary;
		
		&:active{
			background-color: #e1e1e1;
			
		}
	}
	
}

.dashangpic{
	margin:auto;
	height:850rpx;
	width:95%;
	.dpic{
		height:850rpx;
		width:100%;
	}
	
}
.dashangpic2{
	position:fixed;
     //margin:0 auto;
	bottom:500rpx;
	left:18rpx;
	height:850rpx;
	width:95%;
	.dpic{
		height:850rpx;
		width:100%;
	}
	
}
.bottom-back {
			position: fixed;
			height: 10rpx;
			width: 100%;
			bottom:5%;
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
			width: 450rpx;
			padding-right: 3px;
			background-color: #FFFFFF;
			height:260rpx;
			bottom: 150rpx;
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
			bottom:10%;
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
