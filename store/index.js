import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
	plugins: [
		createPersistedState({
			key: 'xxx',
			paths: ['token', 'userInfo'],
			storage: {
				getItem: (key) => uni.getStorageSync(key),
				setItem: (key, value) => uni.setStorageSync(key, value),
				removeItem: (key) => uni.removeStorageSync(key)
			}
		})
	],
	state: {
		token: null,
		userInfo: null,
	},
	getters: {},
	mutations: {
		setToken(state, payload) {
			state.token = payload
		},
		setUserInfo(state) {
			state.token = null
		},
	},
	actions: {}
})
export default store
