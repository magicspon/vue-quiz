import {
	mapGetters
} from 'vuex'

const template = 
`
<div>
	<header>Quiz</header>
	<div v-if="loaded">
		<router-view></router-view>
	</div>
</div>
`

export default {

	data() {
		return {
			loaded: false
		}
	},

	computed: mapGetters({
		questions: 'questions',
		score: 'score',
		currentIndex: 'currentIndex',
		totalQuestions: 'totalQuestions'
	}),

	watch: {
		questions() {
			this.loaded = true
		}
	},

	created() {
		this.$store.dispatch('fetch')
	},

	template
}