import Vue from 'vue'
import Vuex from 'vuex'
import quiz from './quiz'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

/*
	we could put all of the state into one object
	state: quiz,
	but hey, let's split things up
*/
export default new Vuex.Store({
	modules: {
		quiz
	},
	strict: debug
})