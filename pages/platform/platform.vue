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
		<!-- <view class="tab" >
			
			<view class='judgedisplay' @tap="showJudge">
				显示：{{jd}}⏷
				
			</view>
			<view v-if="showSelectTag2" class="conversation-bubble2" @tap.stop="handleEditToggle2">
				<view v-for="(item, index) in arrayjudge" :key="index" class="picker2" :data-name="item.name" @tap="handleOnTap2">{{ item.name }}</view>
			</view>
		</view> -->
		
		</view>
		<view class="bottom-back">
			<view class="bottom-area">
				<view v-if="showSelectTag" class="conversation-bubble" @tap.stop="handleEditToggle">
					<view v-for="(item, index) in array" :key="index" class="picker" :data-name="item.name" @tap="handleOnTap">{{ item.name }}</view>
				</view>
				<!-- <image @tap="showMore" class="btn-show-more" src="/static/static/assets/add.svg"></image> -->
				<view class="btn-show-more" @tap="showMore">
				  <u-icon name="more-dot-fill" size="24" color="#fff" />
				</view>
			</view>
		</view>
		
		
			<view class="friends">
				<view class="friends-list" v-for="(item,index) in goods" :key="item.id" @click="toPage('/pages/platform/vote-detail',item)">
					<view class="friends-list-u">
						<view class="friends-list-l">
							
							<image :src="item.img"></image>
						</view>
						<view class="friends-list-r">
							<view class="top">
								<view class="name">{{item.topic}}</view>
								<view class="type">{{item.extype}}</view>
							</view>
							<view>
								<view class="chatcontent">{{item.progress}}</view>
							</view>
							
						</view>
					</view>
					
					<view class="friends-list-d">
						<text class="name">发布者：{{item.username}}</text>
						<!-- <text class="judge">审核通过</text> -->
						<text class="price">{{item.time}}</text>	
					</view>
				</view>
				
			</view>
		
	</mescroll-body>
	
</template>

<script>
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import { getVotelist} from '@/api/vote'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				 list1: [{
							name: '订单纠纷',
						}, {
							name: '意见反馈',
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
				showSelectTag: false,
				showSelectTag2: false,
				array: [
					{
						name: '发起投票'
					},
					{
						name: '审核投票'
					},
					
				],
				arrayjudge: [
					{
						name: '全部'
					},
					{
						name: '已通过审核'
					},
					{
						name: '未通过审核'
					},
					
				],
				jd:'全部',
				typ:0,
				extype:'',
			};
		},
		onLoad(){
			this.getFriends1()
		},
		methods:{
			upCallback(page){
				const params = {
				  limit: '',
				  page:'',
				  order: '', 
				  sort:'',
				  //relatedMe:'',  //传1 展示与我有关，传0展示待接单列表展示与我相关的订单需求(发单和接单均会展示)
				  type:this.tye,  //0 订单纠纷 1 意见反馈
				}
				getVotelist(params).then(res =>{
					console.log(res.data)
					console.log(this.list1.index)
					const { list:listData, total } = res.data
					const list = listData.map(v => ({ ...v, img: v.pics ? v.pics.split(',')[0] : '',extype:{'0':'订单纠纷','1':'意见反馈'}[v.type],time:v.options[0].updateTime.split(' ')[0]}))
					this.mescroll.endBySize(list.length, total)
						if (page.num == 1) this.goods = []
						this.goods = this.goods.concat(list)
				
					}).catch(() => {
					  this.mescroll.endErr()
					})
				
			},
			click(item) {
				console.log(item)
			        this.tye=item.index
			        this.mescroll.resetUpScroll()
			  },
			toPage(url) {
			  uni.$u.route(url)
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
			showMore() {
				this.setData({
					showSelectTag: !this.showSelectTag
				});
			},
			showJudge() {
				this.setData({
					showSelectTag2: !this.showSelectTag2
				});
			},
			handleEditToggle() {
				this.setData({
					showSelectTag: false
				});
			},
			handleEditToggle2() {
				this.setData({
					showSelectTag2: false
				});
			},
			handleOnTap(event) {
				this.setData(
					{
						showSelectTag: false
					},
					() => {
						switch (event.currentTarget.dataset.name) {
							case '发起投票':
								this.$createConversation();
								break;
			
							case '审核投票':
								//this.$myVote();
								break;
							default:
								break;
						}
					}
				);
			},
			handleOnTap2(event) {
				this.setData(
					{
						showSelectTag2: false
					},
					() => {
						switch (event.currentTarget.dataset.name) {
							case '全部':
								this.jd='全部';
								break;
			
							case '已通过审核':
								this.jd='已通过审核';
								break;
							case '未通过审核':
								this.jd='未通过审核';
								break;
							default:
								break;
						}
					}
				);
			},
			$createConversation() {
				uni.navigateTo({
					url: './vote-edit'
				});
			},
			$myVote() {
				uni.navigateTo({
					url: './myvote'
				});
			},
			toPage(url,id) {
			  uni.$u.route(url, id )
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
						font-size:23rpx;
					}
					.judge{
						margin-left:50rpx;
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
								font-size: 26rpx;
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
								
							}
						}
						
					}
			}
			.bottom-back {
				position: fixed;
				height: 10rpx;
				width: 100%;
				bottom: 0;
				right: 0;
				left: 0;
				z-index: 3;
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
				width: 250rpx;
				padding-right: 3px;
				background-color: #FFFFFF;
				height: 180rpx;
				bottom: 150rpx;
				left:-110rpx;
				z-index: 100;
				box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.08);
				border-radius: 14rpx;
				transition-duration: all .3s;
			}
			
			.conversation-bubble:before,
			.conversation-bubble:after {
				content: "";
				display: block;
				border-width:15px;
				position: absolute;
				bottom: -28px;
				left: 84px;
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
			.picker2 {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 25rpx;
				font-weight: 300;
				width: 100%;
				height: 51rpx;
				border-bottom: 1px solid #ccc;
				&:active{
					background-color: #ccc;
				}
				
			}
			.picker:nth-child(1){
				border-bottom: 1px solid #ccc;
			}
			.btn-show-more {
				
				  position: fixed;
				  right: 60rpx;
				  bottom: calc(var(--window-bottom) + 50rpx);
				  width: 80rpx;
				  height: 80rpx;
				  display: flex;
				  justify-content: center;
				  align-items: center;
				  border-radius: 50%;
				  background: $u-primary;
				  box-shadow: 0px 1px 4px 1px rgba($color: $u-primary, $alpha: 0.5);
				  z-index: 99;
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