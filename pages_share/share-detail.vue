<template>
	<view>
		<u-swiper
		  :list="banner"
		  :height="240"
		  :radius="0"
		  :autoplay="false"
		  :circular="true"
		  
		  @change="e => (current = e.current)"
		>
		 <view slot="indicator" class="indicator" >
			 <view
					 class="indicator__dot"
					 v-for="(item, index) in banner"
					 :key="index"
					 :class="[banner.length!=1&&index === current?'indicator__dot--active':'indicator__dot--active2']"
			 >
		      </view>
			   </view>
		</u-swiper>
		<view class="g-section">
		  <view class="text-md text-bold">{{list.title}}</view>
		 <view class='mt-2 u-tips-color text-s'>
			  <text >发布人：{{list.username}}</text>
		  </view>
		 <view class='mt-2 u-tips-color text-s'>
		 			  <text >联系号码：{{list.tel}}</text>
		 </view>
		 
		</view>
		<view class="g-section os-price u-border-top u-border-bottom">
			<view class="os-price__row">
				<text class="os-price__row__label">交易类型</text>
				<!-- <text class="os-price__row__value">{{extype}}</text> -->
				<u--text type="warning" :text="extype" />
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">商品类目</text>
				<text class="os-price__row__value">{{list.category}}</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">所在地点</text>
				<text class="os-price__row__value">{{list.province}}/{{list.city}}/{{list.country}}</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">发布时间</text>
				<text class="os-price__row__value">{{list.updateTime}}</text>
			</view>
			
		</view>
		<view class="g-section">
		  <view class="pb-4 text-md text-bold">商品详情</view>
		  <view class='detail'>
		    {{list.detail}}
		  </view>
		 <!-- <view class="mission mt-1 u-tips-color text-md">
		    <text>商品价格</text>
		    <text class="u-warning">￥</text>
		    <text class="u-warning text-bold text-md">20</text>
		  </view> -->
		</view>
		
		<view class="b-footer">
		 
		 <view class="b-footer__right" v-if="list.userId==myid" @click="toPage('pages_share/share-edit',list)">
		    <text class="bt" >编辑商品</text>
		  </view>
		  <view class="b-footer__left" v-if="list.userId!=myid">
		  			  <view @tap="handleRoute(list.userId)" class="u">
		  				  <u-icon name="chat"  color="#303133" size="28" />
		  				  <text>联系他</text>
		  			  </view>
		    
		  </view>
		</view>
		<view class='more' @click="show2 = true" v-if="list.userId==myid">
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
	import { deleteShare} from '@/api/share'
	
	export default {
		data() {
			return {
				list:{},
				extype:'提供货物',
				current: 0,
				banner: [],
			actions2: [{
							name: '删除商品',
						},
							
					],
			show2: false,
			myid:'',
			};
		},
		onLoad(id){
			this.list = id
			this.getShareInfo()
		},
		methods:{
			getShareInfo(){
				console.log(this.list)
				this.myid= uni.getStorageSync('userInfo').id
				console.log(this.myid)
				this.banner=this.list.gallery.split(",")
				this.extype={'false':'提供货物','true':'需求货物'}[this.list.exchange]
			},
			handleRoute() {
				const id =this.list.userId
				const url = `../pages_chat/chat?conversationID=C2C${id}`;
				uni.navigateTo({
					url
				});
			},
			toPage(url,id) {
				uni.$u.route(url,id)
			},
			selectClick(index){
					if(index.name=='删除商品'){
						const data={
							id:this.list.id
						}
						uni.showModal({
						  title: '提示',
						  content: '是否确认删除？',
						  success: res => {
						    if (res.confirm) {
						      deleteShare(data).then(res => {
						        uni.$u.toast('删除成功！')
						       //this.refresh()
						      })
							  this.canceldingdan()
						    }
						  }
						})
						
						}
						
						
					
						
					},
					canceldingdan(){
						//uni.navigateBack()
						uni.switchTab({
							url:'@pages/share/share',
						
						})
					
					},
					cancel(id) {
					  uni.showModal({
					    title: '提示',
					    content: '是否确认取消该订单？',
					    success: res => {
					      if (res.confirm) {
					        cancelApi({ orderId: id }).then(res => {
					          uni.$u.toast('取消成功！')
					          this.refresh()
					        })
					      }
					    }
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
	.indicator {
	        @include flex(row);
	        justify-content: center;
	
	        &__dot {
	             height: 6px;
	             width: 6px;
	             border-radius: 100px;
	             background-color: rgba(255, 255, 255, 0.35);
	             margin: 0 5px;
	             transition: background-color 0.3s;
	    
	            &--active {
	                 background-color: #ffffff;
	             }
				 &--active2 {
				      background-color: transparent;
				  }
	        }
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

.b-footer {
	position: absolute;
	bottom:60rpx;
	left:5rpx;
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
	bottom:80rpx;
	left:20rpx;
}
.detail{
	
	height:175rpx;
}
</style>

