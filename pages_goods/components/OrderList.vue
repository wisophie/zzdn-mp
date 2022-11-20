<template>
	<view class="o-list">
		<view class="o-list__item" v-for="item in list" :key="item.id">
			<view class="o-list__item__header u-border-bottom">
				<view class="u-flex u-flex-fill">
					<u-icon name="order" color="#5d51ff" size="18" />
					<text class="ml-1">询价单号：{{ item.orderSn }}</text>
				</view>
				<u--text type="warning" :text="item.orderStatusText" />
			</view>
			<view class="o-list__item__content" v-for="item1 in item.goodsList" :key="item1.id" @click="toDetail(item.id)">
				<view class="o-list__item__content__img">
					<u--image :src="item1.picUrl" width="48" height="48" radius="4" />
				</view>
				<view class="o-list__item__content__detail">
					<view class="u-flex">
						<view class="u-flex-fill">商品名称：{{ item1.goodsName }}</view>
						<view>￥{{ item1.price }}</view>
					</view>
					<view class="u-flex mt-2">
						<!-- <view class="u-flex-fill">
              <text>规格：xxx</text>
              <text class="ml-2">型号：xxx</text>
            </view> -->
						<view>x{{ item1.number }}</view>
					</view>
				</view>
			</view>
			<view class="o-list__item__footer">
				<view>
					用户：
					<text>{{ item.nickname }}</text>
				</view>
				<view>
					合计：
					<text>￥{{ item.actualPrice }}</text>
					<text>(含运费{{ item.freightPrice }})</text>
				</view>
			</view>
			<template v-if="userInfo">
				<!-- 采购商 -->
				<view class="o-list__item__btns u-border-top" v-if="userInfo.userLevel === 2">
					<!-- 101 -->
					<template v-if="item.orderStatus == 101">
						<view class="o-list__item__btns__item"><u-button type="primary" size="small" text="立即支付" /></view>
						<view class="o-list__item__btns__item">
							<u-button size="small" text="取消订单" @click="cancel(item.id)" />
						</view>
					</template>
					<!-- 201 -->
					<template v-if="item.orderStatus == 201 || item.orderStatus == 204">
						<view class="o-list__item__btns__item">
							<u-button size="small" text="申请退款" @click="commentRefund(item)" />
						</view>
					</template>
					<!-- 301 -->
					<template v-if="item.orderStatus == 301">
						<view class="o-list__item__btns__item">
							<u-button type="primary" size="small" text="确认收货" @click="receive(item.id)" />
						</view>
					</template>
					<!-- 401 -->
					<template v-if="item.orderStatus == 401">
						<!-- <view class="o-list__item__btns__item"><u-button size="small" text="申请退货" /></view> -->
						<!-- <view class="o-list__item__btns__item">
							<u-button size="small" text="申请售后" @click="toAftersale(item.id)" />
						</view> -->
						<view class="o-list__item__btns__item">
							<u-button size="small" text="删除订单" @click="remove(item.id)" />
						</view>
						<view class="o-list__item__btns__item">
							<u-button type="primary" size="small" text="打赏平台" @click="give" />
						</view>
						<!-- 	<view class="o-list__item__btns__item">
							<u-button type="primary" size="small" text="去评价" @click="onComment(item)" />
						</view> -->
					</template>
					<!-- 402 -->
					<template v-if="item.orderStatus == 402">
						<!-- 	<view class="o-list__item__btns__item">
							<u-button size="small" text="申请售后" @click="toAftersale(item.id)" />
						</view> -->
						<view class="o-list__item__btns__item">
							<u-button size="small" text="删除订单" @click="remove(item.id)" />
						</view>
						<view class="o-list__item__btns__item">
							<u-button type="primary" size="small" text="打赏平台" @click="give" />
						</view>
						<!-- 	<view class="o-list__item__btns__item">
							<u-button type="primary" size="small" text="去评价" @click="onComment(item)" />
						</view> -->
					</template>
				</view>
				<!-- 供应商 -->
				<view class="o-list__item__btns u-border-top" v-if="userInfo.userLevel === 1">
					<template v-if="item.orderStatus == 101">
						<view class="o-list__item__btns__item">
							<u-button size="small" text="修改订单" @click="updateOrder(item)" />
						</view>
					</template>
					<template v-if="item.orderStatus == 201">
						<view class="o-list__item__btns__item"><u-button size="small" text="发货" @click="delivery(item)" /></view>
					</template>
					<template v-if="item.orderStatus == 202">
						<view class="o-list__item__btns__item">
							<u-button size="small" text="拒绝退款" @click="onRefuse(item)" />
						</view>
						<view class="o-list__item__btns__item">
							<u-button size="small" text="同意退款" @click="onAgree(item)" />
						</view>
					</template>
					<template v-if="item.orderStatus == 401">
						<view class="o-list__item__btns__item">
							<u-button type="primary" size="small" text="打赏平台" @click="give" />
						</view>
					</template>
					<template v-if="item.orderStatus == 402">
						<view class="o-list__item__btns__item">
							<u-button type="primary" size="small" text="打赏平台" @click="give" />
						</view>
					</template>
				</view>
			</template>
		</view>
		<u-popup :show="showC" mode="bottom" closeOnClickOverlay @close="showC = false">
			<view class="comment">
				<u-textarea v-model="comment" placeholder="请输入评论" count></u-textarea>
				<view class="mt-4"><u-button type="primary" text="发表评论" @click="commentSubmit" /></view>
			</view>
		</u-popup>
		<u-popup :show="showR" mode="bottom" closeOnClickOverlay @close="showR = false">
			<view class="comment">
				<u-textarea v-model="commentR" placeholder="请输入退款理由" count></u-textarea>
				<view class="mt-4"><u-button type="primary" text="申请退款" @click="commentRSubmit" /></view>
			</view>
		</u-popup>
		<u-popup :show="showMoney" mode="bottom" closeOnClickOverlay @close="closeMoney">
			<view class="comment">
				<u-input v-model="money" :placeholder="agree ? '请输入退款金额' : '请输入拒绝理由'"></u-input>
				<view class="mt-4"><u-button type="primary" text="确认" @click="confirmMoney" /></view>
			</view>
		</u-popup>
		<u-popup :show="showShip" mode="bottom" closeOnClickOverlay @close="closeShip">
			<view class="comment">
				<view class="py-1"><u-input v-model="shipSn" placeholder="若无，请填写无"></u-input></view>
				<view class="py-1"><u-input v-model="shipChannel" placeholder="若无，请填写自提/送货其他方式"></u-input></view>
				<view class="mt-4"><u-button type="primary" text="确认" @click="confirmShip" /></view>
			</view>
		</u-popup>
		<u-popup :show="showUo" mode="bottom" closeOnClickOverlay @close="closeUo">
			<view class="comment">
				<view class="py-1"><u-input v-model="uoForm.actualPrice" placeholder="请输入订单总价"></u-input></view>
				<view class="py-1"><u-input v-model="uoForm.message" placeholder="请输入用户留言信息"></u-input></view>
				<view class="mt-4"><u-button type="primary" text="确认" @click="confirmUo" /></view>
			</view>
		</u-popup>
		<u-modal
			:show="showGive"
			title="扫码打赏平台~"
			closeOnClickOverlay
			@close="showGive = false"
			@confirm="showGive = false"
		>
			<u-image
				src="https://steel-ren.oss-cn-beijing.aliyuncs.com/y1cvhp64uxpk5uvhw6v6.jpg"
				width="400rpx"
				height="540rpx"
			></u-image>
		</u-modal>
	</view>
</template>

<script>
// 101 订单生成，未支付；102，下单未支付用户取消；103，下单未支付超期系统自动取消
// 201 支付完成，商家未发货；202，订单生产，已付款未发货，用户申请退款；203，管理员执行退款操作，确认退款成功；
// 301 商家发货，用户未确认；
// 401 用户确认收货，订单结束； 402 用户没有确认收货，但是快递反馈已收货后，超过一定时间，系统自动确认收货，订单结束。
// 当101用户未付款时，此时用户可以进行的操作是取消或者付款
// 当201支付完成而商家未发货时，此时用户可以退款
// 当301商家已发货时，此时用户可以有确认收货
// 当401用户确认收货以后，此时用户可以进行的操作是退货、删除、去评价或者再次购买
// 当402系统自动确认收货以后，此时用户可以删除、去评价、或者再次购买
const statusMap = {
	101: '待支付',
	102: '未支付已取消',
	103: '超时已取消',
	201: '待发货',
	202: '申请退款',
	203: '已退款',
	301: '待收货',
	401: '确认收货',
	402: '确认收货(系统)'
}
// userInfo {
// 	certify: 是否已实名 false 未实名 true 已实名
// 	userLevel: 账户身份 0 游客，1 供货商，2 采购商
// }
import {
	commentApi,
	removeApi,
	cancelApi,
	refundApi,
	agreeApi,
	refuseApi,
	deliveryApi,
	receiveApi,
	updateOrderApi
} from '@/api/order'
export default {
	props: {
		list: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			showC: false,
			comment: '',
			current: null,
			showR: false,
			commentR: '',
			agree: false,
			showMoney: false,
			money: '',
			userInfo: null,
			showShip: false,
			shipSn: '',
			shipChannel: '',
			showUo: false,
			uoForm: {
				message: '',
				actualPrice: ''
			},
			showGive: false
		}
	},
	mounted() {
		this.userInfo = uni.getStorageSync('userInfo')
	},
	methods: {
		refresh() {
			this.$emit('refresh')
		},
		getStatus(s) {
			return statusMap[s] || ''
		},
		toDetail(id) {
			uni.$u.route('/pages_goods/order-detail', { id })
		},
		onComment(item) {
			this.current = item
			this.showC = true
		},
		commentSubmit() {
			const data = {
				orderGoodsId: this.current.goodsList[0].goodsId,
				content: this.comment
			}
			commentApi(data).then(res => {
				uni.$u.toast('评论成功！')
				this.comment = ''
				this.showC = false
			})
		},
		commentRefund(item) {
			this.current = item
			this.showR = true
		},
		commentRSubmit() {
			const data = {
				orderId: this.current.id,
				applyRefundContent: this.commentR
			}
			refundApi(data).then(res => {
				uni.$u.toast('申请成功！')
				this.commentR = ''
				this.showR = false
				this.refresh()
			})
		},
		remove(id) {
			uni.showModal({
				title: '提示',
				content: '是否确认删除该订单？',
				success: res => {
					if (res.confirm) {
						removeApi({ orderId: id }).then(res => {
							uni.$u.toast('删除成功！')
							this.refresh()
						})
					}
				}
			})
		},
		cancel(id) {
			uni.showModal({
				title: '提示',
				content: '是否确认取消该订单？',
				success: res => {
					if (res.confirm) {
						cancelApi({ orderId: id }).then(res => {
							uni.$u.toast('取消成功！')
							this.refresh()
						})
					}
				}
			})
		},
		receive(id) {
			receiveApi({ orderId: id }).then(res => {
				this.refresh()
			})
		},
		delivery(item) {
			this.current = item
			this.showShip = true
		},
		closeShip() {
			this.shipChannel = ''
			this.shipSn = ''
			this.showShip = false
		},
		confirmShip() {
			deliveryApi({ orderId: this.current.id, shipSn: this.shipSn, shipChannel: this.shipChannel }).then(res => {
				this.showShip = false
				uni.$u.toast('发货成功！')
				this.refresh()
			})
		},
		onAgree(item) {
			this.agree = true
			this.current = item
			this.showMoney = true
		},
		onRefuse(item) {
			this.agree = false
			this.current = item
			this.showMoney = true
		},
		confirmMoney() {
			if (this.agree) {
				agreeApi({ orderId: this.current.id, refundMoney: this.money }).then(res => {
					uni.$u.toast('已同意退款')
					this.refresh()
				})
			} else {
				refuseApi({ orderId: this.current.id, rejectReason: this.money }).then(res => {
					uni.$u.toast('已拒绝退款')
					this.refresh()
				})
			}
		},
		closeMoney() {
			this.money = ''
			this.showMoney = false
		},
		toAftersale(id) {
			uni.$u.route('/pages_goods/aftersale')
		},
		updateOrder(item) {
			this.current = item
			this.showUo = true
		},
		closeUo() {
			this.uoForm = {
				message: '',
				actualPrice: ''
			}
			this.showUo = false
		},
		confirmUo() {
			const data = {
				...this.uoForm,
				orderId: this.current.id
			}
			updateOrderApi(data).then(res => {
				uni.$u.toast('修改成功')
				this.refresh()
				this.showUo = false
			})
		},
		give() {
			this.showGive = true
		}
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
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&__btns {
			padding: 20rpx 32rpx;
			display: flex;
			justify-content: flex-end;
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
			}
		}
	}
}
.o-list__item__btns__item + .o-list__item__btns__item {
	margin-left: 10px;
}
.comment {
	padding: 32rpx;
}
</style>
