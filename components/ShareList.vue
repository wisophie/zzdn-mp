<template>
  <view class="o-list">
    <view class="o-list__item" v-for="item in list" :key="item.id" @click="toDetail(item)">
      <view class="o-list__item__header u-border-bottom">
        <view class="u-flex u-flex-fill">
          <u-icon name="order" color="#5d51ff" size="18" />
          <text class="ml-1">发布者：{{item.username}}</text>
        </view>
		
		<view class="u-flex type">
		  类型：
		  <text>{{item.category}}</text>
		  
		</view>
        <u--text type="warning" :text="item.extype" />
      </view>
      <view class="o-list__item__content" >
        <view class="o-list__item__content__img">
          <u--image :src="item.img" width="48" height="48" radius="4" />
        </view>
        <view class="o-list__item__content__detail">
          <view class="u-flex">
            <view class="u-flex-fill">{{item.title}}</view>
          
          </view>
          <view class="u-flex mt-2">
            <view class="u-flex-fill miaoshu">
              <text>{{item.detail}}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="o-list__item__footer u-border-top">
        <view class="u-flex u-flex-between">
			<view v-if="item.category=='滞销'">
				地点：{{item.province}}-{{item.city}}-{{item.country}}
			</view>
			<view v-if="item.category=='共享'">
				地点：{{item.province}}-{{item.city}}
			</view>
			<view class="jc"  :class="{judgecolor:item.status==2}" v-if="item.status!==1">
			  <text class="ml-1">{{item.judgestat}}</text>
			</view>
			
		   <view :class="{transfertype:item.transfer==2}" v-if="item.myid==item.userId||item.transfer==2">
			  <text>{{item.transf}}</text>
			</view>
			<view style="font-size:26rpx" v-if="item.status==1">
			  <text>{{item.updateTime.split(' ')[0]}}</text>
			</view>
          
        </view>
        
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data(){
	  return{
		  extype:'ww',
	  }
  },
  
  methods: {
	refresh() {
	  this.$emit('refresh')
	},
	  
    toDetail(id) {
      uni.$u.route('pages_share/share-detail', id)
    },
  }
}
</script>

<style lang="scss" scoped>
.o-list__item + .o-list__item {
  margin-top: 20rpx;
}
.o-list {
  padding: 20rpx;
  &__item {
    background-color: $u-white;
    border-radius: 6px;
    &__header {
      padding: 20rpx 32rpx;
      display: flex;
      align-items: center;
      color: $u-content-color;
    }
    &__footer {
      padding: 20rpx 32rpx;
      color: $u-content-color;
	  text-align: right;
    }
    &__content {
      padding: 32rpx;
      display: flex;
      align-items: center;
      font-size: 13px;
      &__img {
        flex-shrink: 0;
        margin-right: 20rpx;
      }
      &__detail {
        flex: 1;
		.miaoshu{
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			/*显示的行数*/
			overflow: hidden;
		}	
      }
    }
  }
}
.type{
	margin-right:40rpx;
}
.jc{
	color:orange;
}
.judgecolor{
	color:red;
}
.transfertype{
		color:#3fcc44;
	}
</style>
