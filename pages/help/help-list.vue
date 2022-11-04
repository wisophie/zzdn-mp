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
		<view class="tab" >
			
			<view class='judgedisplay' @tap="showJudge">
				显示：{{jd}}⏷
				
			</view>
			<view v-if="showSelectTag2" class="conversation-bubble2" @tap.stop="handleEditToggle2">
				<view v-for="(item, index) in arrayjudge" :key="index" class="picker2" :data-name="item.name" @tap="handleOnTap2">{{ item.name }}</view>
			</view>
		</view>
		</view>
		<view class="bt">
			<u-button class="mt-4" type="primary" @click="toPage('/pages/help/help-edit')">发布跑腿订单</u-button>
		</view>
		
		
			<view class="friends">
				<view class="friends-list" v-for="(item,index) in goods" :key="item.id" @click="toPage('/pages/help/help-detail',item)">
					<view class="friends-list-u">
						<view class="friends-list-l">
							
							<image :src="item.imgurl"></image>
						</view>
						<view class="friends-list-r">
							<view class="top">
								<view class="name">{{item.item[0].topic}}</view>
								<view class="type">{{item.statustype}}</view>
							</view>
							<view>
								<view class="chatcontent">{{item.item[0].content}}</view>
							</view>
							
						</view>
					</view>
					
					<view class="friends-list-d">
						<text class="name">发布地点：{{item.province}}-{{item.city}}</text>
						<text class="price">价格：{{item.amount}}元</text>
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
							name: '我是发起人',
						}, {
							name: '我是接单人',
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
				arrayjudge: [
					{
						name: '我的订单'
					},
					{
						name: '待接单列表'
					},
					
				],
				jd:'我的订单',
				showSelectTag2:false,
				rol:'',
				relme:0,
			};
		},
		onLoad(){
			// this.getHelpList()
			this.getFriends1()
			
		},
		// onShow() {
		//  this.refresh()
		// },
		methods:{
			
			upCallback(page){
				//console.log(this.relme)
				const params = {
				  status:'', //1：发起订单，未支付，2：已支付，等待接单，3：已接单，正在赶往现场，4：完成，5：取消订单
				  page: '',
				  limit: '',
				  order: '',
				  sort:'',
				  //relatedMe:'',  //传1 展示与我有关，传0展示待接单列表展示与我相关的订单需求(发单和接单均会展示)
				  orderType:'',  //0跑腿订单 1帮忙订单
				  role:this.rol,  //接单人角色，我是发起人 0 我是接单人1
				}
				getHelplist(params).then(res =>{
					const { list:listData, total } = res.data
					const list = listData.map(v => ({ ...v, statustype:{'1':'等待接单','2':'等待接单','3':'已接单','4':'已完成','5':'已取消'}[v.status]}))
					this.mescroll.endBySize(list.length, total)
					if (page.num == 1) this.goods = []
					this.goods = this.goods.concat(list)
					console.log(this.goods)
				}).catch(() => {
				  this.mescroll.endErr()
				})
			},
			click(item) {
			console.log(item.index);
			this.rol=item.index
			this.mescroll.resetUpScroll()
			 },
			toPage(url,id) {
			  uni.$u.route(url, id )
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
			showJudge() {
				this.setData({
					showSelectTag2: !this.showSelectTag2
				});
			},
			handleEditToggle2() {
				this.setData({
					showSelectTag2: false
				});
			},
			handleOnTap2(event) {
				this.setData(
					{
						showSelectTag2: false
					},
					() => {
						switch (event.currentTarget.dataset.name) {
							case '我的订单':
								this.jd='我的订单';
								this.relme=0
								//console.log(this.relme)
								this.mescroll.resetUpScroll()
								break;
			
							case '待接单列表':
								this.jd='待接单列表';
								this.relme=1
								//console.log(this.relme)
								this.mescroll.resetUpScroll()
								break;
							default:
								break;
						}
					}
				);
			},
			refresh() {
			  this.mescroll.resetUpScroll()
			}
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
			.conversation-bubble2 {
				padding-top: 5rpx;
				position: absolute;
				width: 160rpx;
				padding-right: 3px;
				background-color: #FFFFFF;
				height: 157rpx;
				top: 150rpx;
				right:50rpx;
				z-index: 100;
				box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.08);
				border-radius: 14rpx;
				transition-duration: all .3s;
			}
			.picker2 {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				font-weight: 300;
				width: 100%;
				height: 78rpx;
				border-bottom: 1px solid #ccc;
				&:active{
					background-color: #ccc;
				}
				
			}
			.tab{
				//position: fixed;
				width:230rpx;
				height:0rpx;
				right:0rpx;
				top:50rpx;
				z-index: 20;
				
			}
				.judgedisplay{
					position: absolute;
					width:230rpx;
					height:40rpx;
					right:20rpx;
					top:100rpx;
				}
</style>
