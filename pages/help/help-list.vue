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
		<u-tabs :list="list1" @click="click"></u-tabs>
		</view>
		<view class="bt">
			<u-button class="mt-4" type="primary" @click="toPage('/pages/help/help-edit')">发布跑腿订单</u-button>
		</view>
		
		
			<view class="friends">
				<view class="friends-list" v-for="(item,index) in friends" :key="item.id" @click="toPage('/pages/help/help-detail',item.id)">
					<view class="friends-list-u">
						<view class="friends-list-l">
							
							<image :src="item.imgurl"></image>
						</view>
						<view class="friends-list-r">
							<view class="top">
								<view class="name">{{item.name}}</view>
								<view class="type">跑腿/帮忙</view>
							</view>
							<view>
								<view class="chatcontent">{{item.chatcontent}}</view>
							</view>
							
						</view>
					</view>
					
					<view class="friends-list-d">
						<text class="name">发布地点：xxx</text>
						<text class="price">价格：99元</text>
					</view>
				</view>
			</view>
		
	</mescroll-body>
	
</template>

<script>
	import datas from './datas.js';
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import { getHelplist} from '@/api/help'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				 list1: [{
							name: '跑腿订单',
						}, {
							name: '帮忙订单',
						}],
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
			// this.getHelpList()
			this.getFriends1()
		},
		methods:{
			upCallback(page){
				const params = {
				  status:'', //1：发起订单，未支付，2：已支付，等待接单，3：已接单，正在赶往现场，4：完成，5：取消订单
				  page: '',
				  limit: '',
				  order: 'desc',
				  sort:'',
				  relatedMe:'',  //传1 展示与我有关，传0展示待接单列表展示与我相关的订单需求(发单和接单均会展示)
				  orderType:'',  //0跑腿订单 1帮忙订单
				  role:'',  //接单人角色，我是发起人 0 我是接单人1
				}
				getHelplist(params).then(res =>{
					console.log(res)
				})
			},
			click(item) {
			                console.log('item', item);
			            },
			toPage(url,id) {
			  uni.$u.route(url, { id })
			},
			// getHelpList(){
			// 	uni.request({
			// 	  	url: this.serverUrl+'/wx/errand/order/list',
			// 	  	data: {
				  		
			// 	  	},
			// 		header:{"X-Litemall-Token":this.token},
			// 	  	method: 'GET',
			// 	  	success: (res) => {
			// 	  		console.log(res)
						
			// 			}
			// 	})
			// }, 
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
				height: 200rpx;
				// width: 100%;
				padding: 16rpx 32rpx;
				//border: 1px solid red;
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				margin: 20rpx 15rpx;
				background-color: #fff;
				border-radius: 10rpx;
				// display: flex;
				// flex-direction: row;
				&:active{
					background-color: #ccc;
					
				}
				.friends-list-u{
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
					height: 120rpx;
				}
				.friends-list-d{
					margin-top: 12rpx;
					.price{
						float:right;
					}
				}
				
				.friends-list-l {
					
					position: relative;
					float: left;
					image {
						width: 96rpx;
						height: 96rpx;
						margin-top:10rpx;
						border-radius: 10rpx;
						background-color: $uni-color-warning;
					}
		
				
				}
				.friends-list-r {
						padding-left: 128rpx;
						margin-top: 5rpx;
						// flex:auto;
						//border: 1px solid red;
						.top {
							height: 50rpx;
				
							.name {
								float: left;
								font-size: 30rpx;
								font-weight: 400;
								color: #333;
								line-height: 50rpx;
				
							}
				
							.type {
								float: right;
								font-size: $uni-font-size-sm;
								color: #5555ff;
								line-height: 50rpx;
							}
						}
				
						.chatcontent {
							font-size: 28rpx;
							color: $uni-text-color-grey;
							line-height: 60rpx;
				            //border: 1px solid red;
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
