import {
	mapGetters
} from 'vuex'
import { Checkbox, Radio, Select } from '../ui'

const template =
	`
	<form @submit.prevent="onSubmit">
		<h1>{{ current.id }}</h1>
		<h2>{{ current.text }}</h2>
		<div v-for="question in current.questions">
			<h5 v-if="question.question">{{ question.question }}</h5>

			<div v-if="question.type == 'radio'">
				<quiz-radio :answers="question.answers" :id="question.id" :total="question.totalCorrect" :correctIds="question.correctIds"></quiz-radio>
			</div>

			<div v-if="question.type == 'checkbox'">
				<quiz-checkbox :answers="question.answers" :id="question.id" :total="question.totalCorrect" :correctIds="question.correctIds"></quiz-checkbox>
			</div>

			<div v-if="question.type == 'select'">
				<quiz-select :answers="question.answers" :id="question.id" :total="question.totalCorrect" :correctIds="question.correctIds"></quiz-select>
			</div>
		</div>
		<button @click.prevent="onSubmit">Answer</button>
		<div v-if="showFeedBack">
			{{ response }}
			<div v-if="current.finished">
				<div v-if="nextQuestion">
					<router-link :to="{ path: '/question/' + nextQuestion }">Next</router-link>
				</div>
			</div>
		</div>
	</form>
`

export default {

	data() {
		return {
			showFeedBack: false
		}
	},


	components: {
		'quiz-checkbox': Checkbox,
		'quiz-radio': Radio,
		'quiz-select': Select
	},

	computed: {
		...mapGetters({
			score: 'score',
			currentIndex: 'currentIndex',
			totalQuestions: 'totalQuestions',
			current: 'current',
			response: 'response',
			last: 'last',
			progress: 'progress'
		}),

		nextQuestion() {
			return !this.last && this.currentIndex + 2
		}
	},


	watch: {
		/*
			when the route changes, reset some state stuff, and get the new question
		*/
		'$route' (r) {
			const {
				id
			} = r.params
			this.$store.commit('RESET_QUESTION')
			this.$store.commit('GET_CURRENT_QUESTION', id - 1)

			this.showFeedBack = false
		},

		/*
			watch the score, when true commit the state change
		*/
		score(value) {
			if(value === this.current.questions.length) {
				this.$store.commit('QUESTION_COMPLETE')
			}
		}
	},

	/*
		stops the user from progressing to the next screen 
		with an incorrect answer.. pretty brittle
	*/
	beforeRouteUpdate(to, from, next) {
		if(this.current.finished) {
			this.$store.commit('UPDATE_PROGRESS')
			next()
		}
	},

	beforeRouteEnter(to, from, next) {
		next((vm) => {
			const {
				id
			} = vm.$route.params
			vm.$store.commit('GET_CURRENT_QUESTION', id - 1)
		})
	},

	methods: {
		onSubmit() {
			const feedback = this.current.complete ? 'correct' : 'incorrect'
			this.$store.commit('GET_FEEDBACK', feedback)
			this.showFeedBack = true
		}
	},

	template
}