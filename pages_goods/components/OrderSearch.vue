<template>
	<view class="search u-border">
		<!-- 下拉选择框 -->
		<view class="search-select" v-if="selectList.length > 0">
			<!-- 选中值 -->
			<view class="select-value" @click="selectClick">
				<u-icon
					name="arrow-down"
					size="13"
					:label="selectList[selectIndex].name"
					labelSize="13"
					color="#666"
					space="5"
					labelColor="#666"
					labelPos="left"
				/>
			</view>
			<!-- 选择列表 -->
			<view class="select-item-list" :style="{ display: showSelectList ? 'block' : 'none' }">
				<!-- <view class="">
					<u-icon name="arrow-" />
				</view> -->
				<view
					:class="['select-item', index > 0 ? 'item-border' : '']"
					v-for="(data, index) in selectList"
					:key="index"
					@click="selectItem(index)"
				>
					{{ data.name }}
				</view>
			</view>
		</view>
		<view class="search-content">
			<view class="mx-1"><u-icon name="search" size="16" /></view>
			<input
				:placeholder="placeholder"
				@input="inputChange"
				confirm-type="search"
				@confirm="triggerConfirm"
				class="input"
				:focus="isFocus"
				v-model="inputVal"
				@focus="focus"
				@blur="blur"
			/>
			<view v-if="isDelShow" class="mx-1" @click="clear"><u-icon name="close-circle-fill" color="#999" /></view>
		</view>
		<view class="search-btn">
			<u-button
				size="mini"
				text="搜索"
				shape="circle"
				color="linear-gradient(to right, #C5C1FF, #473AFF)"
				@click="search"
			></u-button>
		</view>

		<view v-show="showSelectList" @click="selectClick" class="page-mask"></view>
	</view>
</template>

<script>
export default {
	props: {
		selectList: {
			type: Array,
			default: [
				// {
				//     id: 1,
				//     name: '产品'
				// },
				// {
				//     id: 2,
				//     name: '内容'
				// }
			]
		},
		placeholder: {
			value: String,
			default: '请输入搜索内容'
		},
		value: {
			type: String,
			default: ''
		},
		button: {
			value: String,
			default: 'outside'
		},
		showSeachIcon: {
			value: Boolean,
			default: true
		},
		showSeachBth: {
			value: Boolean,
			default: true
		},
		radius: {
			value: String,
			default: 60
		}
	},
	data() {
		return {
			showSelectList: false,
			selectIndex: 0,
			isFocus: true,
			inputVal: '',
			searchName: '取消',
			isDelShow: false
		}
	},
	methods: {
		selectItem(index) {
			this.$emit('change',index)
			this.selectIndex = index
			this.showSelectList = !this.showSelectList
		},
		selectClick() {
			this.showSelectList = !this.showSelectList
		},
		triggerConfirm() {
			let searchQuery = {
				keyword: this.inputVal
			}
			if (this.selectList.length > 0) {
				searchQuery.selectIndex = this.selectIndex
			}
			this.$emit('confirm', searchQuery)
		},
		inputChange(event) {
			const keyword = event.detail.value
			this.$emit('input', keyword)
			if (this.inputVal) {
				this.isDelShow = true
			}
		},
		focus() {
			if (this.inputVal) {
				this.isDelShow = true
			}
		},
		blur() {
			this.isFocus = false
			uni.hideKeyboard()
		},
		clear() {
			uni.hideKeyboard()
			this.isFocus = false
			this.inputVal = ''
			this.$emit('input', '')
		},
		getFocus() {
			this.isFocus = true
		},
		search() {
			let searchQuery = {
				keyword: this.inputVal
			}
			if (this.selectList.length > 0) {
				searchQuery.selectIndex = this.selectIndex
			}
			this.$emit('search', searchQuery)
		}
	},
	watch: {
		inputVal(newVal) {
			if (!newVal) {
				this.isDelShow = false
			}
		},
		value(val) {
			this.inputVal = val.trim()
		}
	}
}
</script>

<style lang="scss" scoped>
.mx-1 {
	margin: 0 4px;
}
.search {
	display: flex;
	align-items: center;
	height: 34px;
	line-height: 34px;
	border-radius: 16px;
	font-size: 14px;
	.search-select {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 8px;
		color: $u-content-color;
		position: relative;
		&::after {
			content: '';
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 24px;
			width: 1px;
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
	.search-content {
		flex: 1;
		display: flex;
		align-items: center;
		.input {
			flex: 1;
			font-size: 26rpx;
		}
	}
	.search-btn {
		padding: 0 8px;
	}
	.select-item-list {
		background-color: #fff;
		position: absolute;
		top: 42px;
		width: 180rpx;
		left: -2px;
		border-radius: 10rpx;
		z-index: 10;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

		.select-item {
			text-align: center;
			padding: 10rpx 0;
			font-size: 26rpx;
		}

		.item-border {
			border-top: 1rpx solid $u-border-color;
		}
	}
	.page-mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 5;
	}
}
</style>
