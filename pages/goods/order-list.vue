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
		<view class="top-wrap">
			<u-input prefixIcon="search" shape="circle" placeholder="请输入订单号/货品编码/用户名">
				<template slot="suffix">
					<u-button
						size="mini"
						text="搜索"
						shape="circle"
						color="linear-gradient(to right, #C5C1FF, #473AFF)"
					></u-button>
				</template>
			</u-input>
			<view class="o-tabs">
				<view
					class="o-tabs__item"
					:class="{ active: item.id === tabId }"
					v-for="item in tabs"
					:key="item.id"
					@click="changeTab(item.id)"
				>
					{{ item.name }}
				</view>
			</view>
			<view class="o-dates">
				<view @click="showPicker('start')">
					<u-input
						:value="startDate"
						disabled
						disabledColor="#ffffff"
						placeholder="开始时间"
						prefixIcon="calendar"
						prefixIconStyle="font-size: 20px;color: #909399"
					/>
				</view>
				<text class="mx-2 u-tips-color">至</text>
				<view @click="showPicker('end')">
					<u-input
						:value="endDate"
						disabled
						disabledColor="#ffffff"
						placeholder="结束时间"
						prefixIcon="calendar"
						prefixIconStyle="font-size: 20px;color: #909399"
					/>
				</view>
			</view>
		</view>
		<order-list :list="goods" />
		<u-datetime-picker
			v-model="initDate"
			:show="showDate"
			mode="date"
			closeOnClickOverlay
			@confirm="confirmDate"
			@cancel="showDate = false"
			@close="showDate = false"
		/>
	</mescroll-body>
</template>

<script>
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
import OrderList from '@/components/OrderList'

export default {
	mixins: [MescrollMixin], // 使用mixin
	components: { OrderList },
	data() {
		return {
			tabId: 1,
			tabs: [
				{
					id: 1,
					name: '全部'
				},
				{
					id: 2,
					name: '待支付'
				},
				{
					id: 3,
					name: '进行中'
				},
				{
					id: 4,
					name: '已完成'
				},
				{
					id: 5,
					name: '已关闭'
				}
			],
			showDate: false,
			initDate: Number(new Date()),
			dateType: '',
			startDate: '',
			endDate: '',
			downOption: {
				native: true
			},
			upOption: {
				noMoreSize: 0
			},
			goods: [], // 数据列表
			curWord: '' //当前搜索关键词
		}
	},
	computed: {
		date() {
			return [this.startDate, this.endDate]
		}
	},
	watch: {
		date: {
			handler(value) {
				if (value[0] && value[1]) {
					const start = new Date(value[0]).getTime()
					const end = new Date(value[1]).getTime()
					if (start > end) {
						uni.$u.toast('开始时间不得大于结束时间')
					} else {
						this.mescroll.resetUpScroll()
					}
				}
			},
			deep: true
		}
	},
	methods: {
		// 输入监听
		inputWord(e) {
			// this.curWord = e.detail.value // 已使用v-model,无需再次赋值
			// 节流,避免输入过快多次请求
			this.searchTimer && clearTimeout(this.searchTimer)
			this.searchTimer = setTimeout(() => {
				this.doSearch(this.curWord)
			}, 300)
		},
		// 搜索
		doSearch(word) {
			this.curWord = word
			this.goods = [] // 先清空列表,显示加载进度
			this.mescroll.resetUpScroll()
		},
		changeTab(id) {
			if (this.tabId === id) return
			this.tabId = id
			this.mescroll.resetUpScroll(true)
		},
		showPicker(type) {
			uni.hideKeyboard()
			this.dateType = type
			this.showDate = true
		},
		confirmDate(e) {
			const date = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
			if (this.dateType === 'start') this.startDate = date
			if (this.dateType === 'end') this.endDate = date
			this.showDate = false
		},
		/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
		upCallback(page) {
			const list = [
				'https://cdn.uviewui.com/uview/album/1.jpg',
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
		}
	}
}
</script>

<style lang="scss" scoped>
.top-wrap {
	z-index: 9990;
	position: sticky;
	// position: fixed;
	top: var(--window-top); /* css变量 */
	left: 0;
	width: 100%;
	padding: 10px 16px;
	background-color: $u-white;
}
.o-tabs {
	margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	&__item {
		padding: 0 10px;
		height: 32px;
		line-height: 32px;
		color: $u-tips-color;
		background: $u-bg-color;
		border-radius: 6px;
		&.active {
			color: $u-white;
			background: $u-primary;
		}
	}
}
.o-dates {
	margin-top: 10px;
	display: flex;
	align-items: center;
}
</style>
