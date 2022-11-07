	import { setTokenStorage } from './token';
	import logger from '../utils/logger';
	import {genTestUserSig} from '../debug/GenerateTestUserSig.js'
	const app = getApp();
	
	
	export function loginImUser(){
		const {id:userID,avatar:FaceUrl,username:Nick} = uni.getStorageSync('userInfo')
		let usig=genTestUserSig('administrator')
		uni.request({
			url:`https://console.tim.qq.com/v4/im_open_login_svc/account_import?sdkappid=1400755763&identifier=administrator&usersig=eJwtzMEOgjAQBNB-6RVD1upSQ*JJvRgSi4J6bWypGwWxNMRo-HcROM6byXxYlhzC1jgWMx4Cm-SZtKk8FdSz0iVV1Hin-MONg0bfVF2TZvF0DiAQRTQbGvOqyZnOEZEDwKCeyr9FkRDAcSHGF7Ld-4rbzfmppLRBju9qW*x3zpn2sj6Lqz2VKeXHeyKzQFK6ZN8fZOA1Tw__&random=2233221152&contenttype=json`,
			data:{
				   "UserID":userID.toString(),
				   "Nick":Nick,
				   "FaceUrl":FaceUrl
				},
			method:'POST',
			success:(res)=>{	
				console.log(res)
				if(res.data.ActionStatus=='OK'){
					login(userID.toString())
				}
				
			}
		})
	}
	function login(e) {
		const userID = e  //this.userID;
		const userSig = genTestUserSig(userID).userSig;
		const SDKAppID = app.globalData.SDKAppID;
		logger.log(`TUI-login | login  | userSig:${userSig} userID:${userID}`);
		// #ifdef  APP-PLUS
		uni.$aegis.reportEvent({
		    name: 'platform',
		    ext1: 'platform-APP',
		    ext2: 'uniTuikitExternal',
		    ext3: `${SDKAppID}`,
		})
		// #endif
		// #ifdef MP-WEIXIN  
		uni.$aegis.reportEvent({
		    name: 'platform',
		    ext1: 'platform-MP-WEIXIN',
		    ext2: 'uniTuikitExternal',
		    ext3: `${SDKAppID}`,
		})
		// #endif
		// #ifdef H5
		// uni.$aegis.reportEvent({
		//     name: 'platform',
		//     ext1: 'platform-H5',
		//     ext2: 'uniTuikitExternal',
		//     ext3: `${SDKAppID}`,
		// })
		uni.showToast({
			title: 'TUIKit 暂不支持 H5 / web ，请使用者自己完成兼容哦～ ',
			icon: 'none',
			duration: 3000
		});
		// #endif
		app.globalData.userInfo2 = {
			userSig,
			userID
		};
		setTokenStorage({
			userInfo2: app.globalData.userInfo2
		});
		wx.setStorageSync(`TIM_${getApp().SDKAppID}_isTUIKit`, true);
		uni.$TUIKit.login({
			userID: userID,
			userSig: userSig
		}).then(() => {
			uni.$aegis.reportEvent({
			    name: 'login',
			    ext1: 'login-success',
			    ext2: 'uniTuikitExternal',
			    ext3: `${SDKAppID}`,
			})
		}).catch((error) => {
			uni.$aegis.reportEvent({
			    name: 'login',
			    ext1: `login-failed#error:${error}`,
			    ext2: 'uniTuikitExternal',
			    ext3: `${SDKAppID}`,
			})
		})
		
		// 登录原生插件
		// #ifdef APP-PLUS
		if(typeof(uni.$TUICalling) == 'undefined') {
			uni.showToast({
				title: '如果需要音视频功能，请集成插件使用真机运行并且自定义基座调试哦～',
				icon: 'none',
				duration: 3000
			});
			logger.error('请使用真机运行并且自定义基座调试，否则影响音视频功能～ 插件地址：https://ext.dcloud.net.cn/plugin?id=7097 , 调试地址：https://nativesupport.dcloud.net.cn/NativePlugin/use/use');
		} else {
			uni.$TUICalling.login(
				{
					sdkAppID: SDKAppID,
					userID: userID,
					userSig: userSig
				},
				res => {
					console.log(JSON.stringify(res.msg));
					uni.showToast({
						title: 'login',
						icon: 'none'
					});
				}
			);
		}
		
		// #endif
		if (this.path && this.path !== 'undefined') {
			uni.redirectTo({
				url: this.path
			});
		} else {
			// uni.switchTab({
			// 	url: '../TUI-Conversation/conversation/conversation'
			// });
		}
	}