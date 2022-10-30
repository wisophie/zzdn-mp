<template>
	<view>
		<view class="g-section">
		  <view class="text-md text-bold">标题标题标题标题标题标题标题标题</view>
		  <view class='mt-2 u-tips-color text-s'>
			  <text >发布人：xxx</text>
		  </view>
		 
		 
		</view>
		<view class="g-section os-price u-border-top u-border-bottom">
			<view class="os-price__row">
				<text class="os-price__row__label">任务类型</text>
				<text class="os-price__row__value">帮忙</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">所在地点</text>
				<text class="os-price__row__value">xxx</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">发布时间</text>
				<text class="os-price__row__value">22：22</text>
			</view>
			
		</view>
		<view class="g-section">
		  <view class="pb-4 text-md text-bold">任务详情</view>
		  <view>
		    这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容
		  </view>
		  <view class="mission mt-1 u-tips-color text-md">
		    <text>任务报酬</text>
		    <text class="u-warning">￥</text>
		    <text class="u-warning text-bold text-md">20</text>
		  </view>
		</view>
		<view class="ff">上传完成凭证</view>
		<view class="u-flex tt">
		  <view>
		    <u-upload
		      :fileList="form.idCardPortrait"
		      :maxCount="1"
		      width="120"
		      height="100"
		      @afterRead="afterRead($event, 'idCardPortrait')"
		      @delete="deletePic($event, 'idCardPortrait')"
		    ></u-upload>
		    <view class="text-xs u-tips-color" style="textalign: center">到场拍的照片</view>
		  </view>
		  <view>
		    <u-upload
		      :fileList="form.idCardNational"
		      :maxCount="1"
		      width="120"
		      height="100"
		      @afterRead="afterRead($event, 'idCardNational')"
		      @delete="deletePic($event, 'idCardNational')"
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
		  <view class="b-footer1__left1">
		  			  <view @tap="tofulfillHelp" class="u">
		  				  
		  				  <text>完成任务</text>
		  			  </view>
		    
		  </view>
		</view>
		<view class="b-footer shadow-top">
		  <view class="b-footer__left">
			  <view @tap="handleRoute('C2Cyanli')">
				  <u-icon name="chat" class="u" color="#303133" size="28" />
				  <text>联系他</text>
			  </view>
		    
		  </view>
		  <view class="b-footer__right" @click="totakeHelp">
		    <text class="bt" >我要接单</text>
		  </view>
		</view>
		<view class='more' @click="show2 = true">
					  <text>更多</text>
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
	import { getHelpDetail,takeHelp,fulfillHelp,agreeHelp,unagreeHelp} from '@/api/help'
	export default {
		data() {
			return {
				actions2: [{
								name: '取消任务',
							},
								
						],
				show2: false,
				fileList3: [{
							url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						}],
				
				
			};
		},
		onLoad({ id }){
			this.togetHelpDetail(id)
		},
		methods:{
			tounagreeHelp(){
				const data={
					orderId:1
				}
					unagreeHelp(data).then(res=>{
						console.log(res)
					})
			},
			toagreeHelp(){
				const data={
					orderId:1
				}
					agreeHelp(data).then(res=>{
						console.log(res)
					})
			},
			tofulfillHelp(){
				const data={
					orderId:1,
					afterRepairPhoto:'',
					beforeRepairPhoto:'',
				}
				fulfillHelp(data).then(res=>{
					console.log(res)
					})
			},
			totakeHelp(){
			const data={
				orderId:1
			}
				takeHelp(data).then(res=>{
					console.log(res)
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
			handleRoute(id) {
				const url = `../TUI-Chat/chat?conversationID=${id}`;
				uni.navigateTo({
					url
				});
			},
			selectClick(index){
				// if(index=='删除商品'){
				// 	const data={
				// 		id:1
				// 	}
				// 	deleteShare(data).then(res=>{
				// 		console.log(res)
				// 	})
				// }
						console.log(index)
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
  padding: 16px;
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
	bottom:260rpx;
	right:80rpx;
}
.tt{
	position: absolute;
	margin-left: 25rpx;
}
.ff{
	margin-left: 25rpx;
	margin-bottom:10rpx;
}
</style>g
