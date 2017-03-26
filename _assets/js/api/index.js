import axios from 'axios'

export const fetchQuestionJson = () => {
	const response = response || axios.get('/questions.json')
	return response
}
