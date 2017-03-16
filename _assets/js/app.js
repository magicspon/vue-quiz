/*
	import the things... 
*/

import debug from 'debug'
import Vue from 'vue'
window.log = debug('app:log')

/*
	The question component... this is where the magic happens
*/
import Question from './Question'

if(process.env.NODE_ENV === 'development') {
	debug.enable('app:log')
} else {
	debug.disable('app:log')
}

/*
	Main app component 
*/

new Vue({

	/*
		le data... can't remember if it needs to be a function 
		in this instance, but it's how I role

		added an index prop... just for shits and giggles really
	*/
	data() {
		return {
			index: 0,
			questions: [
				{
					id: 'q1',
					question: 'In what year did Boris Copcough invent the glance?',
					type: 'checkbox',
					answers: [
						{
							id: 'a1',
							text: 'Know one nos'
						},
						{
							id: 'a2',
							text: '10',
						},
						{
							id: 'a3',
							text: 'over 10',
							correct: true
						},
						{
							id: 'a4',
							text: '1245',
							correct: true
						}
					],
					responses: {
						correct: 'Boris Copcough, I know, right, amazing... Boris Copcough... legend... great glance',
						incorrect: 'Seriously... idiot... come on... think about it'
					},
				},
				{
					id: 'q2',
					question: 'You\'ve got one arm, and an army of endless warrior babies are after you... how long will you survive?',
					type: 'radio',
					answers: [
						{
							id: 'a1',
							text: '10 - 30 minutes'
						},
						{
							id: 'a2',
							text: '30 - 60 minutes',
							correct: true
						},
						{
							id: 'a3',
							text: '60 minutes to a day'
						},
						{
							id: 'a4',
							text: 'time machine, kill the dad(s)'
						}
					],
					responses: {
						correct: 'If you\'re lucky' ,
						incorrect: 'Twat... no way.... twat'
					},
				},
			]
		}
	},

	/*
		register the component
	*/
	components: {
		'question-template': Question
	},

	computed: {
		current() {
			return this.questions[this.index]
		}
	},

	/*
		not quite sure if i need to use watch here, 
		i thought computed would updated from the current value on change
		method.. it didn't so, i watched the index value, 
		which is updated from the nextQuestion method
	*/
	watch: {
		index() {
			/*
				update the change prop to the next question
				hello... re render... boooooya
			*/
			this.current = this.questions[this.index]
		}
	},
	
	/*
		this method is passed down as a prop
		and called from within the question component
		props down, events up... nice
	*/
	methods: {
		nextQuestion() {
			this.index += 1
		}
	},


	/*
		the template, passing some properties to the question component
		each question is a component, which is key
	*/
	template: `
		<div>
			<question-template 
				:id="current.id" 
				:question="current.question"
				:answers='current.answers' 
				:type='current.type' 
				:responses='current.responses' 
				:nextQuestion='nextQuestion'
			/>
		</div>
	`

}).$mount('#app')