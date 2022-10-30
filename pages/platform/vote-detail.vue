<template>
	<view>
		
		<view class="g-section">
			
			
		  <view class="text-md text-bold">标题标题标题标题标题标题标题标题</view>
		  <view class='mt-2 u-tips-color text-s'>
			  <text >发布人：xxx</text>
		  </view>
		  <view class='mt-2 u-tips-color text-s'>
		  			 <u-upload
		  			 	:fileList="fileList4"
		  			 	@afterRead="afterRead"
		  			 	@delete="deletePic"
		  			 	:deletable='false'
		  			 	name="4"
		  			 	multiple
		  			 	:maxCount="2"
		  			 ></u-upload>
		  </view>
		 
		</view>
		<view class="g-section os-price u-border-top u-border-bottom">
			<view class="os-price__row">
				<text class="os-price__row__label">投票类型</text>
				<text class="os-price__row__value">订单纠纷</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">反馈类目</text>
				<text class="os-price__row__value">xxx</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">发布时间</text>
				<text class="os-price__row__value">22：22</text>
			</view>
			
		</view>
		<view class="g-section">
		  <view class="pb-4 text-md text-bold">详情</view>
		  <view>
		    这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容这是详情内容
		  </view>
		  <view class="mission mt-1 u-tips-color text-md">
		    <text></text>
		    <text class="u-warning"></text>
		    <text class="u-warning text-bold text-md"></text>
		  </view>
		</view>
		
		<view class="b-footer">
		 
		 <view class="b-footer__right" @click="toPage('pages/platform/vote-edit')">
		    <text class="bt" >编辑投票内容</text>
		  </view>
		  <view class="b-footer__left">
		  			  <view @tap="handleRoute('C2Cyanli')" class="u">
		  				  <u-icon name="chat"  color="#303133" size="28" />
		  				  <text>联系他</text>
		  			  </view>
		    
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
	import { getVoteDetail,deleteVote} from '@/api/vote'
	export default {
		data() {
			return {
				fileList4: [{
								url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
							},
							{
								url: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
							}
						],
			actions2: [{
							name: '删除投票',
						},
							
					],
			show2: false,
			};
		},
		onLoad({ id }){
			this.togetVoteDetail(id)
		},
		methods:{
			togetVoteDetail(id){
				const params={
					id:id
				}
				getVoteDetail(params).then(res=>{
					console.log(res)
				})
			},
			Vote(){
				const data={
					id:2
				}
				toVote(data).then(res=>{
					console.log(res)
				})
			},
			handleRoute(id) {
				const url = `../TUI-Chat/chat?conversationID=${id}`;
				uni.navigateTo({
					url
				});
			},
			toPage(url) {
				uni.$u.route(url)
			},
			selectClick(index){
				if(index=='删除商品'){
					const data={
						id:1
					}
					deleteVote(data).then(res=>{
						console.log(res)
					})
				}
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

.b-footer {
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top:40rpx;
	padding: 0 32rpx;
	height:75rpx;
	//padding: 0 32rpx;
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
	.u{ display: flex;
		justify-content: center;
		align-items: center;
		
	}

}
.more{
	position: absolute;
	bottom:70rpx;
	left:20rpx;
}
</style>

