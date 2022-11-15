<template>
	<view>
		
		<view class="g-section">
			
			
		  <view class="text-md text-bold">{{list.topic}}</view>
		  <view class='mt-2 u-tips-color text-s'>
			  <text >发布人：{{list.username}}</text>
			  <view class="judge">
			  	<text class="judgetype" :class="{judgetyper:list.status==2}" v-if="list.status!=1">{{judgestat}}</text>
			  	<text class="judgetyper" v-if="list.status==2">：{{list.rejectReason}}</text>
			  </view>
		  </view>
		  <view class='mt-2 u-tips-color text-s'>
		  			 <u-upload
		  			 	:fileList="banner"
		  			 	@afterRead="afterRead($event)"
		  			 	@delete="deletePic($event, 'url')"
		  			 	:deletable='false'
		  			 	name="4"
		  			 	multiple
		  			 	:maxCount="0"
		  			 ></u-upload>
		  </view>
		 
		</view>
		<view class="g-section os-price u-border-top u-border-bottom">
			<view class="os-price__row">
				<text class="os-price__row__label">投票类型</text>
				<text class="os-price__row__value">{{extype}}</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">反馈类目</text>
				<text class="os-price__row__value">{{list.feedbackType}}</text>
			</view>
			<view class="os-price__row">
				<text class="os-price__row__label">发布时间</text>
				<text class="os-price__row__value">{{list.options[0].updateTime}}</text>
			</view>
			
		</view>
		<view class="g-section">
		  <view class="pb-4 text-md text-bold">详情</view>
		  <view>
		    {{list.progress}}
		  </view>
		  <view class="mission mt-1 u-tips-color text-md">
		    <text></text>
		    <text class="u-warning"></text>
		    <text class="u-warning text-bold text-md"></text>
		  </view>
		  <view class="votelist" v-if='list.type==1'>
			  <u-radio-group v-model="value2" placement="column" iconPlacement="right" :borderBottom="true">
			  			  <view class='select' v-if="formlength>=1">
							  <text class="a">支持</text>
			  				  <u-radio activeColor="green" :label="form[0].content" name='0'></u-radio>
			  				  <u-line-progress :percentage="arate" :showText="true" ></u-line-progress>
			  			  </view>
			  	<view class='select' v-if="formlength>=2">
					<text class="a">支持</text>
					  <u-radio activeColor="green" :label="form[1].content" name='1'></u-radio>
					  <u-line-progress :percentage="brate" :showText="true" ></u-line-progress>
			  	</view>
			  			<view class='select' v-if="formlength>=3">
							<text class="a">支持</text>
						  <u-radio activeColor="green" :label="form[2].content" name='2'></u-radio>
						  <u-line-progress :percentage="crate" :showText="true" ></u-line-progress>
			  			</view>
			  			<view class='select' v-if="formlength>=4">
							<text class="a">支持</text>
							 <u-radio activeColor="green" :label="form[3].content" name='3'></u-radio>
							 <u-line-progress :percentage="drate" :showText="true" ></u-line-progress>
			  			</view>
			  			
			  
			  </u-radio-group>
		  </view>
		  <view class="votelist" v-if='list.type==0'>
			  <u-radio-group v-model="value" @change="groupChange" placement="column" iconPlacement="right" :borderBottom="true">
				  <view class='select'>
						<text class="a">支持</text>
						<u-radio activeColor="green" :label="support" name="1"></u-radio>
					  <u-line-progress :percentage="suprate" :showText="true" height="12"></u-line-progress>
				  </view>
				<view class='select'>
					  <text class="b">反对</text>
					  <u-radio activeColor="red" :label="obj" name="0"></u-radio>
					  <u-line-progress :percentage="objrate" :showText="true" activeColor="#ff0000" height="12"></u-line-progress>
				</view>
			  </u-radio-group>
		  </view>
		  
		</view>
		
		<view class="b-footer">
		 
		 <view class="b-footer__right" v-if='list.userId==myid' @click="toPage('pages_platform/vote-edit',list)">
		    <text class="bt" >编辑投票内容</text>
		  </view>
		  <view class="b-footer__right submitvote" v-if='list.userId!=myid' @click="Vote">
		     <text class="bt" >提交投票</text>
		   </view>
		  <view class="b-footer__left" v-if='list.userId!=myid'>
		  			  <view @tap="handleRoute" class="u">
		  				  <u-icon name="chat"  color="#303133" size="28" />
		  				  <text>联系他</text>
		  			  </view>
		    
		  </view>
		</view>
		<view class='more' @click="show2 = true">
					  <text>更多</text>
		</view>
		<u-action-sheet
					:show="show2"
					@close="show2 = false"
					:actions="actions2"
					@select="selectClick"
					cancelText="取消"
				>
				</u-action-sheet>
	</view>
	
</template>

<script>
	import { getVoteDetail,deleteVote,toVote} from '@/api/vote'
	export default {
		data() {
			return {
				
			actions2: [{
							name: '删除投票',
						},
							
					],
			show2: false,
			list:{},
			extype:'',
			banner:[],
			len:2,
			value:1,
			myid:0,
			support:0,
			obj:0,
			suprate:0,
			objrate:0,
			formlength:2,
			form:[{
				content:'',
				count:'',
			},{
				content:'',
				count:'',
			},{
				content:'',
				count:'',
			},{
				content:'',
				count:'',
			}],
			arate:0,
			brate:0,
			crate:0,
			drate:0,
			sum:0,
			value2:0,
			judgestat:'',
			};
		},
		onLoad(id){	
			this.judgestat=id.judgestat
			this.togetVoteDetail(id)
		},
		// onShow(id) {
		  
		//  this.togetVoteDetail(id)
		// },
		computed:{
			cid(){
			  this.myid=uni.getStorageSync('userInfo').id
			},
			rate(){
				this.suprate=(this.support/(this.support+this.obj))*100
				this.objrate=(this.obj/(this.support+this.obj))*100
			},
			rate2(){
				if(this.formlength==2){
					this.arate=(this.form[0].count/this.sum)*100
					this.brate=(this.form[1].count/this.sum)*100
				}else if(this.formlength==3){
					this.arate=(this.form[0].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.brate=(this.form[1].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.crate=(this.form[2].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
				}else if(this.formlength==4){
					this.arate=(this.form[0].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.brate=(this.form[1].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.crate=(this.form[2].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
					this.drate=(this.form[3].count/(this.form[0].count+this.form[1].count+this.form[2].count))*100
				}
				
				
			}
		},
		methods:{
			groupChange(e){
				this.value=e
				console.log(this.value)
				console.log(this.list.options[this.value].id)
			},
			togetpics(item){
				
				if(item.pics==undefined){
				this.len=0
				}else{
					const banners=item.pics.split(",")
					const temp =[{ url: 1 },{ url: 1 }]
					this.banner= temp.map(((o, i) => ({ 
					url: banners[i]})))
					
					if(this.banner[1].url==undefined){
						this.banner.pop()
					}
					this.len=this.banner.length
				}
				
			},
			togetVoteDetail(item){
				const params={
					id:item.id
				}
				getVoteDetail(params).then(res=>{
					
					this.list = res.data
					console.log(this.list)
					this.extype={'0':'订单纠纷','1':'意见反馈'}[this.list.type]
					if(this.list.type==0){
						this.support=this.list.options[1].count
						this.obj=this.list.options[0].count
					}else{
						this.formlength=this.list.options.length
						this.form.forEach((e,i)=>{
							e.content=this.list.options[i].content;
							e.count=this.list.options[i].count;
							this.sum+=e.count
							//console.log(this.sum)
						})
					}
					
				})
				this.togetpics(item)
			},
			Vote(){
				if(this.list.type==1){
					this.value=this.value2
				}
				console.log(this.list.options[this.value].id,this.value2)
				const data={
					id:this.list.options[this.value].id
				}
				toVote(data).then(res=>{
					console.log(res)
					if(res.errmsg=='成功'){
						uni.$u.toast('投票成功！')
						if(this.value==1){
							this.support++
						}else{
							this.obj++
						}
						if(this.value2==0){ 
							this.form[0].count++
						}else if(this.value2==1){ 
							this.form[1].count++
						}else if(this.value2==2){ 
							this.form[2].count++
						}else if(this.value2==3){ 
							this.form[3].count++
						}
					}
					
				})
			
			},
			handleRoute() {
				const id =this.list.userId
				const url = `../pages_chat/chat?conversationID=C2C${id}`;
				uni.navigateTo({
					url
				});
			},
			// 删除图片
			deletePic(event, key) {
			     this.banner.splice(event.index,1)
			},
			// 新增图片
			async afterRead(event, key) {
				
			  let lists = [].concat(event.file)
			  let fileListLen = this.banner.length
			  lists.map(item => {
			    this.banner.push({
			      ...item,
			      status: 'uploading',
			      message: '上传中'
			    })
			  })
			  for (let i = 0; i < lists.length; i++) {
			    let type = null
			    uploadApi(lists[i].url, type)
			      .then(res => {
			        const result = res.data
					//console.log(result)
			        let item = this.banner[fileListLen]
			        this.banner.splice(
			          fileListLen,
			          1,
			          Object.assign(item, {
			            status: 'success',
			            message: '',
			            url: result
			          })
			        )
			        fileListLen++
			      })
			      .catch(err => {
			        this.banner.splice(
			          fileListLen,
			          1,
			          Object.assign(item, {
			            status: 'fail',
			            message: '上传失败'
			          })
			        )
			        fileListLen++
			      })
			  }
			},
			toPage(url,id) {
				uni.$u.route(url,id)
			},
			selectClick(index){
				if(index.name=='删除投票'){
					const data={
						id:this.list.id
					}
					uni.showModal({
					  title: '提示',
					  content: '是否确认删除该投票？',
					  success: res => {
					    if (res.confirm) {
					      deleteVote(data).then(res => {
					        uni.$u.toast('删除成功！')
					      })
						  uni.setStorageSync("currentIndex", 1)
						  this.canceldingdan()
					    }
					  }
					})
				
				}
						console.log(index)
				},
				canceldingdan(){
					//uni.navigateBack()
					uni.switchTab({
						url:'/pages/platform/platform',
					
					})
				
				},
		}
	}
</script>
<style>
page {
	background-color: #fff;
	height:100vh;
}
</style>

<style lang="scss" scoped>
	
.g-section {
  width: 750rpx;
  padding: 14rpx 16rpx;
  background-color: #fff;
}
.os-price__row + .os-price__row {
	margin-top: 10px;
	
}
.os-price {
	
	&__row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: $u-main-color;
		line-height: 1.6;
		&__label {
			color: $u-content-color;
		}
	}
}
.mission{
	text-align: right; 
	margin-right:10rpx;
	margin-top:100rpx;
}

.b-footer {
	position: absolute;
	bottom:60rpx;
	left:5rpx;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top:40rpx;
	padding: 0 32rpx;
	height:75rpx;
	&__right{
		display: flex;
		align-items: center;
		margin-left: 32rpx;
		border-radius: 40rpx;
		padding: 10rpx 40rpx;
		color: $uni-color-error;
		background-color: #fff;
		border:1px solid $uni-color-error;
	}
	&__left{
		display: flex;
		align-items: center;
		border-radius: 40rpx;
		padding: 10rpx 40rpx;
		margin-left: 50rpx;
		background-color: $u-white;
		border:1px solid #ccc;
		
	}
	.submitvote{
		color: $u-white;
		background-color: $u-primary;
		border:1px solid $u-primary;
	}
	.u{ display: flex;
		justify-content: center;
		align-items: center;
		
	}

}
.more{
	position: absolute;
	bottom:70rpx;
	left:20rpx;
}
.select{
	margin-bottom:30rpx;
	.a{
	  position:absolute;
	  right:90rpx;
	}
	.b{
	  position:absolute;
	  right:90rpx;
	}
}

.votelist{
	margin:0 20rpx;
}
.judge{
	float:right;
	.judgetype{
		color:orange;
	}
	.judgetyper{
		color:red;
	}
}
</style>

