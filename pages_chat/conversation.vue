<template>
	<view class="container-conversation">
		<view class="scroll-box">
			<view class="uni-list margintop-bar">
				<view v-for="item in conversationList" :key="item.conversationID" @tap="handleRoute(item.conversationID)">
					<TUI-conversation-item :data-type="item.type" :conversation="item"></TUI-conversation-item>
				</view>
			</view>
		</view>
		<view class="bottom-back">
			<view class="bottom-area">
				<view v-if="showSelectTag" class="conversation-bubble" @tap.stop="handleEditToggle">
					<view v-for="(item, index) in array" :key="index" class="picker" :data-name="item.name" @tap="handleOnTap">{{ item.name }}</view>
				</view>
				<image @tap="showMore" class="btn-show-more" src="./static/assets/add.svg"></image>
				<view @tap="learnMore" class="im-link">了解更多IM功能</view>
			</view>
		</view>
	</view>
</template>
<!-- 这里有个加载的补丁逻辑待优化，页面向SDK请求conversationList的时候会有时延，
造成页面的一个抖动，这里加一个if逻辑打一个补丁，后续继续优化 -->
<script>

import logger from '@/utils/logger';
import TUIConversationItem from './conversation-item/index';
import TUIMessageList from './message-list/index';

export default {
	data() {
		return {
			conversationList: [],
			showSelectTag: false,
			array: [
				{
					name: '发起会话'
				},
				{
					name: '发起群聊'
				},
				{
					name: '加入群聊'
				}
			],
		};
	},

	components: {
		TUIConversationItem,
		TUIMessageList
	},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	
	
	onShow(){
		
		
		uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
		this.getConversationList();
		this.reddot()
	},
	
	onLoad() {
		// 登入后拉去会话列表
		
		
	}, 
      
	/**
	 * 生命周期函数--监听页面卸载
	 */
	onHide() {
		
		uni.$TUIKit.off(uni.$TUIKitEvent.SDK_READY, this.onConversationListUpdated);
		this.getConversationList();
		this.reddot()
	},
   
	methods: {
		reddot(){
			if(this.$totalunread!==0){
				uni.setTabBarBadge({ //显示数字
				  index: 3,//tabbar下标
				  text: this.$totalunread.toString() //数字
				})
			}else{
				uni.removeTabBarBadge({ //显示数字
				  index: 3,//tabbar下标
				  
				})
			}
		},
		handleRoute(id) {
			const url = `./chat?conversationID=${id}`;
			console.log(id)
			uni.navigateTo({
				url
			});
		},
		onConversationListUpdated(event) {
			logger.log('TUI-conversation | onConversationListUpdated  |ok');
			this.setData({
				conversationList: event.data
			});
			
		},

		getConversationList() {
			uni.$TUIKit.getConversationList().then(imResponse => {
				logger.log(`TUI-conversation | getConversationList | getConversationList-length: ${imResponse.data.conversationList.length}`);
				this.setData({
					conversationList: imResponse.data.conversationList
				});
				var it=imResponse.data.conversationList
				this.$totalunread=it.reduce((pre,cur)=>{
					return pre+cur.unreadCount
				},0)
			});
		},

		showMore() {
			this.setData({
				showSelectTag: !this.showSelectTag
			});
		},

		learnMore() {
			uni.navigateTo({
				url: '../../TUI-User-Center/webview/webview?url=https://cloud.tencent.com/product/im'
			});
		},

		handleOnTap(event) {
			this.setData(
				{
					showSelectTag: false
				},
				() => {
					switch (event.currentTarget.dataset.name) {
						case '发起会话':
							this.$createConversation();
							break;

						// case '发起群聊':
						// 	this.$createGroup();
						// 	break;

						// case '加入群聊':
						// 	this.$joinGroup();

						default:
							break;
					}
				}
			);
		},

		goHomePage() {
			// uni.navigateTo 不能跳转到 tabbar 页面，使用 uni.switchTab 代替
			uni.switchTab({
				url: '../../TUI-Index/index'
			});
		},

		handleEditToggle() {
			this.setData({
				showSelectTag: false
			});
		},

		$createConversation() {
			uni.navigateTo({
				url: './create'
			});
		},

		// $createGroup() {
		// 	uni.navigateTo({
		// 		url: '../../TUI-Group/create-group/create'
		// 	});
		// },

		// $joinGroup() {
		// 	uni.navigateTo({
		// 		url: '../../TUI-Group/join-group/join'
		// 	});
		// }
	}
};
</script>
<style scoped>
@import './conversation.css';
</style>
