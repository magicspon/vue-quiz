import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import quiz from './quiz'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		quiz
	},
	strict: debug
})