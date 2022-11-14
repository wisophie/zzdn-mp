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
		<view class="top-bar">
			<view class="search-bar">
					<u-search placeholder="请输入关键字" v-model="keyword" @custom="doSearch"></u-search>
			</view>
			<view class="bannerline">
				<view class="bannerlinem" >
					<view class="meal" v-for="(item,index) in tabs" :key="index" @click="clickMeal(item)" :class="{active1:mealnum==item.name}"><a class="t">{{item.name}}</a></view>
				</view>
			</view>
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
		<ShareList :list="goods" @refresh="refresh"/>
	
		</mescroll-body>
	
</template>
<script>
	
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js';
	import ShareList from '@/components/ShareList';
	import { getShareApi} from '@/api/share'
	
	export default {
		mixins: [MescrollMixin], 
		components: { ShareList },
		data() {
			return {
				mealnum:'全部内容',
				showSelectTag: false,
				arr1:[],
				goods: [],
				downOption: {
					native: true
				},
				upOption: {
					noMoreSize: 0
				},
				array: [
					{
						name: '创建共享'
					},
					{
						name: '我的共享'
					},
					
				],
				tabs: [
				  {
				    id: 1,
				    name: '全部内容'
				  },
				  {
				    id: 2,
				    name: '滞销货物'
				  },
				  {
				    id: 3,
				    name: '共享信息'
				  },
				  ],
				  myid:'',
				  categ:'',
				  relme:0,
			};
		},
		
		onShow() {
			// if (uni.getStorageSync('from') === 'home') {
			// 	uni.removeStorage('from');
			// 	this.$myVote()
			// 	return
			// }
			if(uni.getStorageSync('userInfo').id==undefined){
				
			}else{
				this.relme = uni.getStorageSync('currentIndex')
				this.refresh()
				this.relme = 0
				uni.removeStorageSync('currentIndex');
			}
			
		},
		methods:{
			
			upCallback(page) {
	          console.log(this.relme)
				const params = {
				  category:this.categ,
				  page: '',
				  limit: '',
				  order: '',
				  sort:'',
				  related:this.relme
				}
				
			
				getShareApi(params).then(res =>{
					const { list: listData, total } = res.data
					const list = listData.map(v => ({ ...v, img: v.gallery ? v.gallery.split(',')[0] : '',extype:{'false':'提供货物','true':'需求货物'}[v.exchange],judgestat:{'0':'审核中','1':'审核通过','2':'审核不通过'}[v.status]}))
					this.mescroll.endBySize(list.length, total)
					if (page.num == 1) this.goods = []
					this.goods = this.goods.concat(list)
					console.log(this.goods)
				}).catch(() => {
				  this.mescroll.endErr()
				})
				
				// this.mescroll.endErr()
			},
			
			//点击标签生成列表
			clickMeal(e){
				this.mealnum=e.name;
				this.categ={'全部':'','滞销货物':'滞销','共享信息':'共享'}[e.name]
				this.mescroll.resetUpScroll()
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
							case '创建共享':
								this.$createConversation();
								break;
			
							case '我的共享':
								this.$myVote();
								break;
							default:
								break;
						}
					}
				);
			},
			showMore() {
				this.setData({
					showSelectTag: !this.showSelectTag
				});
			},
			$createConversation() {
				uni.navigateTo({
					url: '/pages_share/share-edit'
				});
			},
			$myVote() {
				this.relme=1
			    this.mescroll.resetUpScroll()
				this.relme=0
			},
			doSearch() {
			  this.goods = []
			  this.mescroll.resetUpScroll(true)
			},
			refresh() {
			  this.mescroll.resetUpScroll()
			}
		}
	}
</script>

<style lang="scss" scoped>

	
	.top-bar {
			position: sticky;
			top: var(--window-top); /* css变量 */
			left: 0;
			width: 100%;
			height:235rpx;
			z-index: 100;
			background-color: #ffffff;
			padding: 5px 12px 0;
		}
		.search-bar{
			position: sticky;
			top: var(--window-top); /* css变量 */
			left:0;
			width:100%;
			padding: 15rpx 32rpx;
			background-color: #fff;
			z-index: 10;
		}
		
	
	
		
		.bannerline {
		    height: 40px;
			//width: 95%;
		    line-height: 40px;
			text-align: center;
			color:#555555;
			box-sizing: border-box;
			//border:1px solid red;
			padding: 0 5rpx;
		}
		
		
		.bannerline .bannerlinem {
			display:flex;
		   justify-content: space-between;
		   .meal{
			flex:1;
			background-color: #dfdfdf;
			margin:10rpx;
			border-radius: 12rpx;
		   }
		   .active1 {
		       background-color: #5555ff;
		   	.t{
		   		padding-bottom:10rpx;
		   		//border-bottom:2px solid #ffbd14;
		   		color:#ffffff;
		   	  }
		   }
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
		//border: 1px solid red;
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
						.price{
							font-size:26rpx
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
</style>
