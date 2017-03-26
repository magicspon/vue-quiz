import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '../components/Intro'
import Question from '../components/Question'
import Finish from '../components/Finish'

Vue.use(VueRouter)

export default new VueRouter({
	routes: [
		{
			path: '/',
			name: 'intro',
			component: Intro
		},
		{
			name: 'question',
			path: '/question/:id',
			component: Question
		},
		{
			name: 'finish',
			path: '/finish',
			component: Finish
		},
	]
})