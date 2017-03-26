import debug from 'debug'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import App from './components'

// logs enabled during development
window.log = debug('app:log')
if (process.env.NODE_ENV === 'development') {
	debug.enable('app:log')
} else {
	debug.disable('app:log')
} 

log(`Logging is enabled!, NODE_ENV: ${process.env.NODE_ENV}`)

// keeps vue-router and vuex insync
sync(store, router) 

// render the thing
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})