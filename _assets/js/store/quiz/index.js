import * as types from '../types'
import {
	fetchQuestionJson
} from '../../api'
import { insertAtIndex } from '../../helpers/utils'

const state = {
	questions: [],
	score: 0,
	currentIndex: 0,
	response: '',
	current: {},
	progress: 0
}

const getters = {
	questions: state => state.questions,
	score: state => state.score,
	currentIndex: state => state.currentIndex,
	totalQuestions: state => state.questions.length,
	response: state => state.response,
	current: state => state.questions[state.currentIndex],
	progress: state => state.progress,
	last: state => state.currentIndex === state.questions.length - 1
}

const actions = {
	fetch({
		commit
	}) {
		fetchQuestionJson()
			.then((resp) => {
				const data = resp.data.map((q) => {
					const questions = q.questions.map((qu, k) => {
						const correct = []
						const answers = qu.answers.map((answer, j) => {
							const id = `a${q.id}${k}${j}`
							answer.correct && correct.push(id)
							return { 
								...answer,
								id
							}
						})
						return { 
							...qu,
							answers,
							id: `q${q.id}${k}`,
							totalCorrect: correct.length,
							complete: false,
							correctIds: correct
						}
					})

					return { 
						...q,
						questions,
						complete: false
					}
				})

				commit(types.FETCH_QUESTIONS, data)
			})
	},
}


const mutations = {
	[types.FETCH_QUESTIONS](state, payload) {
		state.questions = payload
	},

	[types.UPDATE_SCORE] (state, payload = 1) {
		state.score = state.score + payload
	},

	[types.UPDATE_PROGRESS] (state, payload = 1) {
		state.progress = state.progress + payload
	},

	[types.SET_ANSWER] (state, payload) {
		state.current = {...state.current, complete: payload}
		state.questions = insertAtIndex(state.current, state.currentIndex, state.questions)
	},

	[types.QUESTION_COMPLETE] (state, payload = true) {
		state.current = {...state.current, finished: payload}
		state.questions = insertAtIndex(state.current, state.currentIndex, state.questions)
	},

	[types.GET_CURRENT_QUESTION](state, payload) {
		state.currentIndex = payload
		state.current = state.questions[payload]
	},

	[types.GET_FEEDBACK](state, payload) {
		state.response = state.current.feedback[payload]
	},

	[types.RESET_QUESTION](state) {
		state.response = ''
		state.score = 0
	}

}

export default {
	state,
	getters,
	actions,
	mutations
}