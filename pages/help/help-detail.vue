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
			<view class="u-flex tt" v-if="(list.userId!==this.myid&&list.status==3)||list.status==4">
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
			  <view @tap="handleRoute">
				  <u-icon name="chat" class="u" color="#303133" size="28" />
				  <text>联系他</text>
			  </view>
		    
		  </view>
		  <view class="b-footer__right" :class="{bt:clickeble==0}" @click="bb">
		    <text >{{ordertext}}</text>
		  </view>
		</view>
		<view class='more' @click="show2 = true" v-if='list.userId==myid'>
					  <text>更多▴</text>
		</view>
		<u-action-sheet
					:show="show2"
					@close="show2 = false"
					:actions="actions2"
					@select="selectClick"
					cancelText="取消"
				>
				</u-action-sheet>
	</view>
</template>

<script>
	import { uploadApi } from '@/api/common'
	import { getHelpDetail,takeHelp,fulfillHelp,agreeHelp,unAgreeHelp} from '@/api/help'
	export default {
		data() {
			return {
				actions2: [{
								name: '取消任务',
							},
							{
								name: '提交纠纷',
							},
								
						],
				show2: false,
				fileList3: [{
							url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						}],
					myid:0,
					list:[],
					statustype:',',
					ordertext:'',
					banner1:[],
					banner2:[],
					clickeble:0,
					dtable:1,
					judgestat:'',
				
				
			};
		},
		onLoad(id ){
			this.judgestat=id.judgestat
			this.gethelpInfo(id)
		},
		computed:{
			cid(){
			  this.myid=uni.getStorageSync('userInfo').id
			},
			canclick(){
				if((this.list.userId!==this.myid&&this.list.status==2)||(this.list.userId!==this.myid&&this.list.status==3)||(this.list.userId==this.myid&&this.list.status==4)){
					this.clickeble=1
				}else{
					this.clickeble=0
				}
			}
		},
		methods:{
			async gethelpInfo(item){
				console.log(item)
				const params={
					orderId:item.id
				}
				let res =await getHelpDetail(params)
					this.list= res.data
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
			selectClick(index){
				if(index.name=="取消任务"){
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
	position: absolute;
	bottom:10%;
	right:630rpx;
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
</style>g
