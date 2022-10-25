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
				<view class="search-div">
					<image src="../../static/images/search/search.png" class="search-image"></image>
					<input class="searchbar" type="search" @input="search" placeholder="搜索用户/群" placeholder-style="color:#ccc"/>
				</view>
			
			</view>
			<view class="bannerline">
				<view class="bannerlinem" >
					<view class="meal" v-for="(item,index) in tabs" :key="index" @click="clickMeal(item)" :class="{active1:mealnum==item.name}"><a class="t">{{item.name}}</a></view>
				</view>
			</view>
		</view>
		<ShareList :list="goods" />
	
		</mescroll-body>
	
</template>
<script>
	import myfunction from './myfunction.js';
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import ShareList from '@/components/ShareList'
	export default {
		mixins: [MescrollMixin], 
		components: { ShareList },
		data() {
			return {
				mealnum:'全部内容',
				arr1:[],
				goods: [],
				downOption: {
					native: true
				},
				upOption: {
					noMoreSize: 0
				},
				//list:[],
				token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0aGlzIGlzIGxpdGVtYWxsIHRva2VuIiwiYXVkIjoiTUlOSUFQUCIsImlzcyI6IkxJVEVNQUxMIiwiZXhwIjoxNjY2Mzc1ODQ4LCJ1c2VySWQiOjIsImlhdCI6MTY2NjM1NDI0OH0.AjbgXECwUfHdhMmNGotgVeg453-s2C4gx7ODXHR7dZ0',
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
			};
		},
		
		onLoad() {
		 this.getShare();
		},
		methods:{
			getShare() {
			  
			    uni.request({
			    	url: 'http://7dgvmk.natappfree.cc/wx/share/goods/list',
			    	data: {
			    		
			    	},
					header:{"X-Litemall-Token":this.token},
			    	method: 'GET',
			    	success: (res) => {
			    		let status = res.data.errno;
			    		if (status == 0) {
						this.list=res.data.data.list
							console.log(this.list)
							}
						}
			  })
			},
			upCallback(page) {
				const list = [
					'https://cdn.uviewui.com/uview/swiper/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/8.jpg',
					'https://cdn.uviewui.com/uview/album/9.jpg',
					'https://cdn.uviewui.com/uview/album/10.jpg'
				]
				this.mescroll.endBySize(list.length, 10)
				if (page.num == 1) this.goods = []
				this.goods = this.goods.concat(list)
				// this.mescroll.endErr()
			},
			//点击餐次生成菜单
			clickMeal(e){
				this.mealnum=e.name;		
			},
			changeTime:function(date){
				return myfunction.dateTime(date)
			},
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
			width: 100%;
			height: 115rpx;
			line-height: 115rpx;
			//border: 1px solid red;
			.search-div{
				position: absolute;
				left:0;
				width: 100%;
				
				z-index: -1;
				box-sizing: border-box;
				padding:15rpx 91rpx 14rpx 14rpx;
				//border: 1px solid red;
			}
			.searchbar{
				padding:0 12rpx 0 65rpx;
				height:80rpx;
				background:#fff ;
				border-radius: 40rpx;
				border: 1px solid #ccc;
				width: 100%;
			}
			.search-image{
				position: absolute;
				right: 680rpx;
				top:35rpx;
				width:40rpx ;
				height:40rpx ;
			}
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
		
</style>
