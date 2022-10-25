<template>
	<mescroll-body
		ref="mescrollRef"
		:up="upOption"
		:sticky="true"
		:down="downOption"
		@init="mescrollInit"
		@down="downCallback"
		@up="upCallback"
	>
		<view class="search-bar">
		<u-search placeholder="请输入关键字" v-model="keyword"></u-search>
		</view>
		<view class="bt">
			<u-button class="mt-4" type="primary" @click="toPage('/pages/help/helppage')">发布跑腿订单</u-button>
		</view>
		
		<view class="main">
			<view class="friends">
				<view class="friends-list" v-for="(item,index) in friends" :key="item.id" @tap="tochatroom(item)">
					<view class="friends-list-l">
						
						<image :src="item.imgurl"></image>
					</view>
					<view class="friends-list-r">
						<view class="top">
							<view class="name">{{item.name}}</view>
							<view class="time">价格：99元</view>
						</view>
						<view>
							<view class="chatcontent">{{item.chatcontent}}</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
	</mescroll-body>
	
</template>

<script>
	import datas from './datas.js';
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				goods:[],
				friends:[],
				keyword:'',
				downOption: {
					native: true
				},
				upOption: {
					noMoreSize: 0
				},
			};
		},
		onLoad(){
			this.getHelpList()
			this.getFriends1()
		},
		methods:{
			toPage(url) {
			  uni.$u.route(url)
			},
			getHelpList(){
				uni.request({
				  	url: this.serverUrl+'/wx/errand/order/list',
				  	data: {
				  		
				  	},
					header:{"X-Litemall-Token":this.token},
				  	method: 'GET',
				  	success: (res) => {
				  		console.log(res)
						
						}
				})
			}, 
			getFriends1: function() {
			  	this.friends = datas.friends();
			  	for(let i=0;i<10;i++){
			  		this.friends[i].imgurl=`https://cdn.uviewui.com/uview/album/${i+1}.jpg`;
			  		}
			  	
			},
			changeTime:function(date){
				return myfunction.dateTime(date)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-bar{
		position: sticky;
		top: var(--window-top); /* css变量 */
		left:0;
		width:100%;
		padding: 15rpx 32rpx;
		background-color: #fff;
		z-index: 10;
	}
	.bt{
		position: fixed;
		width:100%;
		bottom:0;
		padding: 0rpx 32rpx;
		z-index: 10;
	}

		.friends{
			margin-top: 30rpx;
		}
		.friends-list {
				height: 150rpx;
				// width: 100%;
				padding: 16rpx 32rpx;
				//border: 1px solid red;
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				// display: flex;
				// flex-direction: row;
				&:active{
					background-color: #ccc;
					
				}
				
				.friends-list-l {
					position: relative;
					float: left;
					image {
						width: 96rpx;
						height: 96rpx;
						margin-top:10rpx;
						border-radius: 50%;
						background-color: $uni-color-warning;
					}
		
				
				}
				.friends-list-r {
						padding-left: 128rpx;
						// flex:auto;
						// border: 1px solid red;
						.top {
							height: 50rpx;
				
							.name {
								float: left;
								font-size: 36rpx;
								font-weight: 400;
								color: $uni-text-color;
								line-height: 50rpx;
				
							}
				
							.time {
								float: right;
								font-size: $uni-font-size-sm;
								color: $uni-text-color-disable;
								line-height: 50rpx;
							}
						}
				
						.chatcontent {
							font-size: $uni-font-size-base;
							color: $uni-text-color-grey;
							line-height: 40rpx;
				// border: 1px solid red;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							/*显示的行数*/
							overflow: hidden;
						}
						.footer{
							float:right;
							margin-top:3rpx;
							.price{
								font-size:26rpx
							}
						}
						
					}
			}
</style>
